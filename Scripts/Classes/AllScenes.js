var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

export class MainGame {
    constructor(inPlayerReference, inCollectiblesReference) {
        this.player = inPlayerReference;
        this.collectibles = inCollectiblesReference;
    }
    
    update() {
        this.player.input();
        this.player.checkCollisionWith(this.collectibles);
    }
    
    draw() {
        this.collectibles.draw();
        this.player.draw();

        c.font = '30px Arial';
        c.fillText(this.player.name, 10, 30);
    }
    
}

export class Title {
    
}