<?php
// WhatsApp Cloud API webhook relay for the CheckInfra assistant.
// GET  = Meta verification handshake. POST = signed event, forwarded if from the allowed number.
// No message content is ever logged. PHP 7.4+ compatible.

$cfgFile = __DIR__ . '/config.php';
$cfg = is_file($cfgFile) ? include $cfgFile : array();
if (!is_array($cfg)) { $cfg = array(); }
$c = function ($k, $d = '') use ($cfg) { return isset($cfg[$k]) ? (string)$cfg[$k] : $d; };

function wa_count_error($what) {
    $f = __DIR__ . '/.errors.json';
    $d = array();
    if (is_file($f)) { $j = json_decode((string)@file_get_contents($f), true); if (is_array($j)) { $d = $j; } }
    $d[$what] = (isset($d[$what]) ? (int)$d[$what] : 0) + 1;
    $d['last_' . $what] = gmdate('c');
    @file_put_contents($f, json_encode($d), LOCK_EX);
}

header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';

if ($method === 'GET') {
    $mode = isset($_GET['hub_mode']) ? (string)$_GET['hub_mode'] : '';
    $tok  = isset($_GET['hub_verify_token']) ? (string)$_GET['hub_verify_token'] : '';
    $chal = isset($_GET['hub_challenge']) ? (string)$_GET['hub_challenge'] : '';
    $vt = $c('verify_token');
    if ($mode === 'subscribe' && $vt !== '' && hash_equals($vt, $tok)) {
        http_response_code(200);
        header('Content-Type: text/plain; charset=utf-8');
        echo $chal;
        exit;
    }
    http_response_code(403);
    exit;
}

if ($method !== 'POST') { http_response_code(405); exit; }

$raw = (string)file_get_contents('php://input');
$secret = $c('app_secret');
$sig = isset($_SERVER['HTTP_X_HUB_SIGNATURE_256']) ? (string)$_SERVER['HTTP_X_HUB_SIGNATURE_256'] : '';
if ($secret === '' || $sig === '' || !hash_equals('sha256=' . hash_hmac('sha256', $raw, $secret), $sig)) {
    wa_count_error('bad_signature');
    http_response_code(403);
    exit;
}

// Valid signature: answer 200 right away, then work.
http_response_code(200);
header('Content-Type: text/plain');
echo 'OK';
if (function_exists('fastcgi_finish_request')) {
    fastcgi_finish_request();
} else {
    ignore_user_abort(true);
    header('Content-Length: 2');
    header('Connection: close');
    @ob_end_flush(); @flush();
}

$data = json_decode($raw, true);
if (!is_array($data) || !isset($data['entry']) || !is_array($data['entry'])) { exit; }

$allowed = $c('allowed_wa_id');
$fwdUrl = $c('forward_url');
$fwdKey = $c('forward_key');
$authValue = $c('forward_auth_value');
$hdrName = $c('forward_header_name', 'Authorization');
$hdrPrefix = array_key_exists('forward_header_prefix', $cfg) ? (string)$cfg['forward_header_prefix'] : 'Bearer ';
if ($allowed === '' || $fwdUrl === '' || ($fwdKey === '' && $authValue === '')) { exit; }
$hdrValue = $authValue !== '' ? $authValue : $hdrPrefix . $fwdKey;

// Dedupe store
$seenFile = __DIR__ . '/.seen.json';
$fh = @fopen($seenFile, 'c+');
if ($fh) { flock($fh, LOCK_EX); }
$seen = array();
if ($fh) { $j = json_decode((string)stream_get_contents($fh), true); if (is_array($j)) { $seen = $j; } }
$changed = false;

foreach ($data['entry'] as $entry) {
    if (!isset($entry['changes']) || !is_array($entry['changes'])) { continue; }
    foreach ($entry['changes'] as $ch) {
        $val = isset($ch['value']) && is_array($ch['value']) ? $ch['value'] : array();
        if (!isset($val['messages']) || !is_array($val['messages'])) { continue; }
        foreach ($val['messages'] as $m) {
            if (!is_array($m)) { continue; }
            $from = isset($m['from']) ? (string)$m['from'] : '';
            $id = isset($m['id']) ? (string)$m['id'] : '';
            if ($from === '' || !hash_equals($allowed, $from) || $id === '') { continue; }
            if (in_array($id, $seen, true)) { continue; }
            $type = isset($m['type']) ? (string)$m['type'] : '';
            $text = null;
            if (isset($m['text']['body'])) { $text = (string)$m['text']['body']; }
            elseif (isset($m['button']['text'])) { $text = (string)$m['button']['text']; }
            elseif (isset($m['interactive']['button_reply']['title'])) { $text = (string)$m['interactive']['button_reply']['title']; }
            elseif (isset($m['interactive']['list_reply']['title'])) { $text = (string)$m['interactive']['list_reply']['title']; }
            elseif (isset($m['reaction']['emoji'])) { $text = (string)$m['reaction']['emoji']; }
            $caption = null; $mediaId = null; $mime = null;
            if ($type !== '' && isset($m[$type]) && is_array($m[$type])) {
                $o = $m[$type];
                if (isset($o['caption'])) { $caption = (string)$o['caption']; }
                if (isset($o['id'])) { $mediaId = (string)$o['id']; }
                if (isset($o['mime_type'])) { $mime = (string)$o['mime_type']; }
            }
            $payload = json_encode(array(
                'from' => $from, 'id' => $id,
                'timestamp' => isset($m['timestamp']) ? (string)$m['timestamp'] : null,
                'type' => $type, 'text' => $text, 'caption' => $caption,
                'media_id' => $mediaId, 'mime_type' => $mime,
            ), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

            $ok = false;
            if (function_exists('curl_init')) {
                $ch2 = curl_init($fwdUrl);
                curl_setopt_array($ch2, array(
                    CURLOPT_POST => true,
                    CURLOPT_POSTFIELDS => $payload,
                    CURLOPT_HTTPHEADER => array('Content-Type: application/json', $hdrName . ': ' . $hdrValue),
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_TIMEOUT => 10,
                    CURLOPT_CONNECTTIMEOUT => 5,
                ));
                curl_exec($ch2);
                $code = (int)curl_getinfo($ch2, CURLINFO_HTTP_CODE);
                curl_close($ch2);
                $ok = $code >= 200 && $code < 300;
            } else {
                $ctx = stream_context_create(array('http' => array(
                    'method' => 'POST', 'timeout' => 10, 'ignore_errors' => true,
                    'header' => "Content-Type: application/json\r\n" . $hdrName . ': ' . $hdrValue . "\r\n",
                    'content' => $payload,
                )));
                @file_get_contents($fwdUrl, false, $ctx);
                $ok = isset($http_response_header[0]) && preg_match('#\s2\d\d\s#', $http_response_header[0] . ' ');
            }
            if ($ok) {
                $seen[] = $id; $changed = true;
            } else {
                wa_count_error('forward_failed');
            }
        }
    }
}

if ($fh) {
    if ($changed) {
        $seen = array_slice($seen, -200);
        ftruncate($fh, 0); rewind($fh); fwrite($fh, json_encode($seen));
    }
    flock($fh, LOCK_UN); fclose($fh);
}
