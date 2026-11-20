#!/usr/bin/env python3
"""Delete FTP files that are not part of the current dist/ build.

The login directory is the site root (public_html). Protected paths and
anything present in dist/ are never deleted. The plan is printed before
any deletion.

wa/ is protected as a whole. The deploy workflow generates wa/config.php
after the build, and the relay creates wa/.seen.json and wa/.errors.json
on the server. Those files are not in dist/ when this cleanup runs, so a
dist-membership check would delete the live config and the dedupe store.
"""

from __future__ import annotations

import ftplib
import os
import posixpath
import sys
from pathlib import Path

DIST = Path(os.environ.get("CLEANUP_DIST", "dist"))
MAX_DELETES = 200

PROTECTED_DIR_PREFIXES = ("cgi-bin", ".well-known", "wa")
PROTECTED_BASENAMES = {
    ".ftpquota",
    ".htaccess",
    ".ftp-deploy-sync-state-v2.json",
}


def normalize(path: str) -> str:
    path = path.replace("\\", "/").strip()
    while path.startswith("./"):
        path = path[2:]
    path = path.lstrip("/")
    path = posixpath.normpath(path)
    if path in (".", ""):
        return ""
    return path


def is_protected(path: str) -> bool:
    path = normalize(path)
    if not path:
        return True
    base = posixpath.basename(path)
    if base in PROTECTED_BASENAMES or base.startswith(".htaccess.phpupgrader"):
        return True
    parts = path.split("/")
    if parts[0] in PROTECTED_DIR_PREFIXES:
        return True
    return False


def collect_dist_files(dist: Path) -> set[str]:
    if not dist.is_dir():
        raise SystemExit(f"dist não encontrado: {dist}")
    files: set[str] = set()
    for path in dist.rglob("*"):
        if path.is_file():
            files.add(normalize(path.relative_to(dist).as_posix()))
    if "index.html" not in files:
        raise SystemExit("dist/index.html ausente. Limpeza cancelada.")
    if len(files) < 5:
        raise SystemExit(f"dist tem só {len(files)} arquivos. Limpeza cancelada.")
    return files


def classify(
    server_files: list[str], server_dirs: list[str], dist_files: set[str]
) -> tuple[list[str], list[str], list[str], list[str]]:
    keep_files: list[str] = []
    delete_files: list[str] = []
    for raw in server_files:
        path = normalize(raw)
        if not path:
            continue
        if is_protected(path) or path in dist_files:
            keep_files.append(path)
        else:
            delete_files.append(path)

    used_dirs = set()
    for path in dist_files:
        parent = posixpath.dirname(path)
        while parent:
            used_dirs.add(parent)
            parent = posixpath.dirname(parent)

    keep_dirs: list[str] = []
    delete_dirs: list[str] = []
    for raw in server_dirs:
        path = normalize(raw)
        if not path:
            continue
        if is_protected(path) or path in used_dirs:
            keep_dirs.append(path)
        else:
            delete_dirs.append(path)

    delete_files = sorted(set(delete_files))
    keep_files = sorted(set(keep_files))
    delete_dirs = sorted(set(delete_dirs), key=lambda item: item.count("/"), reverse=True)
    keep_dirs = sorted(set(keep_dirs))
    return delete_files, keep_files, delete_dirs, keep_dirs


def print_plan(
    delete_files: list[str],
    keep_files: list[str],
    delete_dirs: list[str],
    keep_dirs: list[str],
) -> None:
    print(f"=== VAI APAGAR ({len(delete_files)} arquivos) ===")
    for path in delete_files:
        print(path)
    print(f"=== VAI MANTER ({len(keep_files)} arquivos) ===")
    for path in keep_files:
        print(path)
    print(f"=== PASTAS VAZIAS DO SITE ANTIGO A REMOVER ({len(delete_dirs)}) ===")
    for path in delete_dirs:
        print(path)
    print(f"=== PASTAS MANTIDAS ({len(keep_dirs)}) ===")
    for path in keep_dirs:
        print(path)


