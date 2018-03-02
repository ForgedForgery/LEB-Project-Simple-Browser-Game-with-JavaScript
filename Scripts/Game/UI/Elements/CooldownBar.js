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
            level: this.level,
            
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
        
        this.phi = (1 + Math.sqrt(5)) / 2;
		
		this.borderWidth = 3;
        
        this.colorPoints = 0;
  		for(let c in this.level.colorList)
			this.colorPoints += possibleCollectibleColors[this.level.colorList[c]].points; 
        
        let offset = 5;
        let tempRadius = 25;
        let newColor = createPatternWithCanvas(tempRadius * 2, tempRadius * 2, this.level.colorList, this.level.patternProperties.fn);
        this.example = new Collectible(this.level.formProperties.fn, newColor, {
            r: tempRadius,
            x: this.leftSide + offset + (this.width - offset * 2 - ((this.width - offset * 2) / this.phi)) / 2,
            y: this.topSide + this.height / 4
        });
        
        this.informationPoints = new TextField({
            x: this.leftSide + this.width - offset - ((this.width - offset * 2) / this.phi) / 2,
            y: this.topSide + this.height / 8 + offset,
            text: "+" + this.level.points,
            align: 'center',
            textBaseline: 'middle',
            size: "24px",
            color: playerScoreFieldColor
        });
        
        this.informationShape = new TextField({
            x: this.leftSide + this.width / 6,
            y: this.topSide +  this.height / 2 + this.height / 12 + 0 * this.height / 6,
            text: "Shape", // this.level.formProperties.points,
            align: 'center',
            textBaseline: 'middle',
            size: "15px"
        });        
        this.informationShape2 = new TextField({
            x: this.leftSide + this.width / 6,
            y: this.topSide +  this.height / 2 + this.height / 12 + 1 * this.height / 6,
            text: "+" + this.level.formProperties.points,
            align: 'center',
            textBaseline: 'middle',
            size: "15px",
            color: playerScoreFieldColor
        }); 
        
        this.informationPattern = new TextField({
            x: this.leftSide +  3 * this.width / 6,
            y: this.topSide +  this.height / 2 + this.height / 12 + 0 * this.height / 6,
            text: "Pattern", 
            align: 'center',
            textBaseline: 'middle',
            size: "15px",
        });           
        this.informationPattern2 = new TextField({
            x: this.leftSide + 3 * this.width / 6,
            y: this.topSide +  this.height / 2 + this.height / 12 + 1 * this.height / 6,
            text: "+" + this.level.patternProperties.points,
            align: 'center',
            textBaseline: 'middle',
            size: "15px",
            color: playerScoreFieldColor
        }); 
        
        this.informationColor = new TextField({
            x: this.leftSide + 5 * this.width / 6,
            y: this.topSide +  this.height / 2 + this.height / 12 + 0 * this.height / 6,
            text: "Colors", 
            align: 'center',
            textBaseline: 'middle',
            size: "15px",
        });       
        this.informationColor2 = new TextField({
            x: this.leftSide + 5 * this.width / 6,
            y: this.topSide +  this.height / 2 + this.height / 12 + 1 * this.height / 6,
            text: "+" + this.colorPoints,
            align: 'center',
            textBaseline: 'middle',
            size: "15px",
            color: playerScoreFieldColor
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
		// offset vars
		var offset_x = this.leftSide;
		var offset_y = this.topSide;

		// offset
		canvasContext.translate(offset_x, offset_y);

		//draw 
        
        this.drawBase();
        this.drawTopRect();
        this.drawSampleFrame();
        this.drawBot3Rects();
        this.drawLastBorders();
        
		// undo offset
		canvasContext.translate(-offset_x, -offset_y);
		
		canvasContext.strokeStyle = "black";
		this.informationShape.draw();
		this.informationShape2.draw();

		this.informationPoints.draw();
		//this.informationPoints2.draw();
		this.informationColor.draw();
		this.informationColor2.draw();
		this.informationPattern.draw();
		this.informationPattern2.draw();

        this.example.draw();
    }
    
    drawBase() {
        canvasContext.beginPath();

		canvasContext.rect(0, 0, this.width, this.height);
		canvasContext.fillStyle = buttonBGColor;
		canvasContext.fill();
        
        canvasContext.closePath();
    }
    
    drawTopRect() {
        canvasContext.beginPath();
        
		canvasContext.rect(0, 0, this.width, this.height / 2);
		canvasContext.fillStyle = gameUIColor;
		canvasContext.fill();    
        
        canvasContext.closePath();
    }
    
    drawSampleFrame() {
        canvasContext.beginPath();
        let lineWidth = 3/2;
        canvasContext.lineWidth = lineWidth*2;
        let offset = 5;
 		canvasContext.rect(
            0 + offset,
            0 + offset,
            this.width - offset * 2 - ((this.width - offset * 2) / this.phi),
            this.height / 2 - offset * 2
        );
        
		canvasContext.fillStyle = buttonBGColor;
		canvasContext.fill();
        canvasContext.closePath();
        
        canvasContext.beginPath();
        
        canvasContext.rect(
            //this.width - offset * 2 - ((this.width - offset * 2) / this.phi) + offset,
            this.width - offset - ((this.width - offset * 2) / this.phi) + 1,
            0 + offset + lineWidth,
            ((this.width - offset * 2) / this.phi) - lineWidth * 2,
            this.height / 2 - offset * 2 - lineWidth *2
        );
        canvasContext.strokeStyle = buttonBGColor;
        canvasContext.stroke();
        
        canvasContext.closePath();
    }
    
    drawBot3Rects() {
        canvasContext.beginPath();    
        
		canvasContext.strokeStyle = buttonBGColor;
        canvasContext.lineJoin = "bevel";
        canvasContext.lineWidth = (this.borderWidth + 15).toString();
        
        let offset = (this.borderWidth + 15) / 2 + 1;
 		canvasContext.rect(
            0 + offset + 1,
            this.height / 2 + offset + 1,
            this.width / 3 - offset * 2,
            this.height / 2 - offset * 2 - 2
        );
 		canvasContext.rect(
            this.width /3 + offset, 
            this.height / 2 + offset + 1,
            this.width / 3 - offset * 2,
            this.height / 2 - offset * 2 - 2
        );        
 		canvasContext.rect(
            2 * this.width /3 + offset - 1, 
            this.height / 2 + offset + 1,
            this.width / 3 - offset * 2,
            this.height / 2 - offset * 2 - 2
        ); 
        
        canvasContext.stroke();
        
        canvasContext.closePath();
        
        canvasContext.beginPath(); 
        let tempColor = gameUIColor;
		canvasContext.strokeStyle = tempColor;
		canvasContext.fillStyle = tempColor;
        
        offset += 1;
        canvasContext.rect(
            0 + offset + 1,
            this.height / 2 + offset + 1,
            this.width / 3 - offset * 2,
            this.height / 2 - offset * 2 - 2
        );
 		canvasContext.rect(
            this.width /3 + offset, 
            this.height / 2 + offset + 1,
            this.width / 3 - offset * 2,
            this.height / 2 - offset * 2 - 2
        );        
 		canvasContext.rect(
            2 * this.width /3 + offset - 1, 
            this.height / 2 + offset + 1,
            this.width / 3 - offset * 2,
            this.height / 2 - offset * 2 - 2
        ); 
        
        canvasContext.stroke();
        canvasContext.fill();
        
        canvasContext.lineJoin = "miter";
        
        canvasContext.closePath();
    }
    
    drawLastBorders() {
        canvasContext.beginPath();  
        
		canvasContext.rect(0, 0, this.width, this.height);
		canvasContext.rect(0, 0, this.width, this.height / 2);
		canvasContext.lineWidth = this.borderWidth.toString();
        canvasContext.lineJoin = "round";
		canvasContext.strokeStyle = buttonBGColor;
		canvasContext.stroke();  
        
        canvasContext.lineJoin = "miter";
        
        canvasContext.closePath();
    }
}