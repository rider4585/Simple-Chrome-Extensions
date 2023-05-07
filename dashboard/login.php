<?php
// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";

// Get login credentials from form data
$email = $_POST["name"];
// $password = $_POST["password"];

// Create database connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Validate login credentials
$sql = "SELECT * FROM test WHERE Name='$email'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
  echo "success";
} else {
  echo "error";
}

// Close database connection
mysqli_close($conn);
?>
