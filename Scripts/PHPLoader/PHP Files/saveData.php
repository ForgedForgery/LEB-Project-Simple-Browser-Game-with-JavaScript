<?php
$name = $_GET["user"];
$score = $_GET["score"];

$sname = "localhost";
$uname = "id3398325_benutzerxyz";
$password = "einfachespasswort1234";
$dbname = "id3398325_collector_anmeld";
$conn = mysqli_connect($sname, $uname, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "UPDATE benutzer  SET Score = '$score'  where Benutzername = '$name'";
$results = mysqli_query($conn, $sql);
if ($results == 1){
    echo '{
        status: "Game saved."
    }'; 
}
mysqli_close($conn);

?>
