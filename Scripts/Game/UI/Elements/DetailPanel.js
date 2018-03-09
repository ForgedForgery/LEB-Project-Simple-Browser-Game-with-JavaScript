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