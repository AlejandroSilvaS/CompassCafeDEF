<?php
$jsonData = file_get_contents('php://input');
$decodeData = json_decode($jsonData,true);
if (!$decodeData) {
    echo json_encode(["error" => "No se pudo decodificar el JSON."]);
    exit;
}

$mysqli = new mysqli("localhost", "root", "", "compass-cafe"); //Servidor local

//$mysqli = new mysqli("sql204.infinityfree.com", "if0_38937267", "zgQPJi8QFjp", "if0_38937267_compass_cafe"); //Servidor online
mysqli_set_charset($mysqli,"utf8");

session_start();

$id_user = $decodeData['id_user'];
$aceptado=$decodeData['aceptado'];

$sql = "UPDATE `usuario` SET `aceptado` = '".$aceptado."' WHERE `usuario`.`id_user` = '".$id_user."';";

$resultado = $mysqli->query($sql);

// Validar si se actualizó correctamente
if ($resultado) {
    if ($mysqli->affected_rows > 0) {
        echo json_encode(["aceptadoState" => $aceptado]);
    } else {
        //"No se actualizó el estado de aceptado (posiblemente no cambió nada o el ID no existe).";
        echo json_encode(["aceptadoState" => $aceptado]);
    }
} else {
    echo "Error en la consulta: " . $mysqli->error;
}

$mysqli->close(); 
?>