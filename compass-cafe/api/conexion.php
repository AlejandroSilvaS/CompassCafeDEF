<?php
// Mostrar errores solo durante desarrollo (desactiva en producción)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Configuración de conexión a InfinityFree
$db_host     = "sql302.infinityfree.com";
$db_user     = "if0_39080339";
$db_password = "Zfo7MvM8u5F6";
$db_name     = "if0_39080339_compasscafe";

// Crear conexión segura con MySQL
$mysqli = new mysqli($db_host, $db_user, $db_password, $db_name);
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
