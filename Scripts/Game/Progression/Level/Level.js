class Level {
    constructor(_levelProperties, _player) {
		this.colorList = _levelProperties.color;
		this.patternProperties = possibleCollectiblePatterns[_levelProperties.pattern]
        this.shapeProperties = possibleCollectibleShapes[_levelProperties.shape];
		
		this.patternKeyword = _levelProperties.pattern;
		this.shapeKeyword = _levelProperties.shape;

		this.player = _player;
				
		this.r = possibleCollectibleShapes.radius || this.randomizeRadius();
		
		this.points = {};
		this.calculatePoints();
		this.cost = {};
		this.calculateCost();
		
		this.randomCircleData = {};
		this.color = this.createPattern(this.r*2, this.r*2);
		
        this.list = [];
		
		this.cooldown = new SpawnCooldown();
		
		this.wasRandomized = false;
    }	
	
	calculatePoints() {
		let colorPoints = 1;
		for(let c in this.colorList)
			colorPoints *= 2;
		
		this.points = {
			color: colorPoints,
			pattern: this.patternProperties.points,
			shape: this.shapeProperties.points,
			total: colorPoints * this.patternProperties.points + this.shapeProperties.points
		};
	}
	
	//TODO: implement this like this.points
	calculateCost() {
		this.cost = {
			color: this.points.color * 50,
			pattern: this.points.pattern * 50,
			shape: this.points.shape * 50,
			total: (this.points.color + this.points.pattern + this.points.shape) * 45
		};		
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

	//PUBLIC
	randomizeShape(_player) {
		let keys = Object.keys(possibleCollectibleShapes);
		let rand = Math.round(Math.random() * (keys.length - 1));
		this.r = possibleCollectibleShapes[keys[rand]].radius || this.randomizeRadius();
		this.shapeProperties = possibleCollectibleShapes[keys[rand]];
		this.color = this.createPattern(this.r * 2, this.r * 2);
		this.calculatePoints();
		this.calculateCost();
		this.resetDrawFn();
		this.wasRandomized = true;
	}
	
	//PUBLIC
	randomizePattern() {
		let keys = Object.keys(possibleCollectiblePatterns);
		let rand = Math.round(Math.random() * (keys.length - 1));
		this.patternProperties = possibleCollectiblePatterns[keys[rand]];
		this.color = this.createPattern(this.r * 2, this.r * 2);
		this.randomCircleData = {};
		this.calculatePoints();
		this.calculateCost();
		this.resetDrawFn();
		this.wasRandomized = true;
	}
	
	//PUBLIC
	randomizeColor() {
		let newColorList = [];
		let rand = Math.round(Math.random() * 10);
		for(let i = 0; i <= rand; i++) {
			let r = Math.random() * 255;
			let g = Math.random() * 255;
			let b = Math.random() * 255;
			newColorList.push("rgb(" + r + ", " + g + ", " + b + ")");
		}
		this.colorList = newColorList;
		this.color = this.createPattern(this.r * 2, this.r * 2);
		this.calculatePoints();
		this.calculateCost();
		this.resetDrawFn();
			this.wasRandomized = true;
	}
	
	//PUBLIC
	randomizeEverything() {
		this.randomizeShape();
		this.randomizePattern();
		this.randomizeColor();
	}
	
	resetDrawFn() {
		for(let i in this.list) {
			this.list[i].r = this.r;
			this.list[i].setColor(this.color);
			this.list[i].setDrawFn(this.shapeProperties.fn);
		}
	}
}