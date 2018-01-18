var possibleLevelProperties = {
	BlueTriangles: function() {
		return new Triangle({
			color: "blue",
			pointsGiven: 20
		});
	},
	RedTriangles: function() {
		return new Triangle({
			r: 20,
			color: "red",
			pointsGiven: 10
		});
	}
};

class ProgressionSystem {
    constructor(inPlayerRef) {
        this.player = inPlayerRef;
        
		this.maxLevel = 15;
        this.currentLevel = 1;
        this.activeLevels = [new Level(possibleLevelProperties["RedTriangles"])];
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
	
	// TODO: define proper level generation
	// 		 will probably not be random and based on a list
	generateNewLevel() {
		let newLevelName;
		
		newLevelName = "BlueTriangles";
		
		//this.activeLevels.push(new Level(newLevelName));
		
		this.activeLevels.push(new Level(possibleLevelProperties[newLevelName]));
	}
    
    draw() {
        for(let i in this.activeLevels) {
            this.activeLevels[i].draw();
        }
    }
    
    checkCollisionWith(obj) {
        for(let i in this.activeLevels) {
            this.activeLevels[i].checkCollisionWith(obj);
        }
    }
}

class Level {
    constructor(createCollectibleFunction) {
        this.createCollectible = createCollectibleFunction;
		
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
	
    draw() {
        for(let i in this.list) {
            this.list[i].draw();
        }
    }
    
    checkCollisionWith(obj) {
        for (let i in this.list) {
            if (this.list[i].isCollidedWith(obj)) {
                obj.score += this.list[i].pointsGiven;
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