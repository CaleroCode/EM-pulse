<?php
// Conexión a la base de datos
$conn = new mysqli("localhost", "root", "", "em_pulse");

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener datos del formulario
$nombre = $_POST["nombre"];
$mensaje = $_POST["mensaje"];

// Insertar en la base de datos
$sql = "INSERT INTO testimonios (nombre, mensaje) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $nombre, $mensaje);

if ($stmt->execute()) {
    header("Location: /EM-PULSE/testimonios.html");
    exit();
} else {
    echo "Error al guardar testimonio: " . $conn->error;
}

$stmt->close();
$conn->close();
?>
