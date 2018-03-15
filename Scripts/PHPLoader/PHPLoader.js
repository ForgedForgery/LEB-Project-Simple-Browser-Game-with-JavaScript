function doLogin() {
    loadPHP("Scripts/PHPLoader/PHP Files/loadData.php?user=" + document.getElementById("nameInput").value + "&pass=" + document.getElementById("passInput").value, loadData);
}

function doSave(inPlayer, inProgression) {
    loadedPlayerData.name = inPlayer.name;
    
    loadPHP("Scripts/PHPLoader/PHP Files/saveData.php?user=" + loadedPlayerData.name + "&data=" + JSON.stringify(loadedPlayerData), saveData);
    console.log(loadedPlayerData);
}

function doLoadHighscore() {
    loadPHP("Scripts/PHPLoader/PHP Files/loadHighscore.php", handleHighscoreLoading);   
}

function loadPHP(url, cFunction) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function loadData(xhttp) {
    let loadedData = JSON.parse(xhttp.responseText);
    loadedPlayerData = {
        name: loadedData.name,
        score: loadedData.score
    };
	game.player.updateLoadedData();
    
    loginForm.delete();
    
    let status = document.getElementById("status");
    if(loadedData.status == "New account created.")
        status.innerText += "New account created! ";
    status.innerText += "Logged in as " + loadedPlayerData.name + "...";
    setTimeout(function(){status.innerText = "";}, 3000);
}

function saveData(xhttp) {
    let status = document.getElementById("status");
    let loadedData = JSON.parse(xhttp.responseText);
    
    if(loadedData.status == "Game saved.")
        status.innerText += "Game has been saved.";
    else
        status.innerText += "Failed to save.";
    setTimeout(function(){status.innerText = "";}, 3000);
}

function handleHighscoreLoading(xhttp) {
    let loadedData = JSON.parse(xhttp.responseText);
    highscoreData = {
        name1: loadedData.name1,
        score1: loadedData.score1,
        name2: loadedData.name2,
        score2: loadedData.score2,
        name3: loadedData.name3,
        score3: loadedData.score3
    };
}