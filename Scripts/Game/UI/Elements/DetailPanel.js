class DetailPanel {
    constructor(config){
        this.x = config.x;
        this.y = config.y;
		
        this.width = config.width || 200;
        this.height = config.height || 150;
        
		this.leftSide = this.x - this.width/2;
		this.topSide = this.y - this.height;
        this.level = config.level;
		this.player = config.player;
		this.color = config.color;
        
        this.phi = (1 + Math.sqrt(5)) / 2;
		
		this.borderWidth = 3; 
        
        let offset = 5;
        let tempRadius = 25;
        this.color = this.level.createPattern(tempRadius * 2, tempRadius * 2);
        this.example = new Collectible(this.level.shapeProperties.fn, this.color, {
            r: tempRadius,
            x: this.leftSide + offset + (this.width - offset * 2 - ((this.width - offset * 2) / this.phi)) / 2,
            y: this.topSide + this.height / 4
        });
        
        this.informationPoints = new TextField({
            x: this.leftSide + this.width - offset - ((this.width - offset * 2) / this.phi) / 2,
            y: this.topSide + this.height / 8 + offset,
            text: "+" + this.level.points.total,
            align: 'center',
            textBaseline: 'middle',
            size: "24px",
            color: playerScoreFieldColor
        });
        this.informationPoints2 = new TextField({
            x: this.leftSide + this.width - offset - ((this.width - offset * 2) / this.phi) * 5 /8,
            y: this.topSide + 2 * this.height / 8 + this.height / 16 + offset / 2 + 1,
            text: "-" + this.level.cost.total,
            align: 'center',
            textBaseline: 'middle',
            size: "20px",
            color: playerScoreFieldColorAlert
        });
        
        this.informationShape = new TextField({
            x: this.leftSide + this.width / 6,
            y: this.topSide +  this.height / 2 + this.height / 12 + 0 * this.height / 6,
            text: "Shape",
            align: 'center',
            textBaseline: 'middle',
            size: "15px"
        });    
        this.informationShape2 = new TextField({
            x: this.leftSide + this.width / 6,
            y: this.topSide +  this.height / 2 + this.height / 12 + 1 * this.height / 6,
            text: "" + this.level.points.shape,
            align: 'center',
            textBaseline: 'middle',
            size: "15px",
            color: playerScoreFieldColor
        }); 
        this.informationShape3 = new TextField({
            x: this.leftSide + this.width / 6 - 7,
            y: this.topSide + this.height / 2 + this.height / 12 + this.height / 6 + 19,
            text: "-" + this.level.cost.shape,
            align: 'center',
            textBaseline: 'middle',
            size: "13px",
            color: playerScoreFieldColorAlert
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
            text: "" + this.level.points.pattern,
            align: 'center',
            textBaseline: 'middle',
            size: "15px",
            color: playerScoreFieldColor
        }); 
        this.informationPattern3 = new TextField({
            x: this.leftSide + 3 * this.width / 6 - 7,
            y: this.topSide + this.height / 2 + this.height / 12 + this.height / 6 + 19,
            text: "-" + this.level.cost.pattern,
            align: 'center',
            textBaseline: 'middle',
            size: "13px",
            color: playerScoreFieldColorAlert
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
            text: "" + this.level.points.color,
            align: 'center',
            textBaseline: 'middle',
            size: "15px",
            color: playerScoreFieldColor
        }); 
        
        this.informationColor3 = new TextField({
            x: this.leftSide + 5 * this.width / 6 - 7,
            y: this.topSide + this.height / 2 + this.height / 12 + this.height / 6 + 19,
            text: "-" + this.level.cost.color,
            align: 'center',
            textBaseline: 'middle',
            size: "13px",
            color: playerScoreFieldColorAlert
        }); 
        
        this.shapeRandomizeButton = new Button({
            x: this.leftSide + this.width / 6 + 24,
            y: this.topSide + this.height / 2 + this.height / 12 + this.height / 6 + 18,
            //y: this.topSide +  this.height / 2 + this.height / 12 + 2 * this.height / 6 - 1,
            width: 16,
            height: 16,
            label: diceImg,
            fontSize: "17px",
            shadowBlur: 0,
            shadowBlurText: 0,
			onClick: (function(_level, _detailPanel) {
				return function() {
					if(_level.player.score > _level.cost.shape) {
						_level.player.score -= _level.cost.shape;
						_level.randomizeShape();
					
						_detailPanel.example.setDrawFn(_level.shapeProperties.fn);
					}
				}
			})(this.level, this)
        });
        
        this.patternRandomizeButton = new Button({
            x: this.leftSide + 3 * this.width / 6 + 24,
            y: this.topSide + this.height / 2 + this.height / 12 + this.height / 6 + 18,
            width: 16,
            height: 16,
            label: diceImg,
            fontSize: "17px",
            shadowBlur: 0,
            shadowBlurText: 0,
			onClick: (function(_level, _detailPanel) {
				return function() {
					if(_level.player.score > _level.cost.pattern) {
						_level.player.score -= _level.cost.pattern;
						
						_level.randomizePattern();
						_detailPanel.color = _level.createPattern(50, 50);
						_detailPanel.example.setColor(_detailPanel.color);
						_detailPanel.example.setDrawFn(_level.shapeProperties.fn);
					}
				}
			})(this.level, this)
        });
        
        this.colorRandomizeButton = new Button({
            x: this.leftSide + 5 * this.width / 6 + 24,
            y: this.topSide + this.height / 2 + this.height / 12 + this.height / 6 + 18,
            width: 16,
            height: 16,
            label: diceImg,
            fontSize: "17px",
            shadowBlur: 0,
            shadowBlurText: 0,
			onClick: (function(_level, _detailPanel) {
				return function() {
					if(_level.player.score > _level.cost.color) {
						_level.player.score -= _level.cost.color;
						
						_level.randomizeColor();
						_detailPanel.color = _level.createPattern(50, 50);
						_detailPanel.example.setColor(_detailPanel.color);
						_detailPanel.example.setDrawFn(_level.shapeProperties.fn);
					}
				}
			})(this.level, this)
        });
        
        let tempDiceImg = new Image(20, 20);
        tempDiceImg.src = diceImg.src;
        this.totalRandomizeButton = new Button({
            x: this.leftSide + this.width - offset - ((this.width - offset * 2) / this.phi) * 1/8 - 2,
            y: this.topSide + 2 * this.height / 8 + this.height / 16 + offset / 2,
            //y: this.topSide +  this.height / 2 + this.height / 12 + 2 * this.height / 6 - 1,
            width: 21,
            height: 21,
            label: tempDiceImg,
            fontSize: "23px",
            shadowBlur: 0,
            shadowBlurText: 0,
			onClick: (function(_level, _detailPanel) {
				return function() {
					if(_level.player.score > _level.cost.total) {
						_level.player.score -= _level.cost.total;
						
						_level.randomizeEverything();
						_detailPanel.color = _level.createPattern(50, 50);
						_detailPanel.example.setColor(_detailPanel.color);
						_detailPanel.example.setDrawFn(_level.shapeProperties.fn);
					}
				}
			})(this.level, this)
        });
   
        this.hovered = false;
		this.active = false;
    }
    
    update() {
		this.hovered = this.isHovered() ? true : false;
        this.totalRandomizeButton.update();
        this.shapeRandomizeButton.update();
        this.patternRandomizeButton.update();
        this.colorRandomizeButton.update();
		this.informationShape2.setTextTo(this.level.points.shape);
		this.informationPattern2.setTextTo(this.level.points.pattern);
		this.informationColor2.setTextTo(this.level.points.color);
		this.informationPoints.setTextTo("+" + this.level.points.total);
		this.informationShape3.setTextTo("-" + this.level.cost.shape);
		this.informationPattern3.setTextTo("-" + this.level.cost.pattern);
		this.informationColor3.setTextTo("-" + this.level.cost.color);
		this.informationPoints2.setTextTo("-" + this.level.cost.total);
    }
  
    isHovered() {
        let left = this.x - this.width/2,
            right = this.y - this.height;

		let width = this.width + 2 * this.borderWidth,
			height = this.height + 2 * this.borderWidth;
        
        return playerInput.isMouseInside(left, right, width, height);
    } 
    
    draw() {
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
		this.informationPoints.draw();
        this.drawRandomizedFrame();
        this.informationPoints2.draw();

		this.informationShape.draw();
		this.informationShape2.draw();;
        
		this.informationColor.draw();
		this.informationColor2.draw();
        
		this.informationPattern.draw();
		this.informationPattern2.draw();
        
        this.totalRandomizeButton.draw();
      
        this.shapeRandomizeButton.draw();
		this.informationShape3.draw()
        
        this.patternRandomizeButton.draw();
		this.informationPattern3.draw();
        
        this.colorRandomizeButton.draw();
		this.informationColor3.draw();

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
    
    drawRandomizedFrame() {
        canvasContext.beginPath();
        canvasContext.lineWidth = 3;
        canvasContext.strokeStyle = buttonBGColor;
        let offset = 5;
         canvasContext.rect(            
            this.leftSide + this.width - offset - ((this.width - offset * 2) / this.phi)* 15/16,
            this.topSide + 2 * this.height / 8 ,
            102,
            24 
        );       
        canvasContext.rect(            
            this.leftSide + this.width / 6 - 32,
            this.topSide + this.height / 2 + this.height / 12 + this.height / 6 + 18 - 9,
            62,
            18 
        );
        canvasContext.rect(            
            this.leftSide + 3 * this.width / 6 - 32,
            this.topSide + this.height / 2 + this.height / 12 + this.height / 6 + 18 - 9,
            62,
            18 
        );
        canvasContext.rect(            
            this.leftSide + 5 * this.width / 6 - 32,
            this.topSide + this.height / 2 + this.height / 12 + this.height / 6 + 18 - 9,
            62,
            18 
        );    
        canvasContext.stroke();
        canvasContext.closePath();
    }
}