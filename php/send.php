<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=UTF-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['success' => false, 'message' => 'Method not allowed'], JSON_UNESCAPED_UNICODE);
    exit;
}

$autoload = __DIR__ . '/../vendor/autoload.php';
if (!is_file($autoload)) {
    error_log('ROSE HIP contact mailer dependency is not installed.');
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => '送信できませんでした。時間をおいて再度お試しください。'], JSON_UNESCAPED_UNICODE);
    exit;
}
require $autoload;

$max = ['name' => 100, 'email' => 254, 'message' => 2000];
$name = trim((string)($_POST['name'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));
$company = trim((string)($_POST['company'] ?? ''));
if ($company !== '' || $name === '' || $email === '' || $message === ''
    || mb_strlen($name, 'UTF-8') > $max['name'] || strlen($email) > $max['email']
    || mb_strlen($message, 'UTF-8') > $max['message'] || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || preg_match('/[\r\n]/', $name . $email) === 1) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => '入力内容をご確認ください。'], JSON_UNESCAPED_UNICODE);
    exit;
}

$required = ['ROSEHIP_SMTP_HOST', 'ROSEHIP_SMTP_PORT', 'ROSEHIP_SMTP_USER', 'ROSEHIP_SMTP_PASS', 'ROSEHIP_MAIL_TO', 'ROSEHIP_MAIL_FROM'];
$config = [];
foreach ($required as $key) {
    $config[$key] = getenv($key);
    if ($config[$key] === false || $config[$key] === '') {
        error_log("ROSE HIP contact mail configuration is missing: {$key}");
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => '送信できませんでした。時間をおいて再度お試しください。'], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

try {
    $send = static function (string $to, string $toName, string $subject, string $body) use ($config): void {
        $mail = new PHPMailer(true);
        $mail->CharSet = 'UTF-8';
        $mail->isSMTP();
        $mail->Host = $config['ROSEHIP_SMTP_HOST'];
        $mail->Port = (int)$config['ROSEHIP_SMTP_PORT'];
        $mail->SMTPAuth = true;
        $mail->Username = $config['ROSEHIP_SMTP_USER'];
        $mail->Password = $config['ROSEHIP_SMTP_PASS'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->setFrom($config['ROSEHIP_MAIL_FROM'], 'ROSE HIP');
        $mail->addAddress($to, $toName);
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->send();
    };
    $notification = new PHPMailer(true);
    $notification->CharSet = 'UTF-8';
    $notification->isSMTP();
    $notification->Host = $config['ROSEHIP_SMTP_HOST'];
    $notification->Port = (int)$config['ROSEHIP_SMTP_PORT'];
    $notification->SMTPAuth = true;
    $notification->Username = $config['ROSEHIP_SMTP_USER'];
    $notification->Password = $config['ROSEHIP_SMTP_PASS'];
    $notification->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $notification->setFrom($config['ROSEHIP_MAIL_FROM'], 'ROSE HIP');
    $notification->addAddress($config['ROSEHIP_MAIL_TO']);
    $notification->addReplyTo($email, $name);
    $notification->Subject = 'ROSE HIP お問い合わせ';
    $notification->Body = "お名前：{$name}\nメールアドレス：{$email}\n\nお問い合わせ内容：\n{$message}";
    $notification->send();
    $send($email, $name, 'お問い合わせありがとうございます｜ROSE HIP', "お問い合わせありがとうございます。\n\n以下の内容で受け付けました。\n\nお名前：{$name}\nお問い合わせ内容：\n{$message}");
    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
} catch (Exception $exception) {
    error_log('ROSE HIP contact mail send failed: ' . $exception->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => '送信できませんでした。時間をおいて再度お試しください。'], JSON_UNESCAPED_UNICODE);
}
