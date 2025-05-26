<?php
header('Content-Type: application/json');
session_start();

// Decodificar JSON recibido
$jsonData = file_get_contents('php://input');
$decodeData = json_decode($jsonData, true);

if (!$decodeData) {
    echo json_encode(["error" => "No se pudo decodificar el JSON."]);
    exit;
}

// Conexión externa
require_once("../conexion.php"); // Ajusta si el archivo está en /GET o /POST

if (!isset($_SESSION['sesionAdmin']) || $_SESSION['sesionAdmin'] !== true) {
    echo json_encode(["accesoAdmin" => false]); 
    exit;
}

// Variables recibidas
$id_tienda   = $decodeData['id'];
$id_user     = $decodeData['id_user'];
$id_version  = $decodeData['id_version'];

$response = [
    "tienda"  => [],
    "usuario" => [],
    "bebida"  => [],
    "accesoAdmin" => true
];

// Tabla tienda
$sql = "SELECT * FROM `tienda` WHERE `id_tienda` = '$id_tienda';";
$result = $mysqli->query($sql);
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $response["tienda"][] = $row;
    }
}

// Tabla usuario
$sqlUser = "SELECT * FROM `usuario` WHERE `id_user` = '$id_user';";
$resultUser = $mysqli->query($sqlUser);
if ($resultUser && $resultUser->num_rows > 0) {
    while ($row = $resultUser->fetch_assoc()) {
        $response["usuario"][] = $row;
    }
}

// Participación
$id_participacion = null;
$sqlParticipacion = "SELECT * FROM `participacion_tienda` WHERE `id_tienda` = '$id_tienda' AND `id_version` = '$id_version';";
$resultParticipacion = $mysqli->query($sqlParticipacion);
if ($resultParticipacion && $resultParticipacion->num_rows > 0) {
    $row = $resultParticipacion->fetch_assoc();
    $id_participacion = $row["id_participacion"];
}

// Bebidas
if ($id_participacion) {
    $sqlBebida = "SELECT * FROM `bebida` WHERE `id_participacion` = '$id_participacion';";
    $resultBebida = $mysqli->query($sqlBebida);
    if ($resultBebida && $resultBebida->num_rows > 0) {
        while ($row = $resultBebida->fetch_assoc()) {
            $response["bebida"][] = $row;
        }
    }
}

// Respuesta final
echo json_encode($response);

$mysqli->close();
?>
