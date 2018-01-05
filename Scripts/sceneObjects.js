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
        
        this.startButton = new Button({
                        x: 400,
                        y: 210,
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
    }
    
    update() {
        this.startButton.update();
    }
    
    draw() {
        this.drawBG();
        
        this.titleText.draw();
        this.titleBGBlur();
        
        this.startButton.draw();
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
            x: this.x + 587,
            y: this.y + 25,
            width: 100,
            label: "Save",
            fontSize: "20px",
            onClick: () => doSave(),
            shadowBlur: 5,
            shadowBlurText: 5
        });
        
        this.shopButton = new Button({
            x: this.x + 700,
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
        
        this.subMenuButton = new Button({
            x: this.x + width - 20,
            y: this.y + heightUI - 25,
            width: 30,
            height: 40
        });
        
        this.spawnCooldowns = [];
    }
    
    update() {
		this.checkIfNewCooldown();
		
        this.saveButton.update();
        this.shopButton.update();
        this.subMenuButton.update();
        
        this.playerNameField.setTextTo(this.player.name);
        this.playerScoreField.setTextTo(this.player.score);
    }
	
	checkIfNewCooldown() {
		let cdAmountToAdd = this.progression.activeLevels.length - this.spawnCooldowns.length;
		while(cdAmountToAdd > 0) {
			this.spawnCooldowns.push(new Cooldown({
				x: width - 300 - (this.spawnCooldowns.length * 20),
				y: height + 45,
				levelInstance: this.progression.activeLevels[this.spawnCooldowns.length]
//				value: this.progression.activeLevels[this.spawnCooldowns.length].counter,
//				maxValue: this.progression.activeLevels[this.spawnCooldowns.length].spawnTime
			}));
			
			cdAmountToAdd--;
		}
			
	}
    
    draw() {
        this.drawBackground();
        
        this.playerNameField.draw();
        this.playerScoreField.draw();
        this.playerScorePreField.draw();
        
        this.saveButton.draw();
        this.shopButton.draw();
        this.subMenuButton.draw();
        
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