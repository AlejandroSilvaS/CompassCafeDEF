<?php
header('Content-Type: application/json');

// Leer JSON del cuerpo
$jsonData = file_get_contents('php://input');
$decodeData = json_decode($jsonData, true);

// Conexión reutilizable
require_once("../conexion.php"); // Ajusta si estás en /GET o /POST

$id_version = $decodeData['id_version'];

$data = [];

// Buscar participación por versión
$sql = "SELECT * FROM `participacion_tienda` WHERE `id_version` = '$id_version';";
$result = $mysqli->query($sql);

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $sqlTienda = "SELECT * FROM `tienda` WHERE `id_tienda` = '".$row['id_tienda']."';";
        $resultTienda = $mysqli->query($sqlTienda);
        if ($resultTienda && $resultTienda->num_rows > 0) {
            while ($rowTienda = $resultTienda->fetch_assoc()) {
                $data[] = $rowTienda;
            }
        }
    }
    echo json_encode($data);
} else {
    echo json_encode([]); // Sin resultados
}

$mysqli->close();
?>
