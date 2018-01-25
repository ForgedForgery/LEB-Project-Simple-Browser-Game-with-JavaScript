class SceneManager {
    constructor(inPlayerReference, inProgressionReference) {
        this.currentScenes = ["title"];
        this.allScenes = {
            title: new TitleMenu(inPlayerReference),
            game: new MainGame(inPlayerReference, inProgressionReference),
            store: new StoreMenu()
        };
    }
    
    update() {
        if(this.currentScenes.length != 0) {
            for(let scene in this.currentScenes){
                this.allScenes[this.currentScenes[scene]].update();
            }
        }
    } 
    
    draw() {
        if(this.currentScenes.length != 0) {
            for(let scene in this.currentScenes)
                this.allScenes[this.currentScenes[scene]].draw();
        }
    }
    
    changeTo(inScenes) {
        if(inScenes.isArray)
            this.currentScenes = inScenes;
        else
            this.currentScenes = [inScenes];
    }
}

class TitleMenu {
    constructor(inPlayerReference) {
        this.player = inPlayerReference;
        
        this.createMenuObjects();
    }
    
    createMenuObjects() {
        this.startButton = new Button({
                x: 400,
                y: 540,
                width: 500,
                height: 70,
                label: "Start Game",
                backgroundColor: "white",
                fontSize: "40px",
                fontType: "Arial",
                onClick: function() {
                    clearInterval(updateHighscoreInterval);
                    game.player.setTo(playerData);
                    game.scenes.changeTo("game");
                    loginForm.delete();
                }
            });
        
        this.titleText = new TextField({
            x: 400,
            y: 100,
            hasSide: true,
            color: titleTextColor,
            sideColor: titleTextSideColor,
            text: "Ressource Collector",
            type: "Ravie",
            size: "55px"
        });
        this.playerNameField = new TextField({
            x: 650,
            y: 480,
            text: "Angemeldet als " + this.player.name,
            align: 'right',
        });
        
        this.highscoreBoard = new HighscoreBoard({
            x: width/2,
            y: (height + heightUI)/2,
            height: 200,
            width: 500
        });
    }
    
    update() {
        this.startButton.update();
        this.playerNameField.setTextTo("Angemeldet als " + this.player.name);
        this.highscoreBoard.update();
    }
    
    draw() {
        this.drawBG();

        this.titleText.draw();
        this.titleBGBlur();
        this.playerNameField.draw();      
        this.startButton.draw();
        this.highscoreBoard.draw();
    }
    
    drawBG() {
        canvasContext.fillStyle = titleBGColor;
        canvasContext.rect(0, 0, width, height + heightUI);
        canvasContext.fill();
    }
    
    titleBGBlur() {
        canvasContext.beginPath();
        
        canvasContext.shadowBlur = 100;
        canvasContext.shadowColor = "black";
        canvasContext.fillStyle = this.titleText.color;
        canvasContext.font = this.titleText.size + " " + this.titleText.type;
        canvasContext.textAlign = this.titleText.align;
        canvasContext.textBaseline = this.textBaseline;
        
        canvasContext.fillText(this.titleText.text, this.titleText.x, this.titleText.y);
        
        canvasContext.closePath();
    }
    
//    draw {
//        canvasContext.fillStyle = textFieldColor;
//        canvasContext.strokeStyle = "blue";
//        canvasContext.textBaseline = 'middle';
//        canvasContext.closePath();
}

class HighscoreBoard {
    constructor(options) {
        this.data = highscoreData;
        this.x = options.x;
        this.y = options.y;
        this.height = options.height;
        this.width = options.width;
        
        this.left = this.x - this.width/2;
        this.top = this.y - this.height/2;
        
        this.firstPlace = new TextField({
            x: this.left + 30,
            y: this.top + this.height/3 * 0 + this.height/3/2,
            text: "#1", 
            align: 'center',
            shadowBlur: 5
        });
        
        this.secondPlace = new TextField({
            x: this.left + 30,
            y: this.top + this.height/3 * 1 + this.height/3/2,
            text: "#2", 
            align: 'center',
            shadowBlur: 5
        });
        
        this.thirdPlace = new TextField({
            x: this.left + 30,
            y: this.top + this.height/3 * 2 + this.height/3/2,
            text: "#3", 
            align: 'center',
            shadowBlur: 5
        });
        
        this.firstPlayerName = new TextField({
            x: this.left + 60 + 30,
            y: this.top + this.height/3 * 0 + this.height/3/2/2,
            text: highscoreData.name1, 
            align: 'left',
            shadowBlur: 5
        });
        this.secondPlayerName = new TextField({
            x: this.left + 60 + 30,
            y: this.top + this.height/3 * 1 + this.height/3/2/2,
            text: highscoreData.name2, 
            align: 'left',
            shadowBlur: 5
        });
        this.thirdPlayerName = new TextField({
            x: this.left + 60 + 30,
            y: this.top + this.height/3 * 2 + this.height/3/2/2,
            text: highscoreData.name3, 
            align: 'left',
            shadowBlur: 5
        });
        
        this.firstPlayerScore = new TextField({
            x: this.left + 60 + 30,
            y: this.top + this.height/3 * 0 + this.height/3/2/2*3,
            text: highscoreData.score1, 
            align: 'left',
            shadowBlur: 5
        });
        this.secondPlayerScore = new TextField({
            x: this.left + 60 + 30,
            y: this.top + this.height/3 * 1 + this.height/3/2/2*3,
            text: highscoreData.score2, 
            align: 'left',
            shadowBlur: 5
        });
        this.thirdPlayerScore = new TextField({
            x: this.left + 60 + 30,
            y: this.top + this.height/3 * 2 + this.height/3/2/2*3,
            text: highscoreData.score3, 
            align: 'left',
            shadowBlur: 5
        });
        
        this.highscoreText = new TextField ({
            x: this.left,
            y: this.top - 15,
            text: "Highscore",
            align: 'left',
            hasSide: true,
            shadowBlur: 5,
            type: "Ravie",
            size: "25px"            
        });
    }
    
