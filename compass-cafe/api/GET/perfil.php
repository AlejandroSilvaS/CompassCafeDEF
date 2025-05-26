<?php
header('Content-Type: application/json');
session_start();

// Validar sesión de usuario
if (!isset($_SESSION['id'])) {
    echo json_encode(["sesion" => false]); 
    exit();
}

// Conexión reutilizable
require_once("../conexion.php"); // Ajusta si estás en /GET o /POST

$sql = "SELECT * FROM `tienda` WHERE `id_user` = '".$_SESSION['id']."';";
$sqlUser = "SELECT * FROM `usuario` WHERE `id_user` = '".$_SESSION['id']."';";

$result      = $mysqli->query($sql);
$resultUser  = $mysqli->query($sqlUser);

$response = [
    "tienda"        => [],
    "usuario"       => [],
    "participacion" => [],
    "bebida"        => [],
    "sesion"        => true
];

// Obtener tienda (si existe)
$id_tienda = null;
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $id_tienda = $row["id_tienda"];
        $response["tienda"][] = $row;
    }
}

// Obtener usuario
if ($resultUser && $resultUser->num_rows > 0) {
    while ($row = $resultUser->fetch_assoc()) {
        $response["usuario"][] = $row;
    }
}

// Si hay tienda, buscar participación y bebidas
if ($id_tienda) {
    $sqlParticipacion = "SELECT * FROM `participacion_tienda` WHERE `id_tienda` = '$id_tienda';";
    $resultParticipacion = $mysqli->query($sqlParticipacion);

    if ($resultParticipacion && $resultParticipacion->num_rows > 0) {
        while ($row = $resultParticipacion->fetch_assoc()) {
            $response["participacion"][] = $row;

            $id_participacion = $row["id_participacion"];
            $sqlBebida = "SELECT * FROM `bebida` WHERE `id_participacion` = '$id_participacion';";
            $resultBebida = $mysqli->query($sqlBebida);

            if ($resultBebida && $resultBebida->num_rows > 0) {
                while ($row = $resultBebida->fetch_assoc()) {
                    $response["bebida"][] = $row;
                }
            }
        }
    }
}

echo json_encode($response);
$mysqli->close();
?>
