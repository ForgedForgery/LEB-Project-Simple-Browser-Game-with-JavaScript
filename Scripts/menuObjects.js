class Button {
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        
        this.width = config.width || 150;
        this.height = config.height || 40;
        
        this.executeBehavior = config.onClick || function() {this.label = "Empty"};
        this.backgroundColor = config.backgroundColor || "#ff0000";
        
        this.label = new TextField({
                x: this.x + this.width/2,
                y: this.y + this.height/2,
                name: config.label || false,
                size: config.fontSize || false,
                type: config.fontType || false,
                color: config.textColor || false
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
        
        return mouseX > this.x &&
            mouseX < (this.x + this.width) &&
            mouseY > this.y &&
            mouseY < (this.y + this.height);
    } 
    
    draw() {
        canvasContext.beginPath();       
        canvasContext.lineWidth = "5";
        canvasContext.strokeStyle = this.backgroundColor;
        canvasContext.fillStyle = this.hovered ? (playerInput.mouseHold ? "#aaaaaa" : "#f9ff79") : this.backgroundColor;
        canvasContext.rect(this.x, this.y , this.width, this.height);
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
        
        this.size = config.size || "20px";
        this.type = config.type || "Comic Sans MS";
        this.color = config.color || "#00ff00";
    }
    
    draw() {
        canvasContext.fillStyle = this.color;
        canvasContext.font = this.size + " " + this.type;
        canvasContext.textAlign = "center";     
        canvasContext.fillText(this.name, this.x, this.y);
    }
}