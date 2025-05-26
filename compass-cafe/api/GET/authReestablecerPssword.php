<?php
header('Content-Type: application/json'); // Debe ir antes de cualquier salida
session_start();

// Leer datos JSON del frontend
$jsonData = file_get_contents('php://input');
$decodeData = json_decode($jsonData, true);

// Conexión reutilizable
require_once("../conexion.php"); // Ajusta si el archivo está en /GET o /POST

$correo = $decodeData['correo'];

$sql = "SELECT * FROM `usuario` WHERE `correo`='" . $correo . "' AND `aceptado`='1';";
$result = $mysqli->query($sql);

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row += ["acceso" => true];
        $_SESSION['id_user'] = $row["id_user"];
        echo json_encode($row);
    }
} else {
    echo json_encode(["acceso" => false]);
}

$mysqli->close();
?>
