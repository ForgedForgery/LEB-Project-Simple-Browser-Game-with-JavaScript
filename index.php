<!DOCTYPE html>
<html lang="">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ressource Collector</title>
    <style type="text/css">
         canvas { border: 4px solid #2E9AFE; 
            background-color: white;}
        body { background-color: #A9F5D0; }
        h1 { color: #2E9AFE;
            font-family: algerian;
            text-align: center; }
    </style>
</head>

<body>
    <h1>Ressource Collector</h1>
    <center>
        <canvas id="tutorial" width="800" height="600"></canvas><br>
	<script src="Scripts/gameObjects.js"></script>
	<script src="Scripts/gameConfigs.js"></script>
        <?php 
            if (isset($_POST["user"]) && !empty($_POST["user"])) {
                $loginName = $_POST["user"];

                $sname = "localhost";
                $uname = "id3398325_benutzerxyz";
                $password = "einfachespasswort1234";
                $dbname = "id3398325_collector_anmeld";
                $conn = mysqli_connect($sname, $uname, $password, $dbname);
                
                function setJSVariables($inName, $inScore) {
                    echo '<script>
                        const loadedData = { name: "'.$inName.'",
             		';
                    echo '
                        score: '.(!empty($inScore) ? $inScore : 0).'}
                        </script>';
                }

                if (!$conn) {
                    die("Connection failed: " . mysqli_connect_error());
                }
                echo '<div id="status"></div>';
                echo '<div id="status2"></div>';

                $sql = "SELECT Benutzername, Score FROM benutzer where Benutzername = '$loginName'";
                $result = mysqli_query($conn, $sql);
                $array = mysqli_fetch_assoc($result);
                if ($array != NULL) {
                    echo '<script>
                        let status = document.getElementById("status");
                        status.innerText = "Logging in as '.$loginName.'...";
                        setTimeout(function(){status.innerText = "";}, 3000);
                    </script>';
                    setJSVariables($loginName, $array['Score']);
                } else {
                    echo '<script>
                            let status2 = document.getElementById("status2");
                            status2.innerText = "User does not exist. Creating '.$loginName.'  profile...";
                            setTimeout(function(){status2.innerText = "";}, 3000);
                        </script>';
                    // create new account and put it in database
                    $erstellen="INSERT INTO benutzer(Benutzername) VALUES ('$loginName')";
                    $sqlerstellen =mysqli_query($conn, $erstellen);         
                    setJSVariables($loginName, 0);
                    
                }

                mysqli_close($conn);
            } else {
				echo '<form method="post"><input type="text" name="user" placeholder="Benutzername"><input type="password" name="pass" placeholder="Passwort"><input type="submit" value="Log-In"></form>';
            }
        ?>
    </center>
    <script src="Scripts/game.js"></script>
</body>
</html>
    
