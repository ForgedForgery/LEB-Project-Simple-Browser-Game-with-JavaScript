class Button {
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        
        this.shadowColor = config.shadowColor || "black";
        this.shadowBlur = config.shadowBlur || "5";       
        
        this.width = config.width || 150;
        this.height = config.height || 40;
        
        this.affectedReference = config.affectedReference;
        this.executeBehavior = config.onClick || function() {};
        this.backgroundColor = config.backgroundColor || buttonBGColor;
        
        if(config.label) {
            if(typeof config.label == "string") {
                this.label = new TextField({
                        x: this.x,
                        y: this.y,
                        shadowColor: config.shadowColorText || false,
                        shadowBlur: config.shadowBlurText || "5",
                        text: config.label || false,
                        size: config.fontSize || false,
                        type: config.fontType || false,
                        color: config.fontColor || false
                    });
            } else if (config.label instanceof Image) {
                this.label = config.label;
                
            }
        }
        
        this.hovered = false;
    }
    
    update() {
        this.hovered = this.isHovered();
        
        if(this.hovered && playerInput.upClick) {
            if(this.executeBehavior.length == 1)
                this.executeBehavior(this.affectedReference);
            else
                this.executeBehavior();
        }
    }
    

    
    isHovered() {
        let mouseX = playerInput.mouseX;
        let mouseY = playerInput.mouseY;
        let topleftCorner = {
            x: this.x - this.width/2,
            y: this.y - this.height/2
        }
        
        return mouseX > topleftCorner.x &&
            mouseX < (topleftCorner.x + this.width) &&
            mouseY > topleftCorner.y &&
            mouseY < (topleftCorner.y + this.height);
    } 
    
    draw() {
        canvasContext.beginPath();  
        canvasContext.shadowColor = this.shadowColor;
        //canvasContext.shadowBlur = this.shadowBlur;
        
        canvasContext.lineWidth = "5";
        canvasContext.strokeStyle = this.backgroundColor;
        canvasContext.fillStyle = this.hovered ? (playerInput.mouseHold ? buttonHoldColor : buttonHoverColor) : this.backgroundColor;
        canvasContext.rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        
        canvasContext.stroke();
        canvasContext.fill();
        
        canvasContext.lineWidth = "1";
        canvasContext.strokeStyle = "black";
        canvasContext.shadowBlur = 0;
        
        if(this.label instanceof TextField)
            this.label.draw();  
        else if((this.label instanceof Image) && this.label.complete) {
            canvasContext.drawImage(this.label, this.x - this.label.width / 2, this.y - this.label.height / 2, this.label.width, this.label.height);
            
            canvasContext.fillStyle = this.hovered ? (playerInput.mouseHold ? "rgba(0, 0, 0, 0.4)" :  "rgba(255, 0, 0, 0.15)") : "rgba(255, 255, 255, 0)";
            canvasContext.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
            canvasContext.fill();
        }
        
        canvasContext.closePath();
    }
}

class TextField {
    constructor(config) {
        this.x = config.x;
        this.y = config.y;
        
        this.hasSide = config.hasSide || false;

        this.shadowColor = config.shadowColor || "Black";
        this.shadowBlur = config.shadowBlur || 0;
            
        this.text = (config.text === 0 ? "0" : config.text) || "No Text";

        this.size = config.size || "20px";
        this.type = config.type || "Arial";
        
        this.align = config.align || "center";
        this.textBaseline = config.textBaseline || "middle";
        
        this.color = config.color || textFieldColor;
        this.sideColor = config.sideColor || textFieldSideColor;
    }
    
    draw() {
        canvasContext.shadowColor = this.shadowColor;
        //canvasContext.shadowBlur = this.shadowBlur; 
        
        canvasContext.fillStyle = this.color;
        canvasContext.font = this.size + " " + this.type;
        canvasContext.textAlign = this.align;
        canvasContext.textBaseline = this.textBaseline;
        
        canvasContext.lineWidth = "3";
        
        canvasContext.strokeStyle = "black";
        canvasContext.strokeText(this.text, this.x-1, this.y+1);
        
        if(this.hasSide) {
            canvasContext.strokeStyle = this.sideColor;
            canvasContext.strokeText(this.text, this.x-1, this.y+1);
        }
        
        canvasContext.fillText(this.text, this.x, this.y);
        
        canvasContext.textAlign = "left";
        canvasContext.fillStyle = 'black';
        canvasContext.shadowBlur = 0;
    }
    
    setTextTo(inText) {
        this.text = inText;
    }
}

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
        canvasContext.fillStyle = this.level.color;
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

// TODO: write this class
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