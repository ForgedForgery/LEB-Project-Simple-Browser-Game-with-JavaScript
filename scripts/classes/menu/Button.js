// TODO: maybe make cleaner
class Button {
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        
        this.shadowColor = config.shadowColor || "black";
        this.shadowBlur = config.shadowBlur || "5";       
        
        this.width = config.width || 150;
        this.height = config.height || 40;
        
        this.affectedReference = config.affectedReference;
        this.executeBehavior = config.onClick || function() {};
        this.backgroundColor = config.backgroundColor || buttonBGColor;
        
        if(config.label) {
            if(typeof config.label == "string") {
                this.label = new TextField({
                        x: this.x,
                        y: this.y,
                        shadowColor: config.shadowColorText || false,
                        shadowBlur: config.shadowBlurText || "5",
                        text: config.label || false,
                        size: config.fontSize || false,
                        type: config.fontType || false,
                        color: config.fontColor || false
                    });
            } else if (config.label instanceof Image) {
                this.label = config.label;
                
            }
        }
        
        this.hovered = false;
    }
    
    update() {
        this.hovered = this.isHovered();
        
        if(this.hovered && playerInput.upClick) {
            if(this.executeBehavior.length == 1)
                this.executeBehavior(this.affectedReference);
            else
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
        canvasContext.shadowColor = this.shadowColor;
        canvasContext.shadowBlur = this.shadowBlur;
        
        canvasContext.lineWidth = "5";
        canvasContext.strokeStyle = this.backgroundColor;
        canvasContext.fillStyle = this.hovered ? (playerInput.mouseHold ? buttonHoldColor : buttonHoverColor) : this.backgroundColor;
        canvasContext.rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        
        canvasContext.stroke();
        canvasContext.fill();
        
        canvasContext.lineWidth = "1";
        canvasContext.strokeStyle = "black";
        canvasContext.shadowBlur = 0;
        
        if(this.label instanceof TextField)
            this.label.draw();  
        else if((this.label instanceof Image) && this.label.complete) {
            canvasContext.drawImage(this.label, this.x - this.label.width / 2, this.y - this.label.height / 2, this.label.width, this.label.height);
            
            canvasContext.fillStyle = this.hovered ? (playerInput.mouseHold ? "rgba(0, 0, 0, 0.4)" :  "rgba(255, 0, 0, 0.15)") : "rgba(255, 255, 255, 0)";
            canvasContext.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
            canvasContext.fill();
        }
        
        canvasContext.closePath();
    }
}
