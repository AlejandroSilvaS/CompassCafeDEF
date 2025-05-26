<?php
header('Content-Type: application/json');
session_start();

// Validar sesión
if (!isset($_SESSION['sesionAdmin']) || !isset($_SESSION['id_Admin'])) {
    echo json_encode(["accesoAdmin" => false]);
    exit();
}

// Decodificar JSON recibido
$jsonData = file_get_contents('php://input');
$decodeData = json_decode($jsonData, true);

if (!$decodeData || !isset($decodeData["fechaInicio"]) || !isset($decodeData["fechaFin"])) {
    echo json_encode(["accesoAdmin" => true, "estado" => "faltan_datos"]);
    exit();
}

// Conexión centralizada
require_once("../conexion.php");

$fechaInicio = $mysqli->real_escape_string($decodeData["fechaInicio"]);
$fechaFin    = $mysqli->real_escape_string($decodeData["fechaFin"]);
$id_admin    = $_SESSION["id_Admin"];

$data = [
    "fechaInicio" => null,
    "fechaFin" => null
];

// Actualizar fechaFin
$sqlFin = "UPDATE `admin` SET `fechaFin` = '$fechaFin' WHERE `id_admin` = '$id_admin';";
$resultFin = $mysqli->query($sqlFin);
$data["fechaFin"] = $resultFin
    ? ($mysqli->affected_rows > 0 ? "ok" : "sin_cambios")
    : "error";

// Actualizar fechaInicio
$sqlInicio = "UPDATE `admin` SET `fechaInicio` = '$fechaInicio' WHERE `id_admin` = '$id_admin';";
$resultInicio = $mysqli->query($sqlInicio);
$data["fechaInicio"] = $resultInicio
    ? ($mysqli->affected_rows > 0 ? "ok" : "sin_cambios")
    : "error";

// Respuesta
echo json_encode([
    "accesoAdmin" => true,
    "estado" => "procesado",
    "datos" => $data
]);

$mysqli->close();
?>
