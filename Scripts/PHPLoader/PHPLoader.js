function doLogin() {
    loadPHP("Scripts/PHPLoader/PHP Files/loadData.php?user=" + document.getElementById("nameInput").value + "&pass=" + document.getElementById("passInput").value, loadData);
}

function doSave(inPlayer, inProgression) {
	loadedPlayerData = {};
    loadedPlayerData.name = inPlayer.name;
	loadedPlayerData.score = inPlayer.score;
	loadedPlayerData.levels = {};
	for(let l in inProgression.activeLevels) {
		loadedPlayerData.levels[l] = {};
		loadedPlayerData.levels[l].color = inProgression.activeLevels[l].colorList;
		loadedPlayerData.levels[l].pattern = inProgression.activeLevels[l].patternKeyword;
		
		if(inProgression.activeLevels[l].patternKeyword == "randomCircles") {
			loadedPlayerData.levels[l].patternData = inProgression.activeLevels[l].randomCircleData;
		}
		loadedPlayerData.levels[l].shape = inProgression.activeLevels[l].shapeKeyword;
	}
	
    console.log(loadedPlayerData);
    
    loadPHP("Scripts/PHPLoader/PHP Files/saveData.php?user=" + loadedPlayerData.name + "&score=" + loadedPlayerData.score + "&data=" + JSON.stringify(loadedPlayerData), saveData);
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
    loadedPlayerData = loadedData;
	
	game.player.updateLoadedData();
    console.log(loadedData.status);
	if(loadedData.status != "New account created!")
		game.progression.updateLoadedData();
    
    loginForm.delete();
    
    let status = document.getElementById("status");
    if(loadedData.status == "New account created!")
        status.innerText += loadedData.status;
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