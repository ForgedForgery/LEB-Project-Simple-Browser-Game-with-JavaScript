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
    
    setTo(inScenes) {
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
    }
    
    update() {
        this.player.update();
        this.player.checkCollisionWith(this.collectibles);
    }
    
    draw() {
        this.collectibles.draw();
        this.player.draw();

        canvasContext.font = '30px Arial';
        canvasContext.fillText(this.player.name, 10, 30);
    }
}

class TitleMenu {
    constructor() {
        this.btn1 = new Button({
                        x: 300,
                        y: 200,
                        width: 250,
                        label: "Please click!",
                        fontSize: "40px",
                        fontType: "Arial",
                        onClick: function() {
                            game.scenes.setTo("game");
                        }
                    });
    }
    
    update() {
        this.btn1.update();
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
        
        this.btn1.draw();
    }
}

class StoreMenu {
    constructor() {
        
    }
}