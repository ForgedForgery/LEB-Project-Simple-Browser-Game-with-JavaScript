class Button {
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.width = config.width || 150;
        this.height = config.height || 50;
        this.label = config.label || "Click";
        this.onClick = config.onClick || function() {};
    }

    draw() {
        c.fillStyle = "black";
        c.rect(this.x, this.y, this.width, this.height, 5);
        c.fillStyle = "blue";
        c.textSize = "19";
        c.textAlign ='middle';
        c.fillText(this.label, this.x+10, this.y+this.height/4);
    }

    isMouseInside() {
        return mouseX > this.x &&
            mouseX < (this.x + this.width) &&
            mouseY > this.y &&
            mouseY < (this.y + this.height);
    }   

    handelMouseClick() {
        if(this.isMouseInside()) {
            this.onClick();
        }
    }
}