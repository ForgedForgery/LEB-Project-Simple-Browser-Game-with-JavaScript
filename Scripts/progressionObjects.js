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

		return this.player.score > requiredScore;
	}
	
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
    constructor(type) {
        this.counter = 0;
        this.spawnTime = 0;
        this.previousAmount = 0;
        
        this.spawner = new Spawner(type);
    }
    
    update() {
        this.counter += deltaTime;
        
        if(this.spawner.list.length != this.previousAmount) {
            let counterPrecentage = this.counter / this.spawnTime;
            this.previousAmount = this.spawner.list.length;
            this.spawnTime = Math.pow((this.previousAmount), 2) / 12;
            this.counter = this.spawnTime * counterPrecentage;
        }
        
        if(this.counter >= this.spawnTime) {
            this.spawner.spawn();
            this.counter = 0;
            this.previousAmount = this.spawner.list.length;
            this.spawnTime = Math.pow((this.previousAmount), 2) / 12;
        }
    }   
    
    checkCollisionWith(obj) {
        this.spawner.checkCollisionWith(obj);
    }

    draw() {
        this.spawner.draw();
    }
}

class Spawner {
    constructor(type) {
        this.type = type;
        this.setAttributes();
		
        this.list = [];
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
    
    draw() {
        for(let i in this.list) {
            this.list[i].draw();
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
    }
    
    randomizeRadius() {
        return 7 + Math.random() * 25;
    }
    
    checkCollisionWith(obj) {
        for (let i in this.list) {
            if (this.list[i].isCollidedWith(obj)) {
                this.list.splice(i, 1);
                game.player.score++;
            }
        }
    }
}

class Collectible {
	constructor(options) {
		this.x = options.x;
        this.y = options.y;
        this.r = options.r;
		this.color = options.color;
	}
	
	draw() {
		
	}
	
	isCollidedWith(obj) {
        let dVector = {
            x: obj.x - this.x,
            y: obj.y - this.y
        };
        let vectorLength = Math.sqrt(dVector.x**2 + dVector.y**2);
        if(vectorLength <= obj.radius + this.r) {
            return true;
        }
        return false;
    }
}

class Triangle extends Collectible {
    constructor(options) {
		super(options);
    }
    
    draw(){
        canvasContext.beginPath();
        canvasContext.moveTo(this.x - this.r, this.y + this.r);
        canvasContext.lineTo(this.x + this.r, this.y + this.r);
        canvasContext.lineTo(this.x, this.y - this.r);

        canvasContext.fillStyle = this.color;
        canvasContext.fill();
        canvasContext.closePath();

        //draw middle point
//        canvasContext.beginPath();
//        canvasContext.rect(obj.x, obj.y, 3, 3)
//        canvasContext.fillStyle = 'black';
//        canvasContext.fill();
//        canvasContext.closePath();
    }
}
