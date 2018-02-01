class TextField {
    constructor(config) {
        this.x = config.x;
        this.y = config.y;
        
        this.hasSide = config.hasSide || false;
		this.sideThickness = config.sideThickness || 3,

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
        canvasContext.shadowBlur = 0; 
        
        canvasContext.fillStyle = this.color;
        canvasContext.font = this.size + " " + this.type;
        canvasContext.textAlign = this.align;
        canvasContext.textBaseline = this.textBaseline;
        
        canvasContext.lineWidth = (Number(this.size.substring(0, this.size.length - 2)) / 6).toString();
        
        canvasContext.strokeStyle = "black";
        canvasContext.strokeText(this.text, this.x-1, this.y+1);
        
        if(this.hasSide) {
			canvasContext.strokeStyle = "black";
			canvasContext.lineWidth = (this.sideThickness + 5).toString();
            canvasContext.strokeText(this.text, this.x-1, this.y+1);
			
            canvasContext.strokeStyle = this.sideColor;
			canvasContext.lineWidth = this.sideThickness.toString();
            canvasContext.strokeText(this.text, this.x-1, this.y+1);
			
			canvasContext.strokeStyle = "black";
			canvasContext.lineWidth = "5";
            canvasContext.strokeText(this.text, this.x-1, this.y+1);
        }
        
        canvasContext.fillText(this.text, this.x, this.y);
        
        canvasContext.textAlign = "left";
        canvasContext.fillStyle = 'black';
        canvasContext.shadowBlur = 0;
    }
    
    setTextTo(inText) {
		if(this.text != inText)
			this.text = inText;
    }
}