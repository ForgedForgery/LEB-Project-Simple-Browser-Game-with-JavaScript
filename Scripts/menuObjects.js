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
            x: this.x + 60,
            y: this.y + 25,
            width: 100,
            label: "Save",
            fontSize: "20px",
            fontColor: "pink",
            onClick: () => doSave()
        });
        
        this.shopButton = new Button({
            x: this.x + 500,
            y: this.y + 25,
            width: 100,
            label: "Shop",
            fontSize: "20px",
            fontColor: "pink",
            onClick: () => doSave()
        });
        
        this.playerNameField = new TextField({
            x: this.x + 160,
            y: this.y + 15,
            text: this.player.name,
            color: 'black',
            type: 'Arial',
            align: 'left'
        });
                
        this.playerScorePreField = new TextField({
            x: this.x + 160,
            y: this.y + 30,
            text: "Score: ",
            color: 'black',
            type: 'Arial',
            align: 'left'
        });
        
        this.playerScoreField = new TextField({
            x: this.x + 196,
            y: this.y + 30,
            text: this.player.score,
            color: 'black',
            type: 'Arial',
            align: 'start'
        });
    }
    
    update() {
        this.saveButton.update();
        this.playerNameField.setTextTo(this.player.name);
        this.playerScoreField.setTextTo(this.player.score);
    }
    
    draw() {
        this.drawBackground();
        this.playerNameField.draw();
        this.saveButton.draw();
        this.shopButton();
        this.playerScoreField.draw();
        this.playerScorePreField.draw();
    }
    
    drawBackground() {
        canvasContext.beginPath();
        canvasContext.rect(this.x, this.y, this.width, this.height);
        canvasContext.fillStyle = '#887888';
        canvasContext.fill();
        canvasContext.closePath();
    }
}

class Button {
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        
        this.width = config.width || 150;
        this.height = config.height || 40;
        
        this.executeBehavior = config.onClick || function() {this.label = "Empty"};
        this.backgroundColor = config.backgroundColor || "#4daaaa";
        
        this.label = new TextField({
                x: this.x,
                y: this.y,
                text: config.label || false,
                size: config.fontSize || false,
                type: config.fontType || false,
                color: config.fontColor || false
            });
        
        this.hovered = false;
    }
    
    update() {
        this.hovered = this.isHovered();
        
        if(this.hovered && playerInput.upClick) {
            this.executeBehavior();
        }
    }
    

    
    isHovered() {
        let mouseX = playerInput.mouseX;
        let mouseY = playerInput.mouseY;
        let topleftCorner = {
            x: this.x - this.width/2,
            y: this.y - this.height/2
        }
        
        return mouseX > topleftCorner.x &&
            mouseX < (topleftCorner.x + this.width) &&
            mouseY > topleftCorner.y &&
            mouseY < (topleftCorner.y + this.height);
    } 
    
    draw() {
        canvasContext.beginPath();       
        canvasContext.lineWidth = "5";
        canvasContext.strokeStyle = this.backgroundColor;
        canvasContext.fillStyle = this.hovered ? (playerInput.mouseHold ? "#000000" : "#f9ff79") : this.backgroundColor;
        canvasContext.rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        canvasContext.stroke();
        canvasContext.fill();
        
        this.label.draw();       
        canvasContext.closePath();
    }
}

class TextField {
    constructor(config) {
        this.x = config.x;
        this.y = config.y;

        this.text = config.text || "No Text";
        this.align = config.align || "center";
        this.size = config.size || "12px";
        this.type = config.type || "Comic Sans MS";
        this.color = config.color || "black";
    }
    
    draw() {
        canvasContext.fillStyle = this.color;
        canvasContext.font = this.size + " " + this.type;
        canvasContext.textAlign = this.align;     
        canvasContext.fillText(this.text, this.x, this.y);
        canvasContext.textAlign = "left";
        canvasContext.fillStyle = 'black';
        
    }
    
    setTextTo(inText) {
        this.text = inText;
    }
}
