<?php
session_start();
include "db.php";

$email_cookie = isset($_COOKIE['user_email']) ? $_COOKIE['user_email'] : "";

if (isset($_POST['login'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            $_SESSION['user'] = $user['name'];

            // Cookie: store email for autofill (7 days)
            setcookie("user_email", $email, time() + (7 * 24 * 60 * 60));

            // Cookie: last login time
            setcookie("last_login", date("Y-m-d H:i:s"), time() + (7 * 24 * 60 * 60));

            header("Location: dashboard.php");
        } else {
            echo "Wrong password!";
        }
    } else {
        echo "User not found!";
    }
}
?>

<form method="POST">
    <h2>Login</h2>
    <input type="email" name="email" placeholder="Email" value="<?php echo $email_cookie; ?>" required><br><br>
    <input type="password" name="password" placeholder="Password" required><br><br>
    <button name="login">Login</button>
</form>
<!-- <br> -->
<p>Don't have an account?</p>

<form action="register.php" method="get">
    <button type="submit">Register</button>
</form>