class FtpSite:
    def __init__(self, ftp: ftplib.FTP) -> None:
        self.ftp = ftp

    def _list(self, path: str) -> list[tuple[str, bool]]:
        entries: list[tuple[str, bool]] = []
        try:
            for name, facts in self.ftp.mlsd(path or "."):
                if name in (".", ".."):
                    continue
                kind = facts.get("type", "")
                if kind in ("cdir", "pdir"):
                    continue
                entries.append((name, kind == "dir"))
            return entries
        except (ftplib.error_perm, AttributeError):
            pass

        lines: list[str] = []
        self.ftp.retrlines(f"LIST {path}" if path else "LIST", lines.append)
        for line in lines:
            parsed = parse_list_line(line)
            if parsed is None:
                continue
            name, is_dir = parsed
            if name in (".", ".."):
                continue
            entries.append((name, is_dir))
        return entries

    def walk(self) -> tuple[list[str], list[str]]:
        files: list[str] = []
        dirs: list[str] = []

        def visit(current: str) -> None:
            for name, is_dir in self._list(current):
                rel = f"{current}/{name}" if current else name
                rel = normalize(rel)
                if is_dir:
                    dirs.append(rel)
                    visit(rel)
                else:
                    files.append(rel)

        visit("")
        return files, dirs

    def delete_file(self, path: str) -> None:
        self.ftp.delete(path)

    def remove_dir(self, path: str) -> None:
        self.ftp.rmd(path)


def parse_list_line(line: str) -> tuple[str, bool] | None:
    text = line.rstrip()
    if not text:
        return None
    if text[0] in "d-l" and len(text.split()) >= 9:
        is_dir = text.startswith("d")
        name = text.split(None, 8)[8]
        return name, is_dir
    upper = text.upper()
    if "<DIR>" in upper:
        name = text.split(None, 3)[-1]
        return name, True
    parts = text.split(None, 3)
    if len(parts) == 4 and not parts[2].startswith("<"):
        return parts[3], False
    return None


def assert_safe(delete_files: list[str], dist_files: set[str]) -> None:
    if len(delete_files) > MAX_DELETES:
        raise SystemExit(
            f"{len(delete_files)} arquivos marcados, acima do limite {MAX_DELETES}. Nada foi apagado."
        )
    for path in delete_files:
        if is_protected(path) or path in dist_files:
            raise SystemExit(f"Recusa ao apagar caminho protegido ou do dist: {path}")
    if "index.html" not in dist_files:
        raise SystemExit("index.html sumiu do dist. Nada foi apagado.")


def run_cleanup() -> int:
    server = os.environ.get("FTP_SERVER", "")
    username = os.environ.get("FTP_USERNAME", "")
    password = os.environ.get("FTP_PASSWORD", "")
    if not server or not username or not password:
        raise SystemExit("Segredos FTP ausentes. Nada foi apagado.")

    dist_files = collect_dist_files(DIST)
    print(f"Build local: {len(dist_files)} arquivos em {DIST}")

    ftp = ftplib.FTP()
    ftp.connect(server, 21, timeout=60)
    ftp.login(username, password)
    ftp.set_pasv(True)
    ftp.encoding = "utf-8"
    try:
        site = FtpSite(ftp)
        server_files, server_dirs = site.walk()
        if "index.html" not in {normalize(path) for path in server_files}:
            raise SystemExit("index.html não está na raiz FTP. Limpeza cancelada.")

        delete_files, keep_files, delete_dirs, keep_dirs = classify(
            server_files, server_dirs, dist_files
        )
        print_plan(delete_files, keep_files, delete_dirs, keep_dirs)
        assert_safe(delete_files, dist_files)

        print("=== APAGANDO ===")
        deleted: list[str] = []
        failed: list[str] = []
        for path in delete_files:
            try:
                site.delete_file(path)
                deleted.append(path)
                print(f"apagado {path}")
            except ftplib.all_errors as error:
                failed.append(f"{path}: {error}")
                print(f"falha {path}: {error}")
        for path in delete_dirs:
            try:
                site.remove_dir(path)
                deleted.append(path + "/")
                print(f"pasta removida {path}")
            except ftplib.all_errors as error:
                print(f"pasta mantida {path}: {error}")
        print(f"=== RESUMO apagados={len(deleted)} falhas={len(failed)} ===")
        for path in deleted:
            print(f"DELETED {path}")
        if failed:
            for item in failed:
                print(f"FAILED {item}")
            return 1
        return 0
    finally:
        try:
            ftp.quit()
        except ftplib.all_errors:
            ftp.close()


