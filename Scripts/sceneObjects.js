class SceneManager {
    constructor(inPlayerReference, inCollectiblesReference) {
        this.currentScenes = [];
        this.allScenes = {
            title: new TitleMenu(inPlayerReference),
            game: new MainGame(inPlayerReference, inCollectiblesReference),
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
    
    start(inScenes) {
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
                        x: 425,
                        y: 210,
                        width: 250,
                        label: "Start Game",
                        fontSize: "40px",
                        fontType: "Arial",
                        onClick: function() {
                            game.player.setTo(playerData);
                            game.scenes.start("game");
                            loginForm.delete();
                        }
                    });
    }
    
    update() {
        this.startButton.update();
    }
    
    draw() {
        this.drawTitleText();
        this.startButton.draw();
    }
    
    drawTitleText() {
        canvasContext.beginPath();
        canvasContext.fillStyle = titleBGColor;
        canvasContext.rect(0, 0, width, height + heightUI);
        canvasContext.fill();
        canvasContext.fillStyle = textFieldColor;
        canvasContext.strokeStyle = "blue";
        canvasContext.font = "40px Ravie";
        canvasContext.textAlign = 'center';
        canvasContext.textBaseline = 'middle';
        canvasContext.fillText('Resource Collector',400,100);
        canvasContext.closePath();
    }
}

class MainGame {
    constructor(inPlayerReference, inCollectiblesReference) {
        this.player = inPlayerReference;
        this.collectibles = inCollectiblesReference;
        this.gameUI = new GameUI(this.player);
    }
    
    update() {
        this.collectibles.update();
        this.player.update();
        this.player.checkCollisionWith(this.collectibles);
        this.gameUI.update();
    }
    
    draw() {
        this.drawBG();
        this.collectibles.draw();
        this.player.draw();
        this.gameUI.draw();
    }
    
    drawBG() {
        canvasContext.fillStyle = gameBGColor;
        canvasContext.rect(0, 0, width, height + heightUI);
        canvasContext.fill();
    }
}

class GameUI {
    constructor(inPlayerReference) {
        this.x = 0;
        this.y = height;
        this.width = width;
        this.height = heightUI;
        
        this.player = inPlayerReference;
        
        this.menuButton = new Button({
            
        });
        
        this.saveButton = new Button({
            x: this.x + 627,
            y: this.y + 25,
            width: 100,
            label: "Save",
            fontSize: "20px",
            onClick: () => doSave()
        });
        
        this.shopButton = new Button({
            x: this.x + 740,
            y: this.y + 25,
            width: 100,
            label: "Shop",
            fontSize: "20px",
           //onClick effekt für Szenenwechseln
        });
        
        this.playerNameField = new TextField({
            x: this.x + 10,
            y: this.y + 12.5,
            text: this.player.name,
            align: 'left'
        });
                
        this.playerScorePreField = new TextField({
            x: this.x + 10,
            y: this.y + 37.5,
            text: "Score: ",
            align: 'left'
        });
        
        this.playerScoreField = new TextField({
            x: this.x + 75,
            y: this.y + 37.5,
            color: playerScoreFieldColor,
            text: this.player.score,
            align: 'start'
        });
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
        this.saveButton.draw();
        this.shopButton.draw();
        this.playerScoreField.draw();
        this.playerScorePreField.draw();
    }
    
    drawBackground() {
        canvasContext.beginPath();
        canvasContext.rect(this.x, this.y, this.width, this.height);
        canvasContext.fillStyle = gameUIColor;
        canvasContext.fill();
        canvasContext.closePath();
    }
}

class StoreMenu {
    constructor() {
        
    }
}
