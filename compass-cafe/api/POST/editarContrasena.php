<?php
header('Content-Type: application/json');
session_start();

// Verificar sesión
if (!isset($_SESSION['id_user'])) {
    echo json_encode(["estado" => "sin_sesion"]);
    exit;
}

// Validar que venga la contraseña por POST
if (!isset($_POST['password']) || trim($_POST['password']) === '') {
    echo json_encode(["estado" => "error", "mensaje" => "Contraseña vacía"]);
    exit;
}

// Conexión centralizada
require_once("../conexion.php");
mysqli_set_charset($mysqli, "utf8");

$contrasena = $mysqli->real_escape_string($_POST['password']);
$id_user    = $_SESSION['id_user'];

// Opcional: hashear la contraseña (seguridad recomendada)
$hash = password_hash($contrasena, PASSWORD_BCRYPT);

// Actualizar contraseña
$sql = "UPDATE `usuario` SET `contrasena` = '$hash' WHERE `id_user` = '$id_user';";
$resultado = $mysqli->query($sql);

// Validación final
if ($resultado) {
    echo json_encode([
        "estado" => "actualizado",
        "filas_afectadas" => $mysqli->affected_rows
    ]);
} else {
    echo json_encode([
        "estado" => "error",
        "error" => $mysqli->error
    ]);
}

$mysqli->close();
?>
