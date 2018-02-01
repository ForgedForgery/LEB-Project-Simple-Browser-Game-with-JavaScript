class ProgressionSystem {
    constructor(inPlayerRef) {
        this.player = inPlayerRef;
        
		this.maxLevel = 15;
        this.currentLevel = 1;
        this.activeLevels = [new Level(baseLevels[0])];
    }
    
    update() {
        for(let i in this.activeLevels) {
            this.activeLevels[i].update();
        }
        
		if(this.nextLevelReached()) {
			this.generateNewLevel();
			this.currentLevel++;
		}
    }
	
	nextLevelReached() {
		let requiredScore = Math.pow(this.currentLevel, 2) * 4;

		return this.player.score > requiredScore && this.currentLevel <= this.maxLevel;
	}

	generateNewLevel() {
		this.activeLevels.push(new Level(baseLevels[this.currentLevel]));
	}
    
    draw() {
        for(let i in this.activeLevels) {
            this.activeLevels[i].draw();
        }
    }
	
	randomizeForLevel(level) {
		let formProperties = possibleCollectibleShapes[Math.round(Math.random() * (possibleCollectibleShapes.length - 1))];
		let colorProperties = possibleCollectibleColor[Math.round(Math.random() * (possibleCollectibleColor.length - 1))];
		
		this.activeLevels[level] = new Collectible(formProperties, colorProperties, {});
	}
    
    checkCollisionWith(obj) {
        for(let i in this.activeLevels) {
            this.activeLevels[i].checkCollisionWith(obj);
        }
    }
}

class Level {
    constructor(levelProperties) {
        this.formProperties = possibleCollectibleShapes[levelProperties.shapeType];
		this.colorProperties = possibleCollectibleColor[levelProperties.colorType];
		
        this.list = [];
		
		this.cooldown = new SpawnCooldown();
    }
	
    update() {
        this.cooldown.tick();
		
		if(this.cooldown.isFinished()) {
            this.spawn();
        }
    }

    spawn() {
        this.list.push(this.createCollectible());
		
		this.cooldown.resetBasedOn(this.list.length);
    }
	
	createCollectible() {
		return new Collectible(this.formProperties, this.colorProperties, {});
	}
	
    draw() {
        for(let i in this.list) {
            this.list[i].draw();
        }
    }
    
    checkCollisionWith(obj) {
        for (let i in this.list) {
            if (this.list[i].isCollidedWith(obj)) {
                obj.score += this.list[i].points;
                this.list.splice(i, 1);
				this.cooldown.adjustTimerBasedOn(this.list.length);
            }
        }
    }
}

class SpawnCooldown {
	constructor() {
		this.timer = 0;
		this.maximum = 0;
	}
	
	tick() {
		if(!this.isFinished())
			this.timer += deltaTime;
	}
	
	isFinished() {
		return this.timer >= this.maximum;
	}
	
	resetBasedOn(spawnAmount) {
		this.timer = 0;
		this.maximum = this.generateNewMaximum(spawnAmount);
	}
	
	adjustTimerBasedOn(spawnAmount) {
		let previousPercentage = this.getPercentage();
		
		this.maximum = this.generateNewMaximum(spawnAmount);
		this.timer = this.maximum * previousPercentage;
	}
	
	getPercentage() {
		return this.timer / this.maximum;
	}
		
	generateNewMaximum(spawnAmount) {
		return Math.pow((spawnAmount), 2) / 12;
	}
}