    update() {
        this.firstPlayerName.setTextTo(highscoreData.name1);      
        this.secondPlayerName.setTextTo(highscoreData.name2);       
        this.thirdPlayerName.setTextTo(highscoreData.name3);
        
        this.firstPlayerScore.setTextTo(highscoreData.score1);      
        this.secondPlayerScore.setTextTo(highscoreData.score2);       
        this.thirdPlayerScore.setTextTo(highscoreData.score3);
    }
    
    draw() {
        this.drawBase();
        this.drawGrid();
        
        this.highscoreText.draw();
        
        this.firstPlace.draw();
        this.secondPlace.draw();
        this.thirdPlace.draw();
        
        this.firstPlayerName.draw();
        this.secondPlayerName.draw();
        this.thirdPlayerName.draw();
        
        this.firstPlayerScore.draw();
        this.secondPlayerScore.draw();
        this.thirdPlayerScore.draw();
    }
    
    drawBase() {
        canvasContext.beginPath();
        canvasContext.shadowColor = "black";
        canvasContext.shadowBlur = "5";
        
        canvasContext.lineWidth = "5";
        canvasContext.strokeStyle = "white";
        canvasContext.fillStyle = "white";
        canvasContext.rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        
        canvasContext.stroke();
        canvasContext.fill();
        
        canvasContext.lineWidth = "1";
        canvasContext.strokeStyle = "black";
        canvasContext.shadowBlur = 0;
        canvasContext.closePath();
    }
    
    drawGrid() {
        this.drawHorizontalGridLine(this.top + this.height/3);
        this.drawHorizontalGridLine(this.top + this.height/3 * 2);
        this.drawVerticalGridLine(this.left + 60);
    }
    
    drawHorizontalGridLine(h) {
        canvasContext.beginPath();
        canvasContext.moveTo(this.left, h);
        canvasContext.lineTo(this.left + this.width, h);
        canvasContext.stroke();
        canvasContext.closePath();
    }
    
    drawVerticalGridLine(b) {
        canvasContext.beginPath();
        canvasContext.moveTo(b, this.top);
        canvasContext.lineTo(b, this.top + this.height);
        canvasContext.stroke();
        canvasContext.closePath();
    }
}

class MainGame {
    constructor(inPlayerReference, inProgressionReference) {
        this.player = inPlayerReference;
        this.progression = inProgressionReference;
        this.gameUI = new GameUI(this.player, this.progression);
    }
    
    update() {
        this.progression.update();
        this.player.update();
        this.player.checkCollisionWith(this.progression);
        this.gameUI.update();
    }
    
    draw() {
        this.drawBG();
        this.progression.draw();
        this.player.draw();
        this.gameUI.draw();
    }
    
    drawBG() {
        canvasContext.beginPath();
        canvasContext.fillStyle = gameBGColor;
        canvasContext.rect(0, 0, width, height + heightUI);
        canvasContext.fill();
        canvasContext.closePath();
    }
}

class GameUI {
    constructor(inPlayerReference, inProgressionReference) {
        this.x = 0;
        this.y = height;
        this.width = width;
        this.height = heightUI;
        
        this.player = inPlayerReference;
        this.progression = inProgressionReference;
        
        this.createMenuObjects();
      
        this.spawnCooldownBars = [];
    }
    
