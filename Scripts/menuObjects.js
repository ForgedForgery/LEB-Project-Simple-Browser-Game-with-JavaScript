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
        
        if(this.hovered && this.clicked) {
            this.task();
        }
        
    }
    
    setMouseUpDown() {
        this.mouseDown = playerInput.leftClick == true ? true : false;
        if(this.mouseDown == true && playerInput.leftClick == false) {
            this.mouseUp = true;
            this.mouseDown = false;
        } else {
            this.mouseUp = false;
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
        this.clicked = this.mouseDown == true && this.mouseUp == true ? true : false;
    }
    
    draw() {
        c.beginPath();
        c.lineWidth = "6";
        c.strokeStyle = this.bgColor;
        c.fillStyle = this.clicked == false ? this.bgColor : "#aaaaaa";
        c.fillStyle = this.hovered == false ? this.bgColor : "#f9ff79";
        c.rect(this.x, this.y , this.width, this.height);
        c.stroke();
        c.fill();
        c.fillStyle = this.textColor;
        c.font = this.fontSize + " " + this.fontType;
        c.textAlign = "center";
        c.fillText(this.label, this.x+this.width/2, this.y+this.height/2);
        c.closePath();
    } 
}