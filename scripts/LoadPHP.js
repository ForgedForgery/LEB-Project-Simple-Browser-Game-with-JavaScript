class LoginForm {
    constructor() {
        this.create();
    }
    
    create() {
        document.getElementById('login').innerHTML = '<input id="nameInput" type="text" name="user" placeholder="Benutzername"><input id="passInput" type="password" name="pass" placeholder="Passwort"><input type="submit" value="Log-In" onclick="doLogin()">';
    }
    
    delete() {
        document.getElementById("login").innerHTML = "";
    }
}

function doLogin() {
    loadPHP("scripts/server/loadData.php?user=" + document.getElementById("nameInput").value + "&pass=" + document.getElementById("passInput").value, loadData);
}

function doLoadHighscore() {
    loadPHP("scripts/server/loadHighscore.php", handleHighscoreLoading);   
}

function doSave() {
    playerData.name = game.player.name;
    playerData.score = game.player.score;
    loadPHP("scripts/server/saveData.php?user=" + playerData.name + "&score=" + playerData.score, saveData);
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
    playerData = {
        name: loadedData.name,
        score: loadedData.score
    };
    game.player.setTo(playerData);
    
    loginForm.delete();
    
    let status = document.getElementById("status");
    if(loadedData.status == "New account created.")
        status.innerText += "New account created! ";
    status.innerText += "Logged in as " + playerData.name + "...";
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