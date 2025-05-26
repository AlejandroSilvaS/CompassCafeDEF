<?php
header('Content-Type: application/json');
session_start();

// Leer datos del cuerpo
$jsonData = file_get_contents('php://input');
$decodeData = json_decode($jsonData, true);

// Conexión centralizada
require_once("../conexion.php"); // ajusta si estás en /GET o /POST

// Validar sesión de administrador
if (!isset($_SESSION['sesionAdmin']) || $_SESSION['sesionAdmin'] !== true) {
    echo json_encode(["accesoAdmin" => false]); 
    exit();
}

$id_version = $decodeData['id_version'];

$sql = "SELECT * FROM `participacion_tienda` WHERE `id_version` = '$id_version';";

$data = [
    "tiendas"   => [],
    "aceptado"  => [],
    "accesoAdmin" => true
];

$result = $mysqli->query($sql);
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $sqlTienda = "SELECT * FROM `tienda` WHERE `id_tienda` = '".$row['id_tienda']."';";
        $resultTienda = $mysqli->query($sqlTienda);
        if ($resultTienda && $resultTienda->num_rows > 0) {
            while ($rowTienda = $resultTienda->fetch_assoc()) {
                $data["tiendas"][] = $rowTienda;

                $sqlUser = "SELECT `aceptado` FROM `usuario` WHERE `id_user` = '".$rowTienda['id_user']."';";
                $resultUser = $mysqli->query($sqlUser);
                if ($resultUser && $resultUser->num_rows > 0) {
                    while ($rowUser = $resultUser->fetch_assoc()) {
                        $data["aceptado"][] = $rowUser["aceptado"];
                    }
                }
            }
        }
    }

    echo json_encode($data); // ✅ No lo encierres dentro de []
} else {
    echo json_encode([]); // Vacío si no hay resultados
}

$mysqli->close();
?>
