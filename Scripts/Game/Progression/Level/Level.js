class Level {
    constructor(_levelProperties) {
		this.colorList = _levelProperties.color;
		this.patternProperties = possibleCollectiblePatterns[_levelProperties.pattern]
        this.shapeProperties = possibleCollectibleShapes[_levelProperties.shape];
				
		this.r = this.randomizeRadius();
		
		let colorPoints = 1;
		for(let c in this.colorList)
			colorPoints *= 2;
		
		this.points = {
			color: colorPoints,
			pattern: this.patternProperties.points,
			shape: this.shapeProperties.points,
			total: colorPoints * this.patternProperties.points + this.shapeProperties.points
		};
		
		this.color = this.createPattern(this.r*2, this.r*2);
		
        this.list = [];
		
		this.cooldown = new SpawnCooldown();
    }	
	
	randomizeRadius() {
        return 20 - 5 + Math.random() * 10;
    }
	
	//PUBLIC
    update() {
        this.cooldown.tick();		
		if(this.cooldown.isFinished())
            this.spawn();
    }

    spawn() {
        this.list.push(this.createCollectible());
		
		this.cooldown.resetBasedOn(this.list.length);
    }
	
	createCollectible() {
		return new Collectible(this.shapeProperties.fn, this.color, {r: this.r});
	}
	
	//PUBLIC
    draw() {
        for(let i in this.list) {
            this.list[i].draw();
        }
    }
    
	//PUBLIC
    checkCollisionWith(obj) {
        for (let i in this.list) {
            if (this.list[i].isCollidedWith(obj)) {
                obj.score += this.points.total;
                this.list.splice(i, 1);
				this.cooldown.adjustTimerBasedOn(this.list.length);
            }
        }
    }
    
    //PUBLIC
    createPattern(_width, _height) {
        let tempCanvas = document.createElement('canvas');
        let tempContext = tempCanvas.getContext('2d');
        tempCanvas.width = _width;
        tempCanvas.height = _height;

        tempContext.beginPath();
        this.patternProperties.fn(tempCanvas, tempContext, this.colorList, this);
        tempContext.closePath();

        let pattern = canvasContext.createPattern(tempCanvas, "repeat");
        document.body.appendChild(tempCanvas);
        return pattern;
    }

}