<?php
$sname = "localhost";
$uname = "id3398325_benutzerxyz";
$password = "einfachespasswort1234";
$dbname = "id3398325_collector_anmeld";
$mysqli = new mysqli($sname, $uname, $password, $dbname);

if ($mysqli->connect_errno) {
    die("Connection failed: " . $mysqli->connect_error());
    exit();
}

$query = "SELECT Benutzername, Score FROM `benutzer` ORDER BY Score DESC LIMIT 3";
if ($result = $mysqli->query($query)) {
    echo '{';
    $counter = 0
    while ($row = $result->fetch_assoc()) {
        echo '
            "name'.$counter.'": "'.$row['Benutzername'].'",
            "score'.$counter.'": '.$row['Score'].',';
        $counter++;
    }
    echo '}';
}
$mysqli->close();

?>
