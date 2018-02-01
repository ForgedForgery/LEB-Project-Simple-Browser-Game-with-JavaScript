class TitleMenu {
    constructor(inPlayerReference) {
        this.player = inPlayerReference;
        
        this.createMenuObjects();
    }
    
    createMenuObjects() {
        this.startButton = new Button({
                x: 400,
                y: 540,
                width: 500,
                height: 70,
                label: "Start Game",
                backgroundColor: "white",
                fontSize: "40px",
                fontType: "Arial",
                onClick: function() {
                    clearInterval(updateHighscoreInterval);
                    game.player.setTo(playerData);
                    game.scenes.changeTo("game");
                    loginForm.delete();
                }
            });
        
        this.titleText = new TextField({
            x: 400,
            y: 100,
            hasSide: true,
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

class HighscoreBoard {
    constructor(options) {
        this.data = highscoreData;
        this.x = options.x;
        this.y = options.y;
        this.height = options.height;
        this.width = options.width;
        
        this.left = this.x - this.width/2;
        this.top = this.y - this.height/2;
        
        this.firstPlace = new TextField({
            x: this.left + 30,
            y: this.top + this.height/3 * 0 + this.height/3/2,
            text: "#1", 
            align: 'center',
            shadowBlur: 5
        });
        
        this.secondPlace = new TextField({
            x: this.left + 30,
            y: this.top + this.height/3 * 1 + this.height/3/2,
            text: "#2", 
            align: 'center',
            shadowBlur: 5
        });
        
        this.thirdPlace = new TextField({
            x: this.left + 30,
            y: this.top + this.height/3 * 2 + this.height/3/2,
            text: "#3", 
            align: 'center',
            shadowBlur: 5
        });
        
        this.firstPlayerName = new TextField({
            x: this.left + 60 + 30,
            y: this.top + this.height/3 * 0 + this.height/3/2/2,
            text: highscoreData.name1, 
            align: 'left',
            shadowBlur: 5
        });
        this.secondPlayerName = new TextField({
            x: this.left + 60 + 30,
            y: this.top + this.height/3 * 1 + this.height/3/2/2,
            text: highscoreData.name2, 
            align: 'left',
            shadowBlur: 5
        });
        this.thirdPlayerName = new TextField({
            x: this.left + 60 + 30,
            y: this.top + this.height/3 * 2 + this.height/3/2/2,
            text: highscoreData.name3, 
            align: 'left',
            shadowBlur: 5
        });
        
        this.firstPlayerScore = new TextField({
            x: this.left + 60 + 30,
            y: this.top + this.height/3 * 0 + this.height/3/2/2*3,
            text: highscoreData.score1, 
            align: 'left',
            shadowBlur: 5
        });
        this.secondPlayerScore = new TextField({
            x: this.left + 60 + 30,
            y: this.top + this.height/3 * 1 + this.height/3/2/2*3,
            text: highscoreData.score2, 
            align: 'left',
            shadowBlur: 5
        });
        this.thirdPlayerScore = new TextField({
            x: this.left + 60 + 30,
            y: this.top + this.height/3 * 2 + this.height/3/2/2*3,
            text: highscoreData.score3, 
            align: 'left',
            shadowBlur: 5
        });
        
        this.highscoreText = new TextField ({
            x: this.left,
            y: this.top - 15,
            text: "Highscore",
            align: 'left',
            hasSide: true,
            shadowBlur: 5,
            type: "Ravie",
            size: "25px"            
        });
    }
    
    update() {
        this.firstPlayerName.setTextTo(highscoreData.name1);      
        this.secondPlayerName.setTextTo(highscoreData.name2);       
        this.thirdPlayerName.setTextTo(highscoreData.name3);
        
        this.firstPlayerScore.setTextTo(highscoreData.score1);      
        this.secondPlayerScore.setTextTo(highscoreData.score2);       
        this.thirdPlayerScore.setTextTo(highscoreData.score3);
    }
    
    draw() {
        this.drawBase();
        this.drawGrid();
        
        this.highscoreText.draw();
        
        this.firstPlace.draw();
        this.secondPlace.draw();
        this.thirdPlace.draw();
        
        this.firstPlayerName.draw();
        this.secondPlayerName.draw();
        this.thirdPlayerName.draw();
        
        this.firstPlayerScore.draw();
        this.secondPlayerScore.draw();
        this.thirdPlayerScore.draw();
    }
    
    drawBase() {
        canvasContext.beginPath();
        canvasContext.shadowColor = "black";
        canvasContext.shadowBlur = "5";
        
        canvasContext.lineWidth = "5";
        canvasContext.strokeStyle = "white";
        canvasContext.fillStyle = "white";
        canvasContext.rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        
        canvasContext.stroke();
        canvasContext.fill();
        
        canvasContext.lineWidth = "1";
        canvasContext.strokeStyle = "black";
        canvasContext.shadowBlur = 0;
        canvasContext.closePath();
    }
    
    drawGrid() {
        this.drawHorizontalGridLine(this.top + this.height/3);
        this.drawHorizontalGridLine(this.top + this.height/3 * 2);
        this.drawVerticalGridLine(this.left + 60);
    }
    
    drawHorizontalGridLine(h) {
        canvasContext.beginPath();
        canvasContext.moveTo(this.left, h);
        canvasContext.lineTo(this.left + this.width, h);
        canvasContext.stroke();
        canvasContext.closePath();
    }
    
    drawVerticalGridLine(b) {
        canvasContext.beginPath();
        canvasContext.moveTo(b, this.top);
        canvasContext.lineTo(b, this.top + this.height);
        canvasContext.stroke();
        canvasContext.closePath();
    }
}