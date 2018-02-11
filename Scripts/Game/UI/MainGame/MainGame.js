class MainGame {
    constructor(inPlayerReference, inProgressionReference) {
        this.player = inPlayerReference;
        this.progression = inProgressionReference;
        this.gameUI = new GameUI(this.player, this.progression);
    }
    
    update() {
        this.progression.update();
        this.player.update();
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