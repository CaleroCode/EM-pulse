<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "7070";
$dbname = "em_pulse";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Obtener testimonios de la base de datos
$sql = "SELECT * FROM testimonios ORDER BY fecha DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    echo '<article class="testimonio">';
    echo '<h2>' . htmlspecialchars($row['nombre']) . '</h2>';
    echo '<h3>' . htmlspecialchars($row['mensaje']) . '</h3>';
    echo '<p>' . htmlspecialchars($row['fecha']) . '</p>';
    echo '</article>';
  }
} else {
  echo "No testimonios encontrados.";
}

$conn->close();
?>
