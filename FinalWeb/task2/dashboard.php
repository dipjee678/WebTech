<?php
session_start();

if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}

$name = $_SESSION['user'];
$last_login = isset($_COOKIE['last_login']) ? $_COOKIE['last_login'] : "First login";
?>

<h2>Dashboard</h2>
<p>Welcome, <?php echo $name; ?> 🎉</p>

<p>Last Login: <?php echo $last_login; ?></p>

<a href="logout.php">Logout</a>