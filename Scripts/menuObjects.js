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
        this.tColor = config.tColor || "#00ff00";
        this.isClicked = false;
        //this.mouseInput = new MouseInpute();
    }

    draw() {
        c.beginPath();
        c.lineWidth = "6";
        c.strokeStyle = this.bgColor;
        c.fillStyle = this.isClicked == false ? this.bgColor : "#aaaaaa";
        c.rect(this.x, this.y , this.width, this.height);
        c.stroke();
        c.fill();
        c.fillStyle = this.tColor;
        c.font = this.fontSize + " " + this.fontType;
        c.textAlign = "center";
        c.fillText(this.label, this.x+this.width/2, this.y+this.height/2);
        c.closePath();
    }

    isMouseInside() {
        let mouseX = 0;
        let mouseY = 0;
        return mouseX > this.x &&
            mouseX < (this.x + this.width) &&
            mouseY > this.y &&
            mouseY < (this.y + this.height);
    }   

    handelMouseClick() {
        if(this.isMouseInside() && this.isMouseClicked()) {
            this.isClicked = true;
            this.task();
        } else {
            this.isClicked = false;
        }
    }
    
    isMouseClicked() {
        //return this.mouseInput.isLeftClick()
    }
}