class ProgressionSystem {
    constructor(inPlayerRef) {
        this.player = inPlayerRef;
        
		this.maxLevel = 15;
        this.currentLevel = 1;
        this.activeLevels = [new Level(baseLevels[0], this.player)];
    }
    
	//PUBLIC
    update() {
        for(let i in this.activeLevels) {
            this.activeLevels[i].update();
        }
        
		if(this.nextLevelReached()) {
			this.generateNewLevel();
			this.currentLevel++;
		}
		
		this.checkCollisionWith(this.player);
    }
	
	nextLevelReached() {
		let requiredScore = Math.pow(this.currentLevel, 2) * 4;

		return this.player.score > requiredScore && this.currentLevel <= this.maxLevel;
	}

	generateNewLevel() {
		this.activeLevels.push(new Level(baseLevels[this.currentLevel], this.player));
	}
    
	//PUBLIC
    draw() {
        for(let i in this.activeLevels) {
            this.activeLevels[i].draw();
        }
    }
	
	// TODO: doesn't work yet
	//PUBLIC
	randomizeForLevel(level) {
		let shapeProperties = possibleCollectibleShapes[Math.round(Math.random() * (possibleCollectibleShapes.length - 1))];
		let colorProperties = possibleCollectibleColor[Math.round(Math.random() * (possibleCollectibleColor.length - 1))];
		
		this.activeLevels[level] = new Collectible(shapeProperties, colorProperties, {});
	}
    
    checkCollisionWith(obj) {
        for(let i in this.activeLevels) {
            this.activeLevels[i].checkCollisionWith(obj);
        }
    }
}