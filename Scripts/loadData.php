<?php 
$loginName = $_GET["user"];
$loginPass = $_GET["pass"];

$sname = "localhost";
$uname = "id3398325_benutzerxyz";
$password = "einfachespasswort1234";
$dbname = "id3398325_collector_anmeld";
$conn = mysqli_connect($sname, $uname, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT Benutzername, Score FROM benutzer where Benutzername = '$loginName'";
$result = mysqli_query($conn, $sql);
$array = mysqli_fetch_assoc($result);
if ($array != NULL) {
    echo '{
        "name": "'.$array['Benutzername'].'",
        "score": '.$array['Score'].'
    }';
} else {
    // create new account and put it in database
    $erstellen="INSERT INTO benutzer(Benutzername) VALUES ('$loginName')";
    $sqlerstellen = mysqli_query($conn, $erstellen);
    echo '{
        "name": "'.$loginName.'",
        "score": 0
    }';

}
mysqli_close($conn);
?>