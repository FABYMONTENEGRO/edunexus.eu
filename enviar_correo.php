<?php
// Este script debe ser ejecutado por un servidor PHP (como Apache o Nginx con PHP).
// NO LO PEGUES DENTRO DE UN ARCHIVO .html

if($_SERVER['REQUEST_METHOD'] != 'POST' ){
    // Si alguien intenta acceder a este archivo directamente sin enviar el formulario,
    // lo redirigimos de vuelta a la página principal.
    header("Location: index.html" );
    exit; // Siempre usa exit después de un header Location
}

// Asegúrate de que las rutas a PHPMailer y Exception sean correctas
// Asumiendo que 'phpmailer' es una carpeta al mismo nivel que este archivo 'enviar_correo.php'
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/SMTP.php'; // Asegúrate de incluir SMTP para el DEBUG_SERVER

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Recoge los datos del formulario
$nombre = $_POST['nombre'] ?? ''; // Usar operador null coalescing para evitar errores si el campo no existe
$apellido = $_POST['apellido'] ?? '';
$email = $_POST['email'] ?? '';
$asunto = $_POST['asunto'] ?? '';
$mensaje = $_POST['mensaje'] ?? '';
$foto = $_FILES['foto'] ?? null; // Si no hay archivo, será null

if( empty(trim($nombre)) ) $nombre = 'anonimo';
if( empty(trim($apellido)) ) $apellido = '';

// Prepara el cuerpo del mensaje HTML
$body = <<<HTML
    <h1>Contacto desde la web</h1>
    <p>De: $nombre $apellido / $email</p>
    <h2>Mensaje</h2>
    <p>$mensaje</p>
HTML;

// Instancia de PHPMailer, habilitando excepciones
$mailer = new PHPMailer(true);

try {
    // --- Configuración SMTP para Gmail ---
    $mailer->isSMTP();
    $mailer->Host       = 'smtp.gmail.com';
    $mailer->SMTPAuth   = true;

    // *** ¡AQUÍ ES DONDE PONES TUS CREDENCIALES DE GMAIL! ***
    $mailer->Username   = 'edunexus.eu@gmail.com';         // <--- ¡IMPORTANTE! Tu dirección completa de Gmail
    $mailer->Password   = 'symd snkb pkih vqlb';      // <--- ¡IMPORTANTE! La contraseña de aplicación que generaste

    $mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            // Usar SSL
    $mailer->Port       = 465;                                    // Puerto para SSL

    // --- Configuración de Depuración (MUY RECOMENDADO para probar) ---
    // Descomenta la siguiente línea para ver mensajes de error detallados.
    // Una vez que todo funcione, comenta esta línea o cámbiala a 0.
    // $mailer->SMTPDebug = SMTP::DEBUG_SERVER;
    // $mailer->Debugoutput = 'html'; // O 'echo' si lo ejecutas desde la consola

    // --- Configuración del Remitente ---
    // Esta dirección DEBE coincidir con el Username de Gmail por seguridad de Gmail
    $mailer->setFrom('edunexus.eu@gmail.com', "$nombre $apellido");
    // Añadir una dirección de respuesta para que al hacer "Responder", se responda al usuario del formulario
    $mailer->addReplyTo($email, "$nombre $apellido");

    // --- Configuración del Destinatario ---
    $mailer->addAddress('ejemplo@germanrodriguez.com.ar','Sitio web'); // Reemplaza con tu dirección de destino

    // --- Contenido del Correo ---
    $mailer->Subject = "Mensaje web: $asunto";
    $mailer->msgHTML($body); // Cuerpo del mensaje en HTML
    $mailer->AltBody = strip_tags($body); // Versión en texto plano para clientes que no soportan HTML
    $mailer->CharSet = 'UTF-8'; // Asegura la correcta codificación de caracteres

    // --- Archivos Adjuntos (si hay) ---
    if( $foto && $foto['size'] > 0 && $foto['error'] == UPLOAD_ERR_OK ){
        $mailer->addAttachment( $foto['tmp_name'], $foto['name'] );
    }

    // --- Envío del Correo ---
    $mailer->send();

    // Si el correo se envió con éxito, redirige a la página de gracias
    header("Location: gracias.html");
    exit;

} catch (Exception $e) {
    // Si hay un error, muestra un mensaje (para depuración)
    // En un entorno de producción, es mejor redirigir a una página de error amigable
    echo "El mensaje no pudo ser enviado. Error del Mailer: {$mailer->ErrorInfo}";
    // echo "<br>Detalle de la excepción: " . $e->getMessage(); // Más detalles técnicos
    // header("Location: error_envio.html"); // Redirigir a una página de error en producción
    exit;
}
?>