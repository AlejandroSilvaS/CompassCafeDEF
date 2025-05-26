<?php
header('Content-Type: application/json');
session_start();

// Leer y decodificar JSON recibido
$jsonData = file_get_contents('php://input');
$decodeData = json_decode($jsonData, true);

// Conexión externa
require_once("../conexion.php"); // Asegúrate que conexion.php está en /htdocs

$correo = $decodeData['correo'];
$contrasena = $decodeData['password'];

$sql = "SELECT * FROM `admin` WHERE `correo` = '".$correo."';";
$result = $mysqli->query($sql);

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        if ($row['contrasena'] === $contrasena) {
            $_SESSION["sesionAdmin"] = true;
            $_SESSION["id_Admin"] = $row['id_admin'];
            $row += ["accesoAdmin" => true];
            echo json_encode($row);
        } else {
            $_SESSION["sesionAdmin"] = false;
            echo json_encode(["accesoAdmin" => false]);
        }
    }
} else {
    $_SESSION["sesionAdmin"] = false;
    echo json_encode(["accesoAdmin" => false]);
}

$mysqli->close();
?>
