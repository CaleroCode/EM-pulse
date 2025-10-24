<!-- testimonios.php -->
<?php
// Conexión a la base de datos
$conn = new mysqli("localhost", "root", "7070", "em_pulse");

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Verificar si se está enviando un nuevo testimonio
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['nombre'], $_POST['mensaje'])) {
    // Obtener los datos del formulario
    $nombre = $_POST['nombre'];
    $mensaje = $_POST['mensaje'];

    // Insertar el testimonio en la base de datos
    $sql = "INSERT INTO testimonios (nombre, mensaje) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $nombre, $mensaje);

    if ($stmt->execute()) {
        echo "<p>Testimonio añadido correctamente.</p>";
    } else {
        echo "<p>Error al agregar testimonio: " . $stmt->error . "</p>";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Testimonios - EM-PULSE</title>
    <link rel="stylesheet" href="../styles/testimonios.css">
</head>
<body>

    <main class="section">
        <h1>Testimonios</h1>

        <!-- Formulario para agregar un nuevo testimonio -->
        <form action="testimonios.php" method="POST" class="formulario">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>

            <label for="mensaje">Testimonio:</label>
            <textarea id="mensaje" name="mensaje" required></textarea>

            <button type="submit">Enviar Testimonio</button>
        </form>

        <section class="testimonios-lista">
        <?php
        // Obtener testimonios de la base de datos
        $sql = "SELECT * FROM testimonios ORDER BY fecha DESC";
        $result = $conn->query($sql);

        if ($result && $result->num_rows > 0) {
            // Mostrar cada testimonio
            while($row = $result->fetch_assoc()) {
                echo '<article class="testimonio">';
                echo '<h2>' . htmlspecialchars($row["nombre"]) . '</h2>';
                echo '<p>' . nl2br(htmlspecialchars($row["mensaje"])) . '</p>';
                echo '<span class="fecha">' . htmlspecialchars($row["fecha"]) . '</span>';
                echo '</article>';
            }
        } else {
            echo "<p>No hay testimonios aún. Sé el primero en compartir el tuyo.</p>";
        }

        // Cerrar la conexión
        $conn->close();
        ?>
        </section>
    </main>

</body>
</html>
