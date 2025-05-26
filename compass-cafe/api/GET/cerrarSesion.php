<?php
header('Content-Type: application/json');
session_start();

$_SESSION=array();

// Finalmente, destruir la sesión
session_destroy();

echo json_encode(["sesionClose" => true]); 
exit();
?>