def self_test() -> None:
    dist = {
        "index.html",
        ".htaccess",
        "favicon.svg",
        "assets/index-NEW.js",
        "planos/index.html",
        "cameras/index.html",
        "clients/deck65.png",
    }
    server_files = [
        "index.html",
        ".htaccess",
        ".htaccess.phpupgrader.1",
        ".ftpquota",
        ".ftp-deploy-sync-state.json",
        ".ftp-deploy-sync-state-v2.json",
        "favicon.svg",
        "favicon.png",
        "assets/index-NEW.js",
        "assets/index-QcPVADhP.js",
        "assets/index-BQ43i0-B.css",
        "cgi-bin/script.cgi",
        ".well-known/acme/token",
        "shield-check.svg",
        "image_b19187.png",
        "logo_mlb.png",
        "planos/index.html",
        "cameras/index.html",
        "clients/deck65.png",
        "old/leftover.txt",
        "wa/hook.php",
        "wa/.htaccess",
        "wa/config.php",
        "wa/.seen.json",
        "wa/.errors.json",
        "wa/nested/runtime-only.txt",
    ]
    server_dirs = [
        "assets",
        "cgi-bin",
        ".well-known",
        ".well-known/acme",
        "planos",
        "cameras",
        "clients",
        "old",
        "wa",
        "wa/nested",
    ]
    delete_files, keep_files, delete_dirs, keep_dirs = classify(server_files, server_dirs, dist)
    assert delete_files == [
        ".ftp-deploy-sync-state.json",
        "assets/index-BQ43i0-B.css",
        "assets/index-QcPVADhP.js",
        "favicon.png",
        "image_b19187.png",
        "logo_mlb.png",
        "old/leftover.txt",
        "shield-check.svg",
    ], delete_files
    assert ".htaccess" in keep_files
    assert ".htaccess.phpupgrader.1" in keep_files
    assert ".ftp-deploy-sync-state-v2.json" in keep_files
    assert "cgi-bin/script.cgi" in keep_files
    assert ".well-known/acme/token" in keep_files
    assert "assets" in keep_dirs
    assert "cgi-bin" in keep_dirs
    assert ".well-known" in keep_dirs
    assert "old" in delete_dirs
    for path in (
        "wa/hook.php",
        "wa/.htaccess",
        "wa/config.php",
        "wa/.seen.json",
        "wa/.errors.json",
        "wa/nested/runtime-only.txt",
    ):
        assert path in keep_files, path
        assert path not in delete_files, path
    assert "wa" in keep_dirs
    assert "wa/nested" in keep_dirs
    assert "wa" not in delete_dirs
    assert "wa/nested" not in delete_dirs
    assert_safe(delete_files, dist)
    line = parse_list_line("-rw-r--r-- 1 user group 10 Nov 17 21:00 shield-check.svg")
    assert line == ("shield-check.svg", False)
    directory = parse_list_line("drwxr-xr-x 2 user group 4096 Nov 17 21:00 cgi-bin")
    assert directory == ("cgi-bin", True)
    print("self-test ok")


if __name__ == "__main__":
    if "--self-test" in sys.argv:
        self_test()
    else:
        sys.exit(run_cleanup())
