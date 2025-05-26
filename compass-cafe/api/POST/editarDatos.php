<?php
header('Content-Type: application/json');
session_start();

// Validar sesión
if (!isset($_SESSION['id']) || !isset($_SESSION['response'])) {
    echo json_encode(["estado" => "sin_sesion"]);
    exit();
}

// Conexión centralizada
require_once("../conexion.php");
mysqli_set_charset($mysqli, "utf8");

$response = $_SESSION['response'];
$id_user = $_SESSION['id'];

$id_tienda = $response["tienda"][0]["id_tienda"];
$id_participacion = $response["bebida"][0]["id_participacion"] ?? null;

// --- Datos recibidos del formulario ---
$ig_cuenta          = $_POST['cuentainstagram'] ?? "";
$celular            = $_POST['numeroCelular'] ?? "";
$nombre             = $_POST["nombreTienda"] ?? "";
$descripcionBreve   = $_POST["descripcionBreve"] ?? "";
$descripcionAmplia  = $_POST["descripcionLarga"] ?? "";
$direccion          = $_POST["direccionTienda"] ?? "";
$nombreBebida       = $_POST["nombreBebida"] ?? "";
$descripcionBebida  = $_POST["descripcionCafe"] ?? "";

$imgPortada = $_FILES["imgPortada"] ?? null;
$imgLogo    = $_FILES["imgLogo"] ?? null;
$imgBebida  = $_FILES["imgBebida"] ?? null;

// --- Función para procesar imágenes opcionales ---
function procesarImagenOpcional($archivo, $carpeta) {
    if (!$archivo || $archivo['error'] === 4) return null;

    $ext = match ($archivo["type"]) {
        "image/jpeg" => ".jpeg",
        "image/jpg"  => ".jpg",
        "image/png"  => ".png",
        default      => null
    };

    if (!$ext) return null;

    $nombreArchivo = uniqid("img_") . $ext;
    $rutaServidor = "../../img/$carpeta/" . $nombreArchivo;
    $rutaWeb = "img/$carpeta/" . $nombreArchivo;

    move_uploaded_file($archivo["tmp_name"], $rutaServidor);
    return $rutaWeb;
}

$rutaPortada = procesarImagenOpcional($imgPortada, "portada");
$rutaLogo    = procesarImagenOpcional($imgLogo, "logo");
$rutaBebida  = procesarImagenOpcional($imgBebida, "bebida");

// --- Función generadora de SQL UPDATE ---
function generarUpdate($tabla, $campos, $where) {
    global $mysqli;
    $set = [];
    foreach ($campos as $col => $val) {
        $val_escapado = $mysqli->real_escape_string($val);
        $set[] = "`$col` = '$val_escapado'";
    }
    if (count($set) === 0) return false;
    return "UPDATE `$tabla` SET " . implode(", ", $set) . " WHERE $where;";
}

// --- Actualizar tablas ---
$resultados = [];

## Tienda
$tienda_actual = $response["tienda"][0];
$camposTienda = [];
if ($tienda_actual["nombre"] !== $nombre)                     $camposTienda["nombre"] = $nombre;
if ($tienda_actual["descripcion_breve"] !== $descripcionBreve) $camposTienda["descripcion_breve"] = $descripcionBreve;
if ($tienda_actual["descripcion_amplia"] !== $descripcionAmplia) $camposTienda["descripcion_amplia"] = $descripcionAmplia;
if ($tienda_actual["direccion"] !== $direccion)               $camposTienda["direccion"] = $direccion;
if ($rutaLogo)                                                $camposTienda["img_logo"] = $rutaLogo;
if ($rutaPortada)                                             $camposTienda["img_portada"] = $rutaPortada;

$sql = generarUpdate("tienda", $camposTienda, "id_tienda = '$id_tienda'");
if ($sql) {
    $resultados["tienda"] = $mysqli->query($sql) ? "ok" : "fail";
}

## Usuario
$usuario_actual = $response["usuario"][0];
$camposUsuario = [];
if ($usuario_actual["ig_cuenta"] !== $ig_cuenta) $camposUsuario["ig_cuenta"] = $ig_cuenta;
if ($usuario_actual["celular"] !== $celular)     $camposUsuario["celular"] = $celular;

$sql = generarUpdate("usuario", $camposUsuario, "id_user = '$id_user'");
if ($sql) {
    $resultados["usuario"] = $mysqli->query($sql) ? "ok" : "fail";
}

## Bebida
$bebida_actual = $response["bebida"][0];
$camposBebida = [];
if ($bebida_actual["nombre"] !== $nombreBebida)         $camposBebida["nombre"] = $nombreBebida;
if ($bebida_actual["descripcion"] !== $descripcionBebida) $camposBebida["descripcion"] = $descripcionBebida;
if ($rutaBebida)                                         $camposBebida["img_bebida"] = $rutaBebida;

if ($id_participacion) {
    $sql = generarUpdate("bebida", $camposBebida, "id_participacion = '$id_participacion'");
    if ($sql) {
        $resultados["bebida"] = $mysqli->query($sql) ? "ok" : "fail";
    }
}

$mysqli->close();
echo json_encode(["estado" => "procesado", "resultados" => $resultados]);
?>
