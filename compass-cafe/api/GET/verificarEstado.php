<?php
header('Content-Type: application/json');
session_start();

// Verifica si hay sesión activa
if (!isset($_SESSION['id'])) {
    echo json_encode(["sesion" => false]);
    exit();
}

echo json_encode(["sesion" => true]);
