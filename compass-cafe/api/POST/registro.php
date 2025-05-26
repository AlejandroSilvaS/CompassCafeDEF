<?php
header('Content-Type: application/json');
session_start();

// Conexión
require_once("../conexion.php");
mysqli_set_charset($mysqli, "utf8");

// Validar campos obligatorios
$campos_obligatorios = [
    "email", "cuentainstagram", "numeroCelular", "contrasena",
    "nit", "nombreTienda", "descripcionBreve", "descripcionLarga", "direccionTienda",
    "nombreBebida", "descripcionCafe"
];

foreach ($campos_obligatorios as $campo) {
    if (!isset($_POST[$campo]) || trim($_POST[$campo]) === "") {
        echo json_encode(["estado" => "error", "mensaje" => "Campo faltante: $campo"]);
        exit();
    }
}

// Sanitizar entradas
$correo             = $mysqli->real_escape_string($_POST["email"]);
$ig_cuenta          = $mysqli->real_escape_string($_POST['cuentainstagram']);
$celular            = $mysqli->real_escape_string($_POST['numeroCelular']);
$contrasena         = password_hash($_POST['contrasena'], PASSWORD_BCRYPT);

$nit                = $mysqli->real_escape_string($_POST["nit"]);
$nombre             = $mysqli->real_escape_string($_POST["nombreTienda"]);
$descripcionBreve   = $mysqli->real_escape_string($_POST["descripcionBreve"]);
$descripcionAmplia  = $mysqli->real_escape_string($_POST["descripcionLarga"]);
$direccion          = $mysqli->real_escape_string($_POST["direccionTienda"]);

$nombreBebida       = $mysqli->real_escape_string($_POST["nombreBebida"]);
$descripcionBebida  = $mysqli->real_escape_string($_POST["descripcionCafe"]);

// Manejo de imágenes
function procesarImagenOpcional($archivo, $carpeta) {
    if (!isset($archivo) || $archivo['error'] === 4) return null;

    $ext = match ($archivo["type"]) {
        "image/jpeg" => ".jpeg",
        "image/jpg"  => ".jpg",
        "image/png"  => ".png",
        "image/webp" => ".webp",
        default      => null
    };

    if (!$ext) return null;

    $nombreArchivo = uniqid("img_") . $ext;
    $rutaServidor = "../../img/$carpeta/" . $nombreArchivo;
    $rutaWeb = "img/$carpeta/" . $nombreArchivo;

    move_uploaded_file($archivo["tmp_name"], $rutaServidor);
    return $rutaWeb;
}

$rutaPortada = procesarImagenOpcional($_FILES["imgPortada"] ?? null, "portada");
$rutaLogo    = procesarImagenOpcional($_FILES["imgLogo"] ?? null, "logo");
$rutaBebida  = procesarImagenOpcional($_FILES["imgBebida"] ?? null, "bebida");

// Registro paso a paso
$respuesta = [];

# 1. Usuario
$sql1 = "INSERT INTO `usuario` (`correo`, `ig_cuenta`, `celular`, `contrasena`) 
         VALUES ('$correo', '$ig_cuenta', '$celular', '$contrasena');";
if ($mysqli->query($sql1)) {
    $id_user = $mysqli->insert_id;
    $respuesta["usuario"] = "ok";
} else {
    echo json_encode(["estado" => "error", "paso" => "usuario", "error" => $mysqli->error]);
    exit();
}

# 2. Tienda
$sql2 = "INSERT INTO `tienda` 
    (`NIT`, `nombre`, `descripcion_breve`, `descripcion_amplia`, `direccion`, `img_logo`, `img_portada`, `id_user`)
    VALUES ('$nit', '$nombre', '$descripcionBreve', '$descripcionAmplia', '$direccion', 
    ".($rutaLogo ? "'$rutaLogo'" : "NULL").", ".($rutaPortada ? "'$rutaPortada'" : "NULL").", '$id_user');";

if ($mysqli->query($sql2)) {
    $id_tienda = $mysqli->insert_id;
    $respuesta["tienda"] = "ok";
} else {
    echo json_encode(["estado" => "error", "paso" => "tienda", "error" => $mysqli->error]);
    exit();
}

# 3. Participación
$sql3 = "INSERT INTO `participacion_tienda` (`id_tienda`, `id_version`) VALUES ('$id_tienda', '4');";
if ($mysqli->query($sql3)) {
    $id_participacion = $mysqli->insert_id;
    $respuesta["participacion"] = "ok";
} else {
    echo json_encode(["estado" => "error", "paso" => "participacion", "error" => $mysqli->error]);
    exit();
}

# 4. Bebida
$sql4 = "INSERT INTO `bebida` (`nombre`, `descripcion`, `img_bebida`, `id_participacion`) 
         VALUES ('$nombreBebida', '$descripcionBebida', ".($rutaBebida ? "'$rutaBebida'" : "NULL").", '$id_participacion');";

if ($mysqli->query($sql4)) {
    $respuesta["bebida"] = "ok";
} else {
    echo json_encode(["estado" => "error", "paso" => "bebida", "error" => $mysqli->error]);
    exit();
}

// Todo correcto
$respuesta["estado"] = "registro_completo";
echo json_encode($respuesta);

$mysqli->close();
?>
