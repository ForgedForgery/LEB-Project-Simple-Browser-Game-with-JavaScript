class Button {
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        
        this.width = config.width || 150;
        this.height = config.height || 40;
        
        this.executeBehavior = config.onClick || function() {this.label = "Empty"};
        this.backgroundColor = config.backgroundColor || buttonBGColor;
        
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
        canvasContext.fillStyle = this.hovered ? (playerInput.mouseHold ? buttonHoldColor : buttonHoverColor) : this.backgroundColor;
        canvasContext.rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        canvasContext.stroke();
        canvasContext.fill();
        canvasContext.lineWidth = "1";
        canvasContext.strokeStyle = "black";
        
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
        this.size = config.size || "20px";
        this.type = config.type || "Arial";
        this.color = config.color || textFieldColor;
        this.sideColor = config.sideColor || textFieldSideColor;
    }
    
    draw() {
        canvasContext.fillStyle = this.color;
        canvasContext.lineWidth = "3";
        canvasContext.font = this.size + " " + this.type;
        canvasContext.textAlign = this.align;   
        canvasContext.strokeStyle = "black";
        canvasContext.strokeText(this.text, this.x-2, this.y+2);
        canvasContext.strokeStyle = this.sideColor;
        canvasContext.strokeText(this.text, this.x-1, this.y+1);
        canvasContext.fillText(this.text, this.x, this.y);
        canvasContext.textAlign = "left";
        canvasContext.fillStyle = 'black';
        
    }
    
    setTextTo(inText) {
        this.text = inText;
    }
}
