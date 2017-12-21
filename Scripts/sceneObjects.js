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
                        x: 400,
                        y: 210,
                        width: 500,
                        height: 70,
                        label: "Start Game",
                        fontSize: "40px",
                        fontType: "Arial",
                        onClick: function() {
                            game.player.setTo(playerData);
                            game.scenes.start("game");
                            loginForm.delete();
                        }
                    });
        this.titleText = new TextField({
            x: 400,
            y: 100,
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
        this.startButton.draw();
    }
    
    drawBG() {
        canvasContext.fillStyle = titleBGColor;
        canvasContext.rect(0, 0, width, height + heightUI);
        canvasContext.fill();
    }
    
//    draw {
//        canvasContext.fillStyle = textFieldColor;
//        canvasContext.strokeStyle = "blue";
//        canvasContext.textBaseline = 'middle';
//        canvasContext.closePath();
}

class MainGame {
    constructor(inPlayerReference, inCollectiblesReference) {
        this.player = inPlayerReference;
        this.collectibles = inCollectiblesReference;
        this.gameUI = new GameUI(this.player, this.collectibles);
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
        canvasContext.beginPath();
        canvasContext.fillStyle = gameBGColor;
        canvasContext.rect(0, 0, width, height + heightUI);
        canvasContext.fill();
        canvasContext.closePath();
    }
}

class GameUI {
    constructor(inPlayerReference, inCollectiblesReference) {
        this.x = 0;
        this.y = height;
        this.width = width;
        this.height = heightUI;
        
        this.player = inPlayerReference;
        this.collectibles = inCollectiblesReference;
        
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
            fontSize: "20px"
        });
        
        this.playerNameField = new TextField({
            x: this.x + 10,
            y: this.y + 13,
            text: this.player.name,
            align: 'left'
        });
                
        this.playerScorePreField = new TextField({
            x: this.x + 10,
            y: this.y + 38,
            text: "Score: ",
            align: 'left'
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
        this.drawSpawnCooldown();
    }
    
    drawBackground() {
        canvasContext.beginPath();
        canvasContext.rect(this.x, this.y, this.width, this.height);
        canvasContext.fillStyle = gameUIColor;
        canvasContext.fill();
        canvasContext.closePath();
    }
    
    drawSpawnCooldown() {
        canvasContext.beginPath();
        
        //background
        canvasContext.fillStyle = textFieldSideColor;
        canvasContext.fillRect(this.x + 80, this.y + 5, 200, 15);
        
        //bar
        canvasContext.fillStyle = playerScoreFieldColor;
        canvasContext.fillRect(this.x + 80, this.y + 5, this.collectibles.counter / this.collectibles.spawnTime * 200, 15);
        
        //border
        canvasContext.strokeStyle = textFieldColor;
        canvasContext.rect(this.x + 80, this.y + 5, 200, 15);
        canvasContext.stroke();
        
        canvasContext.closePath();
    }
  
//might be useful somewhere else 
//
//    drawCircleCooldown() {
//        canvasContext.beginPath();
//        canvasContext.moveTo(this.x + 80, this.y + 13);
//        canvasContext.arc(this.x + 80, this.y + 13, 10, -(Math.PI / 2), (Math.PI * 2 * this.collectibles.counter / this.collectibles.spawnTime) - Math.PI / 2);
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