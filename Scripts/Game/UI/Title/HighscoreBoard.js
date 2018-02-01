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
        this.firstPlayerName.setTextTo(this.data.name1);      
        this.secondPlayerName.setTextTo(this.data.name2);       
        this.thirdPlayerName.setTextTo(this.data.name3);
        
        this.firstPlayerScore.setTextTo(this.data.score1);      
        this.secondPlayerScore.setTextTo(this.data.score2);       
        this.thirdPlayerScore.setTextTo(this.data.score3);
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
        
        canvasContext.lineWidth = "3";
        canvasContext.strokeStyle = textFieldSideColor;
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