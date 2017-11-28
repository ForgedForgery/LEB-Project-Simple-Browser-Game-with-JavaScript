class Button {
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.width = config.width || 150;
        this.height = config.height || 40;
        this.label = config.label || "Click";
        this.task = config.onClick || function() {};
        this.fontSize = config.fontSize || "20px";
        this.fontType = config.fontType || "Comic Sans MS";
        this.bgColor = config.bgColor || "#ff0000";
        this.textColor = config.textColor || "#00ff00";
        this.mouseUp = false;
        this.mouseDown = false;
        this.clicked = false;
        this.hovered = false;
        //this.mouseInput = new MouseInpute();
    }
    
    update() {
        this.setMouseUpDown();
        this.hovered = this.isHovered();
        this.clicked = this.isClicked();
        console.log(this.hovered + ":" + this.clicked);
        
        if(this.hovered && this.clicked) {
            this.task();
        }
        
        if(this.clicked)
            this.mouseDown = false;
    }
    
    setMouseUpDown() {
        if(this.mouseDown == false && playerInput.leftClick == true) {
            this.mouseDown = true;
        } else {
            if(this.mouseDown == true && playerInput.leftClick == false) {
                this.mouseUp = true;
            } else {
                this.mouseUp = false;
            }
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
    
    isClicked() {
        return this.mouseDown == true && this.mouseUp == true ? true : false;
    }
    
    draw() {
        canvasContext.beginPath();
        canvasContext.lineWidth = "6";
        canvasContext.strokeStyle = this.bgColor;
        canvasContext.fillStyle = this.hovered ? (this.mouseDown ? "#aaaaaa" : "#f9ff79") : this.bgColor;
        canvasContext.rect(this.x, this.y , this.width, this.height);
        canvasContext.stroke();
        canvasContext.fill();
        canvasContext.fillStyle = this.textColor;
        canvasContext.font = this.fontSize + " " + this.fontType;
        canvasContext.textAlign = "center";
        canvasContext.fillText(this.label, this.x+this.width/2, this.y+this.height/2);
        canvasContext.closePath();
    } 
}