<?php
// Mostrar errores solo durante desarrollo (desactiva en producción)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Leer variables de entorno (configuradas en Render)
$db_host     = getenv("DB_HOST") ?: "localhost";
$db_user     = getenv("DB_USER") ?: "root";
$db_password = getenv("DB_PASSWORD") ?: "";
$db_name     = getenv("DB_NAME") ?: "test";
$db_port     = getenv("DB_PORT") ?: 3306;

// Crear conexión segura con MySQL (Railway usa puerto personalizado)
$mysqli = new mysqli($db_host, $db_user, $db_password, $db_name, $db_port);
mysqli_set_charset($mysqli, "utf8");

// Validar conexión
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode([
        "error" => "❌ Error de conexión a la base de datos.",
        "detalle" => $mysqli->connect_error
    ]);
    exit;
}
?>
