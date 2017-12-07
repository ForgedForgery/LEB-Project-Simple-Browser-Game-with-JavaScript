class SceneManager {
    constructor(inPlayerReference, inCollectiblesReference) {
        this.currentScenes = [];
        this.allScenes = {
            title: new TitleMenu(),
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

class MainGame {
    constructor(inPlayerReference, inCollectiblesReference) {
        this.player = inPlayerReference;
        this.collectibles = inCollectiblesReference;
        this.gameUI = new GameUI();
    }
    
    update() {
        this.player.update();
        this.player.checkCollisionWith(this.collectibles);
        this.gameUI.update();
    }
    
    draw() {
        this.collectibles.draw();
        this.player.draw();
        this.gameUI.draw();
    }
}

class TitleMenu {
    constructor() {
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
                            game.scenes.allScenes["game"].gameUI = new GameUI(); //a new player name could be loaded after gameUI was already created
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
        canvasContext.fillStyle = "black";
        canvasContext.strokeStyle = "blue";
        canvasContext.font = "40px Comic Sans MS";
        canvasContext.textAlign = 'center';
        canvasContext.textBaseline = 'middle';
        canvasContext.fillText('Resource Collector',400,100);
        canvasContext.closePath();
    }
}

class StoreMenu {
    constructor() {
        
    }
}