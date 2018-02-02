class CooldownBar {
    constructor(config) {
        this.x = config.x;
        this.y = config.y;
        
        this.width = config.width || 15;
        this.height = config.height || -40;
		
		this.borderWidth = 3;
		
		this.hovered = false;
        
		this.level = config.levelInstance;
		if(this.level.colorProperties.type == "gradient") {
			let paramsForColor = {
				x: this.x,
				y: this.y + this.height,
				width: this.x,
				height: this.y,
				type: "linear"
			};
			this.color = this.level.colorProperties.color(paramsForColor);
		} else {
			this.color = this.level.colorProperties.color;
		}
        
        this.detailPanel = new DetailPanel({
			x: this.x + this.width / 2,
			y: this.y + this.height,
			color: this.color
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
		canvasContext.fillStyle = this.color;
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
        let left = this.x - this.borderWidth;
        let top = this.y + this.height - this.borderWidth;
		
		let width = this.width + 2 * this.borderWidth;
		let height = -this.height + 2 * this.borderWidth;
		
		return playerInput.isMouseInside(left, top, width, height);
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
		
		this.color = config.color;
		
		this.borderWidth = 3;
		
        this.hovered = false;
		this.active = false;
    }

    update(){
		this.hovered = this.isHovered() ? true : false;
    }

    isHovered() {
        let left = this.x - this.width/2,
            right = this.y - this.height;

		let width = this.width + 2 * this.borderWidth,
			height = this.height + 2 * this.borderWidth;
        
        return playerInput.isMouseInside(left, right, width, height);
    } 
    
    draw(){
        canvasContext.beginPath();
		
		canvasContext.rect(this.x - this.width/2, this.y - this.height, this.width, this.height);
		
		canvasContext.fillStyle = this.color;
		canvasContext.fill();
		
		canvasContext.lineWidth = this.borderWidth.toString();
		canvasContext.strokeStyle = this.color;
		canvasContext.stroke();
		
        canvasContext.closePath();
		canvasContext.strokeStyle = "black";
    }
}