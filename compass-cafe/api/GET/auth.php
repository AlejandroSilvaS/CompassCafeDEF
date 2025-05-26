<?php
header('Content-Type: application/json');
session_start();

$jsonData = file_get_contents('php://input');
//echo $jsonData;
//DECODE JSON data
$decodeData = json_decode($jsonData, true);

// CONEXIÓN EXTERNA (ADAPTADA)
require_once("../conexion.php"); // Ajusta la ruta según ubicación real

$correo = $decodeData['correo'];
$contrasena = $decodeData['password'];

$sql  = "SELECT * FROM `usuario` WHERE `correo`='".$correo."' AND `aceptado`='1'; ";
$sql2 = "SELECT * FROM `usuario` WHERE `correo`='".$correo."' AND `aceptado`='0'; ";

$result  = $mysqli->query($sql);
$result2 = $mysqli->query($sql2);

$data = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        if ($row['contrasena'] === $contrasena) {
            $row += ["acceso" => true];
            $_SESSION['id'] = $row["id_user"];
            $_SESSION['sesion'] = true;
            echo json_encode($row);
        } else {
            $_SESSION['sesion'] = false;
            echo json_encode(["acceso" => false]);
        }
        //$data[] = $row;
    }
} else if ($result2->num_rows > 0) {
    echo json_encode(["accesoAcept" => false]);
} else {
    echo json_encode(["registro" => false]);
}

$mysqli->close();
?>
