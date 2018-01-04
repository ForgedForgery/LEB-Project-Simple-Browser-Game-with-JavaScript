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

$sql = "SELECT Benutzername, Score FROM `benutzer` ORDER BY Score DESC LIMIT 3";
$result = mysqli_query($conn, $sql);
$array = mysqli_fetch_assoc($result);
if ($array != NULL) {
    echo '{
        "name1": "'.$array[0].'",
        "score2": '.$array[1].',
        "name2": "'.$array[2].'",
        "score2": '.$array[3].',
        "name3": "'.$array[4].'",
        "score3": '.$array[5].',
    }';
    
mysqli_close($conn);

?>
