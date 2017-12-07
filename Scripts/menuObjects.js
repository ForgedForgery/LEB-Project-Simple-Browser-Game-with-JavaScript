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
        
        this.playerNameField = new TextField({
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
        this.playerNameField.draw();
        this.saveButton.draw();
    }
    
    drawBackground() {
        canvasContext.beginPath();
        canvasContext.rect(this.x, this.y, this.width, this.height);
        canvasContext.fillStyle = 'lightgrey';
        canvasContext.fill();
        canvasContext.closePath();
    }
    
    setNameAtStart() {
            this.playerNameField.name = playerData.name;
    }
}

class Button {
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        
        this.width = config.width || 150;
        this.height = config.height || 40;
        
        this.executeBehavior = config.onClick || function() {this.label = "Empty"};
        this.backgroundColor = config.backgroundColor || "#ff0000";
        
        this.label = new TextField({
                x: this.x,
                y: this.y,
                name: config.label || false,
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
        canvasContext.fillStyle = this.hovered ? (playerInput.mouseHold ? "#aaaaaa" : "#f9ff79") : this.backgroundColor;
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

        this.name = config.name || "Button";
        
        this.size = config.size || "12px";
        this.type = config.type || "Comic Sans MS";
        this.color = config.color || "black";
    }
    
    draw() {
        canvasContext.fillStyle = this.color;
        canvasContext.font = this.size + " " + this.type;
        canvasContext.textAlign = "center";     
        canvasContext.fillText(this.name, this.x, this.y);
        canvasContext.textAlign = "left";
        canvasContext.fillStyle = 'black';
        
    }
}