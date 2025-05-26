<?php
header('Content-Type: application/json');
session_start();

// Verificar sesión
if (!isset($_SESSION['id'])) {
    echo json_encode(["sesion" => false]); 
    exit();
}

// Conexión centralizada
require_once("../conexion.php"); // ← Asegúrate que el archivo está en /api/

$sql = "SELECT * FROM `tienda` WHERE `id_user` = '".$_SESSION['id']."';";
$result = $mysqli->query($sql);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $row["sesion"] = true;
    echo json_encode($row);
} else {
    echo json_encode(["sesion" => false]); 
}

$mysqli->close();
?>
