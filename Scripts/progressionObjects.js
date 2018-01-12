class ProgressionSystem {
    constructor(inPlayerRef) {
        this.player = inPlayerRef;
        
		this.maxLevel = 15;
        this.currentLevel = 1;
        this.activeLevels = [new Level("RedTriangles")];
    }
    
    update() {
        for(let i in this.activeLevels) {
            this.activeLevels[i].update();
        }
        
		if(this.nextLevelReached() && this.currentLevel <= this.maxLevel) {
			this.currentLevel++;
			this.activeLevels.push(new Level(this.generateLevel()));
		}
    }
	
	nextLevelReached() {
		let requiredScore = Math.pow(this.currentLevel, 2) * 4;

		return this.player.score  > requiredScore;
	}
	
	
	// TODO: define proper level generation
	// 		 will probably not be random and based on a list
	generateLevel() {
		let level = "";
		
		level = "BlueTriangles";
		
		return level;
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
    constructor(inType) {
        this.type = inType;
        this.setAttributes();
		
        this.list = [];
		
		this.cooldown = new SpawnCooldown();
    }
	
	setAttributes() {
		switch(this.type) {
			case "RedTriangles":
				this.color = "red";
				break;
			case "BlueTriangles":
				this.color = "blue";
				break;
		}
		
        this.r = this.randomizeRadius();
	}
	
    randomizeRadius() {
        return 7 + Math.random() * 25;
    }
	
    update() {
        this.cooldown.tick();
		
		if(this.cooldown.isFinished()) {
            this.spawn();
        }
    }

    spawn() {
        // move this to a new class with name saved in "type" and just execute it's spawn fucntion here
		// or, you could create specific triangle classes that don't have predefined properties
        let rx, ry, rr;
        rx = Math.random() * width;
        ry = Math.random() * height;
        this.list.push(new Triangle({
            x: rx,
            y: ry,
            r: this.r,
			color: this.color
        }));
		
		this.cooldown.reset(this.list.length);
    }
	
    draw() {
        for(let i in this.list) {
            this.list[i].draw();
        }
    }
    
    checkCollisionWith(obj) {
        for (let i in this.list) {
            if (this.list[i].isCollidedWith(obj)) {
                this.list.splice(i, 1);
                obj.score++;
				this.cooldown.adjustTimer(this.list.length);
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
	
	reset(spawnAmount) {
		this.timer = 0;
		this.maximum = this.generateNewMaximum(spawnAmount);
	}
	
	adjustTimer(spawnAmount) {
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