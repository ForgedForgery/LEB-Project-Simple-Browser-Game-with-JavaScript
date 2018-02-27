class CooldownBar {
    constructor(config) {
        this.x = config.x;
        this.y = config.y;
        
        this.width = config.width || 15;
        this.height = config.height || 40;
		
		this.borderWidth = 3;
		
		this.hovered = false;
        
		this.level = config.levelInstance;
		this.color = createPatternWithCanvas(this.width, this.height, this.level.colorList, this.level.patternProperties.fn);
        
        this.detailPanel = new DetailPanel({
			x: this.x + this.width / 2,
			y: this.y,
			color: this.color,
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
        
		this.leftSide = this.x - this.width/2;
		this.topSide = this.y - this.height;
        this.level = config.level;
		this.color = config.color;
		
		this.borderWidth = 3;
        
        this.example = new Collectible(this.level.formProperties.fn, this.level.color, {
            r: this.level.r,
            x: this.leftSide,
            y: this.topSide
        });
        
        this.informationPoints = new TextField({
            x: this.leftSide ,
            y: this.topSide,
            text: "Points: " + this.level.points,
            align: 'left',
        });
        
        this.informationShape = new TextField({
            x: this.leftSide,
            y: this.topSide,
            text: "Shape: " + this.level.points,
            align: 'left',
        });
        
        this.informationColor = new TextField({
            x: this.leftSide,
            y: this.topSide,
            text: "Colors: " + this.level.points,
            align: 'left',
        });
        this.informationPattern = new TextField({
            x: this.leftSide,
            y: this.topSide,
            text: "Pattern: " + this.level.points,
            align: 'left',
        });
        
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
		var offset_x = this.leftSide;
		var offset_y = this.topSide;

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
        
		this.informationPoints.draw();
		this.informationShape.draw();
		this.informationColor.draw();
		this.informationPattern.draw();
        this.example.draw();
        
        canvasContext.closePath();
    }
}