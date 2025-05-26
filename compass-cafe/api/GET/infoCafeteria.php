<?php
header('Content-Type: application/json');

// Leer y decodificar datos JSON
$jsonData = file_get_contents('php://input');
$decodeData = json_decode($jsonData, true);

if (!$decodeData) {
    echo json_encode(["error" => "No se pudo decodificar el JSON."]);
    exit;
}

// Conexión externa
require_once("../conexion.php"); // Ajusta si tu archivo está en /GET o /POST

$id_tienda   = $decodeData['id'];
$id_user     = $decodeData['id_user'];
$id_version  = $decodeData['id_version'];

$response = [
    "tienda"  => [],
    "usuario" => [],
    "bebida"  => []
];

// Consulta tienda
$sql = "SELECT * FROM `tienda` WHERE `id_tienda` = '$id_tienda';";
$result = $mysqli->query($sql);
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $response["tienda"][] = $row;
    }
}

// Consulta usuario
$sqlUser = "SELECT * FROM `usuario` WHERE `id_user` = '$id_user';";
$resultUser = $mysqli->query($sqlUser);
if ($resultUser && $resultUser->num_rows > 0) {
    while ($row = $resultUser->fetch_assoc()) {
        $response["usuario"][] = $row;
    }
}

// Consulta participación
$id_participacion = null;
$sqlParticipacion = "SELECT * FROM `participacion_tienda` WHERE `id_tienda` = '$id_tienda' AND `id_version` = '$id_version';";
$resultParticipacion = $mysqli->query($sqlParticipacion);
if ($resultParticipacion && $resultParticipacion->num_rows > 0) {
    $row = $resultParticipacion->fetch_assoc();
    $id_participacion = $row["id_participacion"];
}

// Consulta bebidas si hay participación válida
if ($id_participacion) {
    $sqlBebida = "SELECT * FROM `bebida` WHERE `id_participacion` = '$id_participacion';";
    $resultBebida = $mysqli->query($sqlBebida);
    if ($resultBebida && $resultBebida->num_rows > 0) {
        while ($row = $resultBebida->fetch_assoc()) {
            $response["bebida"][] = $row;
        }
    }
}

echo json_encode($response);
$mysqli->close();
?>
