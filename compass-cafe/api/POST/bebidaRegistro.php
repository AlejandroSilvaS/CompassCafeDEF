<?php
header('Content-Type: application/json');
session_start();

require_once("../conexion.php");
mysqli_set_charset($mysqli, "utf8");

// Validar sesión
if (!isset($_SESSION['id'])) {
    echo json_encode(["status" => "no_sesion"]);
    exit();
}

$id_user = $_SESSION['id'];

// Verificar existencia de tienda
$sqlTienda = "SELECT * FROM `tienda` WHERE `id_user` = '$id_user';";
$resultTienda = $mysqli->query($sqlTienda);
$id_tienda = null;

if ($resultTienda && $resultTienda->num_rows > 0) {
    $row = $resultTienda->fetch_assoc();
    $id_tienda = $row["id_tienda"];
} else {
    echo json_encode(["status" => "sin_tienda"]);
    exit();
}

// Verificar si ya está registrada en esta versión
$sqlVerificacion = "SELECT * FROM `participacion_tienda` WHERE `id_tienda` = '$id_tienda' AND `id_version` = '2';";
$resultVerificacion = $mysqli->query($sqlVerificacion);
if ($resultVerificacion && $resultVerificacion->num_rows > 0) {
    echo json_encode(["status" => "ya_registrado"]);
    exit();
}

// Recibir datos del formulario
$nombreBebida = $_POST["nombreBebida"] ?? "";
$descripcionBebida = $_POST["descripcionCafe"] ?? "";
$imgBebida = $_FILES["imgBebida"] ?? null;

// Función para procesar imagen
function procesarImagenOpcional($archivo, $carpeta) {
    if (!$archivo || $archivo['error'] === 4) return null;

    $ext = match ($archivo["type"]) {
        "image/jpeg" => ".jpeg",
        "image/jpg"  => ".jpg",
        "image/png"  => ".png",
        default      => null
    };

    if (!$ext) return null;

    $nombreArchivo = md5(uniqid()) . $ext;
    $rutaRelativa = "../../img/$carpeta/$nombreArchivo";
    move_uploaded_file($archivo["tmp_name"], $rutaRelativa);

    return $rutaRelativa;
}

$rutaBebida = procesarImagenOpcional($imgBebida, "bebida");

// Registrar participación
$sqlInsertParticipacion = "INSERT INTO `participacion_tienda` (`id_tienda`, `id_version`) VALUES ('$id_tienda', '2');";
if (!$mysqli->query($sqlInsertParticipacion)) {
    echo json_encode(["status" => "error_participacion"]);
    exit();
}

$id_participacion = $mysqli->insert_id;

// Registrar bebida
$sqlInsertBebida = "
    INSERT INTO `bebida` (`nombre`, `descripcion`, `img_bebida`, `id_participacion`)
    VALUES ('". $mysqli->real_escape_string($nombreBebida) ."',
            '". $mysqli->real_escape_string($descripcionBebida) ."',
            ". ($rutaBebida ? "'$rutaBebida'" : "NULL") .",
            '$id_participacion');
";

if (!$mysqli->query($sqlInsertBebida)) {
    echo json_encode(["status" => "error_bebida"]);
    exit();
}

echo json_encode(["status" => "ok", "rutaImg" => $rutaBebida ?? null]);
$mysqli->close();
?>
