class ProgressionSystem {
    constructor(inPlayerRef) {
        this.player = inPlayerRef;
        
		this.maxLevel = 15;
        this.currentLevel = 1;
        this.activeLevels = [new Level(baseLevels[0])];
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
		this.activeLevels.push(new Level(baseLevels[this.currentLevel]));
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
    constructor(_levelProperties) {
		this.colorList = _levelProperties.color;
		this.patternProperties = possibleCollectiblePatterns[_levelProperties.pattern]
        this.formProperties = possibleCollectibleShapes[_levelProperties.shape];
				
		this.r = this.randomizeRadius();
		
		this.points = 0;
		for(let c in this.colorList)
			this.points += possibleCollectibleColors[this.colorList[c]].points;
		this.points += this.patternProperties.points;
		this.points += this.formProperties.points;
		
		this.color = createPatternWithCanvas(this.r*2, this.r*2, this.colorList, this.patternProperties.fn);
		
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
		return new Collectible(this.formProperties.fn, this.color, {r: this.r});
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
                obj.score += this.points + this.list[i].points;
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
	
	//PUBLIC
	tick() {
		if(!this.isFinished())
			this.timer += deltaTime;
	}
	
	//PUBLIC
	isFinished() {
		return this.timer >= this.maximum;
	}
	
	//PUBLIC
	resetBasedOn(spawnAmount) {
		this.timer = 0;
		this.maximum = this.generateNewMaximum(spawnAmount);
	}
	
	//PUBLIC
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