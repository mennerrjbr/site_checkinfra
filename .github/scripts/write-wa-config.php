<?php
// Writes wa/config.php for the WhatsApp relay. Run on the GitHub Actions
// runner after the site build. PHP 7.4 compatible. Never prints secret values.
//
// GitHub Actions secrets (missing or blank -> empty string, relay fails closed):
//   WA_META_APP_SECRET     -> app_secret
//   WA_ROUTINE_WEBHOOK_URL -> forward_url
//   WA_ROUTINE_AUTH_HEADER -> forward_auth_value (full Authorization value)
//
// Usage:
//   php .github/scripts/write-wa-config.php dist/wa/config.php
//   php .github/scripts/write-wa-config.php --self-test

if (PHP_SAPI !== 'cli') {
    fwrite(STDERR, "write-wa-config.php só pode rodar no CLI.\n");
    exit(1);
}

function wa_env($name) {
    $value = getenv($name);
    if ($value === false) {
        return '';
    }
    return trim($value);
}

function wa_config_from_env() {
    return array(
        'verify_token' => 'checkinfra-assistente-wa',
        'app_secret' => wa_env('WA_META_APP_SECRET'),
        'allowed_wa_id' => '5521988201155',
        'forward_url' => wa_env('WA_ROUTINE_WEBHOOK_URL'),
        'forward_key' => '',
        'forward_auth_value' => wa_env('WA_ROUTINE_AUTH_HEADER'),
        'forward_header_name' => 'Authorization',
        'forward_header_prefix' => 'Bearer ',
    );
}

function wa_render_config($base) {
    // var_export() emits long array() syntax and escapes quotes, so a secret
    // cannot break out of the PHP string. Output stays valid on PHP 7.4.
    return "<?php\n// Generated at deploy time from GitHub Actions secrets. Do not commit.\nreturn " . var_export($base, true) . ";\n";
}

function wa_print_status($base) {
    $secret = array(
        'app_secret' => true,
        'forward_key' => true,
        'forward_auth_value' => true,
        'forward_url' => true,
    );
    foreach ($base as $key => $value) {
        if ($value === '') {
            $shown = '(empty)';
        } elseif (isset($secret[$key])) {
            $shown = 'SET';
        } else {
            $shown = $value;
        }
        echo str_pad($key, 24) . ': ' . $shown . "\n";
    }
}

function wa_write_config($out, $base, $report = true) {
    $dir = dirname($out);
    if (!is_dir($dir)) {
        if ($report) {
            fwrite(STDERR, "Diretório de saída ausente: {$dir}\n");
        }
        return 1;
    }
    $bytes = file_put_contents($out, wa_render_config($base));
    if ($bytes === false) {
        fwrite(STDERR, "Falha ao escrever config.php\n");
        return 1;
    }
    @chmod($out, 0600);
    wa_print_status($base);
    return 0;
}

function wa_fail($failures) {
    fwrite(STDERR, "self-test failed:\n" . implode("\n", $failures) . "\n");
    return 1;
}

function wa_self_test() {
    $failures = array();
    $dir = sys_get_temp_dir() . '/wa-config-' . getmypid();
    if (!mkdir($dir, 0700) && !is_dir($dir)) {
        return wa_fail(array('não criou diretório temporário'));
    }

    $nasty = "a'b\\c\$\"`\nline\t<?php system('no'); ?>\0end";
    $auth = "Bearer super secret 'quoted' \$_x";
    $url = 'https://example.test/hook?x=1&y=2';
    putenv("WA_META_APP_SECRET=from-env-'quote'");
    putenv('WA_ROUTINE_WEBHOOK_URL=' . $url);
    putenv('WA_ROUTINE_AUTH_HEADER=' . $auth);

    $cfg = wa_config_from_env();
    if ($cfg['app_secret'] !== "from-env-'quote'" || $cfg['forward_url'] !== $url || $cfg['forward_auth_value'] !== $auth) {
        $failures[] = 'leitura do ambiente falhou';
    }
    // Null bytes are not reliable in the environment. Escape them in the writer.
    $cfg['app_secret'] = $nasty;
    ob_start();
    $code = wa_write_config($dir . '/config.php', $cfg);
    $status = ob_get_clean();
    if ($code !== 0) {
        $failures[] = 'escrita com segredos falhou';
    }
    if (strpos($status, $nasty) !== false || strpos($status, "super secret") !== false || strpos($status, 'example.test') !== false) {
        $failures[] = 'stdout vazou segredo';
    }
    if (strpos($status, 'SET') === false || strpos($status, '(empty)') === false) {
        $failures[] = 'status SET/(empty) ausente';
    }

    $loaded = include $dir . '/config.php';
    if (!is_array($loaded)) {
        $failures[] = 'include não devolveu array';
        $loaded = array();
    }
    $expect = array(
        'verify_token' => 'checkinfra-assistente-wa',
        'app_secret' => $nasty,
        'allowed_wa_id' => '5521988201155',
        'forward_url' => $url,
        'forward_key' => '',
        'forward_auth_value' => $auth,
        'forward_header_name' => 'Authorization',
        'forward_header_prefix' => 'Bearer ',
    );
    foreach ($expect as $key => $value) {
        if (!array_key_exists($key, $loaded) || $loaded[$key] !== $value) {
            $failures[] = 'roundtrip falhou em ' . $key;
        }
    }

    putenv('WA_META_APP_SECRET=');
    putenv('WA_ROUTINE_WEBHOOK_URL=');
    putenv('WA_ROUTINE_AUTH_HEADER=   ');
    $empty = wa_config_from_env();
    if ($empty['app_secret'] !== '' || $empty['forward_url'] !== '' || $empty['forward_auth_value'] !== '') {
        $failures[] = 'segredo ausente deveria virar string vazia';
    }
    ob_start();
    $emptyCode = wa_write_config($dir . '/empty-config.php', $empty);
    ob_end_clean();
    if ($emptyCode !== 0) {
        $failures[] = 'escrita sem segredos falhou';
    }
    $loadedEmpty = include $dir . '/empty-config.php';
    if (!is_array($loadedEmpty)
        || $loadedEmpty['app_secret'] !== ''
        || $loadedEmpty['forward_url'] !== ''
        || $loadedEmpty['forward_auth_value'] !== ''
        || $loadedEmpty['forward_key'] !== ''
        || $loadedEmpty['verify_token'] !== 'checkinfra-assistente-wa'
        || $loadedEmpty['allowed_wa_id'] !== '5521988201155') {
        $failures[] = 'config vazio não falha fechado com as constantes certas';
    }

    $missingDir = wa_write_config($dir . '/nope/config.php', $empty, false);
    if ($missingDir === 0) {
        $failures[] = 'diretório ausente deveria falhar';
    }

    @unlink($dir . '/config.php');
    @unlink($dir . '/empty-config.php');
    @rmdir($dir);

    if ($failures) {
        return wa_fail($failures);
    }
    echo "self-test ok\n";
    return 0;
}

if (isset($argv[1]) && $argv[1] === '--self-test') {
    exit(wa_self_test());
}

$out = isset($argv[1]) ? $argv[1] : '';
if ($out === '') {
    fwrite(STDERR, "Uso: php write-wa-config.php <dist/wa/config.php>\n");
    exit(1);
}

exit(wa_write_config($out, wa_config_from_env()));