    createMenuObjects() {
        this.saveButton = new Button({
            x: this.x + 769,
            y: this.y + 25,
            width: 38,
            height: 40,
            label: disketteImg,
            fontSize: "17px",
            onClick: () => doSave(),
            shadowBlur: 5,
            shadowBlurText: 5
        });
        
        this.shopButton = new Button({
            x: this.x + 680,
            y: this.y + 25,
            width: 100,
            label: "Shop",
            fontSize: "20px",
            shadowBlur: 5,
            shadowBlurText: 5,
            onClick: function() {
                    game.scenes.changeTo("store");
            }
        });
        
        this.playerNameField = new TextField({
            x: this.x + 10,
            y: this.y + 13,
            text: this.player.name,
            align: 'left',
            shadowBlur: 5
        });
                
        this.playerScorePreField = new TextField({
            x: this.x + 10,
            y: this.y + 38,
            text: "Score: ",
            align: 'left',
            shadowBlur: 5
        });
        
        this.playerScoreField = new TextField({
            x: this.x + 75,
            y: this.y + 37.5,
            color: playerScoreFieldColor,
            text: this.player.score,
            align: 'left'
        }); 
    }
    
    update() {
		this.checkIfNewLevelReached();		
        this.saveButton.update();
        this.shopButton.update();
        this.playerNameField.setTextTo(this.player.name);
        this.playerScoreField.setTextTo(this.player.score);
		for(let i = 0; i < this.spawnCooldownBars.length; i++)
            this.spawnCooldownBars[i].update();
    }
	
	checkIfNewLevelReached() {
		let amountToAdd = this.progression.activeLevels.length - this.spawnCooldownBars.length;
		while(amountToAdd > 0) {
			this.addNewCooldownBar();
			amountToAdd--;
		}
	}
	
	addNewCooldownBar() {
			this.spawnCooldownBars.push(new CooldownBar({
				x: width - 300 - (this.spawnCooldownBars.length * 20),
				y: height + 45,
				levelInstance: this.progression.activeLevels[this.spawnCooldownBars.length]
			}));
	}
    
    draw() {
        this.drawBackground();
        this.playerNameField.draw();
        this.playerScoreField.draw();
        this.playerScorePreField.draw();
        this.saveButton.draw();
        this.shopButton.draw();
        for(let i = 0; i < this.spawnCooldownBars.length; i++)
            this.spawnCooldownBars[i].draw();
    }
    
    drawBackground() {
        canvasContext.beginPath();
        canvasContext.rect(this.x, this.y, this.width, this.height);
        canvasContext.fillStyle = gameUIColor;
        canvasContext.fill();
        canvasContext.closePath();
    }
  
//might be useful somewhere else 
//draws a circular timer
//    drawCircleCooldown() {
//        canvasContext.beginPath();
//        canvasContext.moveTo(this.x + 80, this.y + 13);
//        canvasContext.arc(this.x + 80, this.y + 13, 10, -(Math.PI / 2), (Math.PI * 2 * this.progression.counter / this.progression.spawnTime) - Math.PI / 2);
//        canvasContext.lineTo(this.x + 80, this.y + 13);
//        canvasContext.fillStyle = textFieldSideColor;
//        canvasContext.fill();
//        canvasContext.strokeStyle = playerScoreFieldColor;
//        canvasContext.lineWidth = 1;
//        canvasContext.stroke();
//        canvasContext.closePath();
//    }
}

class RandomizeCollectiblesMenu{
    constructor(gameUIRef, progressionRef, config) {
        this.gameUI = gameUIRef;
        this.progression = progressionRef;
        
        this.x = config.x;
        this.y = config.y;
        this.width = config.width ;
        this.height = config.height;        
        this.visible = false;
        
        this.levelUpgradeButtons = [];
    
        this.randomizeLevelsButton = new Button({
            x: this.x + width - 265,
            y: this.y + heightUI - 33,
            width: 20,
            height: 20,
            label: "^",// TODO: dice picture
            affectedReference: this,
            onClick: function(reference){
                reference.visible = reference.visible ? false : true;
           //     x: width - 300 - (this.spawnCooldownBars.length * 20),
            }
        }); 
    }

    update(){
        if(this.gameUI.spawnCooldownBars.length > this.levelUpgradeButtons.length)
            this.createNewButton();
        
        if(this.visible)
            for(let i = 0; i < this.levelUpgradeButtons.length; i++)
                this.levelUpgradeButtons[i].update();
        this.randomizeLevelsButton.update(); 
    } 
    
    createNewButton() {
        this.levelUpgradeButtons.push(new Button({
            x: width - 300 - (this.levelUpgradeButtons.length * 20) + 7,
            y: this.y - 10,
            width: 12,
            height: 15,
            label: diceImg,// TODO: dice picture
            affectedReference: this.progression,
            onClick: function(reference) {
                reference.randomizeForLevel(this.levelUpgradeButtons.length);
            }
        }));
    }

    draw(){
        if(this.visible)
            for(let i = 0; i < this.levelUpgradeButtons.length; i++)
                this.levelUpgradeButtons[i].draw();
        this.randomizeLevelsButton.draw(); 
    }
}
    
class StoreMenu {
    constructor() {
        
    }
}
