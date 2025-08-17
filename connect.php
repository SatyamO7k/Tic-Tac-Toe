<?php
$playerX = $_POST['player-x'];
$playerO = $_POST['player-o'];

// Connect to the database

$conn = new mysqli('localhost' , 'root', '', 'Tic_Tac_Toe');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}else {
    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO players(Player_X, Player_O) VALUES (?, ?)");
    $stmt->bind_param("ss", $Player_X, $Player_O);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Players added successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>