class CooldownBar {
    constructor(config) {
        this.x = config.x;
        this.y = config.y;
        
        this.width = config.width || 15;
        this.height = config.height || 40;
		
		this.borderWidth = 3;
		
		this.hovered = false;
        
		this.level = config.levelInstance;
		this.color = this.level.createPatternWithCanvas(this.width, this.height);
        
        this.detailPanel = new DetailPanel({
			x: this.x + this.width / 2,
			y: this.y,
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
		
		// offset vars
		var offset_x = this.x;
		var offset_y = this.y;

		// offset
		canvasContext.translate(offset_x, offset_y);

        //background
        canvasContext.fillStyle = textFieldSideColor;
        canvasContext.fillRect(0, 0, this.width, this.height);
        
        //bar
		canvasContext.fillStyle = this.color;
        canvasContext.fillRect(0, this.height - this.level.cooldown.getPercentage() * this.height, this.width, this.level.cooldown.getPercentage() * this.height);
        
        //border
		canvasContext.lineWidth = this.borderWidth.toString();
        canvasContext.strokeStyle = textFieldColor;
        canvasContext.rect(0, 0, this.width, this.height);
        canvasContext.stroke();
		
		// undo offset
		canvasContext.translate(-offset_x, -offset_y);

		canvasContext.strokeStyle = "black";
        canvasContext.closePath();
    }
	
	isHovered() {
        let left = this.x - this.borderWidth;
        let top = this.y - this.borderWidth;
		
		let width = this.width + 2 * this.borderWidth;
		let height = this.height + 2 * this.borderWidth;
		
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
		
		// offset vars
		var offset_x = this.x - this.width/2;
		var offset_y = this.y - this.height;

		// offset
		canvasContext.translate(offset_x, offset_y);

		//draw
		canvasContext.rect(0, 0, this.width, this.height);
		canvasContext.fillStyle = this.color;
		canvasContext.fill();
		
		canvasContext.lineWidth = this.borderWidth.toString();
		canvasContext.strokeStyle = this.color;
		canvasContext.stroke();
				
		// undo offset
		canvasContext.translate(-offset_x, -offset_y);
		
		canvasContext.strokeStyle = "black";
        canvasContext.closePath();
    }
}