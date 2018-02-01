class TitleMenu {
    constructor(inPlayerReference) {
        this.player = inPlayerReference;
        
        this.createMenuObjects();
    }
    
    createMenuObjects() {
        this.startButton = new Button({
			x: 400,
			y: 520,
			width: 500,
			height: 70,
			label: "Start Game",
			backgroundColor: "white",
			fontSize: "40px",
			fontType: "Arial",
			onClick: function() {
				clearInterval(updateHighscoreInterval);
				game.player.updateLoadedData();
				game.scenes.changeTo("game");
				loginForm.delete();
			}
		});
        
        this.titleText = new TextField({
            x: 400,
            y: 100,
            hasSide: true,
			sideThickness: 11,
            color: titleTextColor,
            sideColor: titleTextSideColor,
            text: "Resource Collector",
            type: "Ravie",
            size: "55px"
        });
        this.playerNameField = new TextField({
            x: 650,
            y: 460,
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
}