class CooldownBar {
    constructor(config) {
        this.x = config.x;
        this.y = config.y;
        
        this.width = config.width || 15;
        this.height = config.height || -40;
		
		this.hovered = false;
        
		this.level = config.levelInstance;
        
        this.detailPanel = new DetailPanel({
			x: this.x + this.width / 2,
			y: this.y + this.height
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

		if(!(this.hovered || this.detailPanel.hovered))
			this.detailPanel.active = false;
	}

    draw() {
        canvasContext.beginPath();

        //background
        canvasContext.fillStyle = textFieldSideColor;
        canvasContext.fillRect(this.x, this.y, this.width, this.height);
        
        //bar
		if(this.level.list[0])
        	canvasContext.fillStyle = this.level.list[0].color;
        canvasContext.fillRect(this.x, this.y, this.width, (this.level.cooldown.timer / this.level.cooldown.maximum * this.height));
        
        //border
        canvasContext.strokeStyle = textFieldColor;
        canvasContext.rect(this.x, this.y, this.width, this.height);
        canvasContext.stroke();
        
		if(this.detailPanel.active)
        	this.detailPanel.draw();

        canvasContext.closePath();
    }
	
	isHovered() {
        let mouseX = playerInput.mouseX;
        let mouseY = playerInput.mouseY;
        let topleftCorner = {
            x: this.x,
            y: this.y + this.height
        }
        
        return mouseX > topleftCorner.x &&
            mouseX < (topleftCorner.x + this.width) &&
            mouseY > topleftCorner.y &&
            mouseY < (topleftCorner.y - this.height);
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

        return mouseX > topleftCorner.x &&
            mouseX < (topleftCorner.x + this.width) &&
            mouseY > topleftCorner.y &&
            mouseY < (topleftCorner.y + this.height);
    } 
    
    draw(){
		canvasContext.fillStyle = "black";
		canvasContext.fillRect(this.x - this.width/2, this.y - this.height, this.width, this.height); 

    }
}