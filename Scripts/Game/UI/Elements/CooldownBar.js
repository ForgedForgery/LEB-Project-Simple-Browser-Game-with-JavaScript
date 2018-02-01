class CooldownBar {
    constructor(config) {
        this.x = config.x;
        this.y = config.y;
        
        this.width = config.width || 15;
        this.height = config.height || -40;
		
		this.borderWidth = 3;
		
		this.hovered = false;
        
		this.level = config.levelInstance;
        
        this.detailPanel = new DetailPanel({
			x: this.x + this.width / 2,
			y: this.y + this.height,
			level: this.level
		});
    }
	
	update() {
		this.detailPanel.update();
		if(this.isHovered()) {
			this.detailPanel.active = true;
			this.hovered = true;
		} 
		else {
			this.hovered = false;
		}

		if(!this.hovered && !this.detailPanel.hovered)
			this.detailPanel.active = false;
	}

    draw() {
        canvasContext.beginPath();

        //background
        canvasContext.fillStyle = textFieldSideColor;
        canvasContext.fillRect(this.x, this.y, this.width, this.height);
        
        //bar
		let oldColor = this.level.colorProperties.color.split(',');		
		let newSolidColor = oldColor[0] + oldColor[1] + oldColor[2] + "1)";
		canvasContext.fillStyle = newSolidColor;
        canvasContext.fillRect(this.x, this.y, this.width, (this.level.cooldown.timer / this.level.cooldown.maximum * this.height));
        
        //border
		canvasContext.lineWidth = this.borderWidth.toString();
        canvasContext.strokeStyle = textFieldColor;
        canvasContext.rect(this.x, this.y, this.width, this.height);
        canvasContext.stroke();

		canvasContext.strokeStyle = "black";
        canvasContext.closePath();
    }
	
	isHovered() {
        let mouseX = playerInput.mouseX;
        let mouseY = playerInput.mouseY;
        let topleftCorner = {
            x: this.x - this.borderWidth,
            y: this.y + this.height - this.borderWidth
        };
		let length = {
			x: this.width + 2 * this.borderWidth,
			y: -this.height + 2 * this.borderWidth
		};
        
        return mouseX >= topleftCorner.x &&
            mouseX <= (topleftCorner.x + length.x) &&
            mouseY >= topleftCorner.y &&
            mouseY <= (topleftCorner.y + length.y);
    } 
	
	setValuesTo() {
		
	}
}

class DetailPanel {
    constructor(config){
        this.x = config.x;
        this.y = config.y;
		
        this.width = config.width || 200;
        this.height = config.height || 150;
		
		this.level = config.level;
		
		this.borderWidth = 3;
		
        this.hovered = false;
		this.active = false;
    }

    update(){
		this.hovered = this.isHovered() ? true : false;
    }

    isHovered() {
        let mouseX = playerInput.mouseX;
        let mouseY = playerInput.mouseY;
        let topleftCorner = {
            x: this.x - this.width/2,
            y: this.y - this.height
        }

		let length = {
			x: this.width + 2 * this.borderWidth,
			y: this.height + 2 * this.borderWidth
		};
        
        return mouseX >= topleftCorner.x &&
            mouseX <= (topleftCorner.x + length.x) &&
            mouseY >= topleftCorner.y &&
            mouseY <= (topleftCorner.y + length.y);
    } 
    
    draw(){
        canvasContext.beginPath();
		
		canvasContext.rect(this.x - this.width/2, this.y - this.height, this.width, this.height);
		
		canvasContext.fillStyle = "black";
		canvasContext.fill();
		
		canvasContext.lineWidth = this.borderWidth.toString();
		canvasContext.strokeStyle = this.level.color;
		canvasContext.stroke();
		
		canvasContext.strokeStyle = "black";
        canvasContext.closePath();
    }
}