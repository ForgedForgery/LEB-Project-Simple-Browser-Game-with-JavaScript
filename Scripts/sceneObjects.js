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

class GameUI {
    constructor() {
        this.x = 0;
        this.y = height;
        this.width = width;
        this.height = heightUI;
        
        this.menuButton = new Button({
            
        });
        
        this.saveButton  = new Button({
            x: this.x + 60,
            y: this.y + 25,
            width: 100,
            label: "Save",
            fontSize: "20px",
            fontColor: "pink",
            onClick: () => doSave(),
            
        });
        
        this.name = new TextField({
            x: this.x + 200,
            y: this.y + 25,
            name: playerData.name,
            color: 'red',
            type: 'Arial'
        });
    }
    
    update() {
        this.saveButton.update();
    }
    
    draw() {
        this.drawBackground();
        this.name.draw();
        this.saveButton.draw();
    }
    
    drawBackground() {
        canvasContext.beginPath();
        canvasContext.rect(this.x, this.y, this.width, this.height);
        canvasContext.fillStyle = 'lightgrey';
        canvasContext.fill();
        canvasContext.closePath();
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
                        }
                    });
    }
    
    update() {
        this.startButton.update();
    }
    
    draw() {
        canvasContext.beginPath();
        canvasContext.fillStyle = "black";
        canvasContext.strokeStyle = "blue";
        canvasContext.font = "40px Comic Sans MS";
        canvasContext.textAlign = 'center';
        canvasContext.textBaseline = 'middle';
        canvasContext.fillText('Resource Collector',400,100);
        canvasContext.closePath();
        
        this.startButton.draw();
    }
}

class StoreMenu {
    constructor() {
        
    }
}