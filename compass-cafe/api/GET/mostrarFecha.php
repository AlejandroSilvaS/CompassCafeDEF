<?php
header('Content-Type: application/json');
session_start();

// Verificar si el administrador está en sesión
if (!isset($_SESSION['sesionAdmin']) || !isset($_SESSION["id_Admin"])) {
    echo json_encode(["accesoAdmin" => false]);
    exit();
}

// Conexión centralizada
require_once("../conexion.php"); // Ajusta si estás en /GET o /POST

$sql = "SELECT * FROM `admin` WHERE `id_admin` = '".$_SESSION["id_Admin"]."';";
$result = $mysqli->query($sql);

$data = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode([
    "accesoAdmin" => true,
    "idAdmin"     => $_SESSION["id_Admin"],
    "datos"       => $data
]);

$mysqli->close();
?>
