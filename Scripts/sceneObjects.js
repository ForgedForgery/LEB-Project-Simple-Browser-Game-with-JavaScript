class SceneManager {
    constructor(inPlayerReference, inProgressionReference, inHighscoreReference) {
        this.currentScenes = ["title"];
        this.allScenes = {
            title: new TitleMenu(inPlayerReference, inHighscoreReference),
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
    constructor(inPlayerReference,inHighscoreReference ) {
        this.player = inPlayerReference;
        this.highscore = inHighscoreReference;
        this.startButton = new Button({
                        x: 400,
                        y: 540,
                        width: 500,
                        height: 70,
                        label: "Start Game",
                        fontSize: "40px",
                        fontType: "Arial",
                        onClick: function() {
                            game.player.setTo(playerData);
                            game.scenes.changeTo("game");
                            loginForm.delete();
                        }
                    });
        
        this.highscoreButton =new Button({
                        x: 400,
                        y: 340,
                        width: 500,
                        height: 70,
                        label: "See the Highscore",
                        fontSize: "40px",
                        fontType: "Arial",
                        onClick: () => doHighscore(),
                    });
        
        this.titleText = new TextField({
            x: 400,
            y: 100,
            hasSide: true,
            shadowBlur: 5,
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
            shadowBlur: 5
        });
        this.higscoreOneField = new TextField({
            x: 600,
            y: 400,
            text: "Highscore von ", + this.highscore.name1,
            align: 'right',
            shadowBlur: 5
        });
    }
    
    update() {
        this.startButton.update();
        this.highscoreButton.update();
        this.playerNameField.setTextTo("Angemeldet als " + this.player.name);
        this.higscoreOneField.setTextTo("Highscore von" + this.highscore.name1);
    }
    
    draw() {
        this.drawBG();
        
        this.titleText.draw();
        this.titleBGBlur();
        this.playerNameField.draw();      
        this.startButton.draw();
        this.highscoreButton.draw();
        this.higscoreOneField.draw();
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
        
        this.saveButton = new Button({
            x: this.x + 769,
            y: this.y + 25,
            width: 50,
            height: 25,
            label: "Save",
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
            shadowBlurText: 5
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
        
        this.spawnCooldowns = [];
        for(let i in this.progression.list) {
            this.spawnCooldowns.push(new Cooldown({
                x: this.x + 500,
                y: this.y + 45,
                progression: inProgressionReference
            }));
        }
    }
    
    update() {
        this.saveButton.update();
        this.shopButton.update();
        
        this.playerNameField.setTextTo(this.player.name);
        this.playerScoreField.setTextTo(this.player.score);
    }
    
    draw() {
        this.drawBackground();
        
        this.playerNameField.draw();
        this.playerScoreField.draw();
        this.playerScorePreField.draw();
        
        this.saveButton.draw();
        this.shopButton.draw();
        
        for(let i = 0; i < this.spawnCooldowns.length; i++)
            this.spawnCooldowns[i].draw();
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

class StoreMenu {
    constructor() {
        
    }
}