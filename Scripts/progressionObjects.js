class ProgressionSystem {
    constructor(inPlayerRef) {
        this.player = inPlayerRef;
        
        this.currentLevel = 0;
        this.activeLevels = [new Level("BasicTri")];
    }
    
    update() {
        for(let i in this.activeLevels) {
            this.activeLevels[i].update();
        }
        
		if(this.player.score > this.getRequiredScore()) {
			this.currentLevel++;
			this.activeLevels.push(new Level(this.generateLevel));
		}
    }
	
	getRequiredScore() {
		let score = 0;
		
		score = this.currentLevel * 2;
		
		return score;
	}
	
	generateLevel() {
		let level = "";
		
		level = "BasicTri";
		
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
    constructor(enemyType) {
        this.enemyType = enemyType;  
        
        this.counter = 0;
        this.spawnTime = 0;
        this.previousAmount = 0;
        
        this.spawner = new Spawner(this.enemyType);
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
    constructor(enemyType) {
        this.enemyType = enemyType;
        
        this.list = [];
    }
    
    draw() {
        for(let i in this.list) {
            this.list[i].draw();
        }
    }
    
    spawn() {
        // move this to a new class with name saved in "type" and just execute it's spawn fucntion here
        let rx, ry, rr;
        rx = Math.random() * width;
        ry = Math.random() * height;
        rr = this.randomizeRadius();
        this.list.push(new Triangle({
            x: rx,
            y: ry,
            r: rr
        }));
    }
    
    randomizeRadius() {
        return 7 + Math.random() * 25;
    }
        
    spawn5ForTest(){
        let list = [];
        let rx, ry, rr;
        for (let i = 0; i < 5; i++){
            rx = Math.random() * width;
            ry = Math.random() * height;
            rr = 15 + Math.random() * 50;
            list.push(new Triangle({
                x: rx,
                y: ry,
                r: rr
            }));
        }
        return list;
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

class Triangle {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.r = options.r;
        this.hitbox = this.r;
    }
    
    draw(){
        canvasContext.beginPath();
        canvasContext.moveTo(this.x - this.r, this.y + this.r);
        canvasContext.lineTo(this.x + this.r, this.y + this.r);
        canvasContext.lineTo(this.x, this.y - this.r);

        canvasContext.fillStyle = collectibleColor;
        canvasContext.fill();
        canvasContext.closePath();
        
        //draw middle point
//        canvasContext.beginPath();
//        canvasContext.rect(obj.x, obj.y, 3, 3)
//        canvasContext.fillStyle = 'black';
//        canvasContext.fill();
//        canvasContext.closePath();
    }
    
    isCollidedWith(obj) {
        let dVector = {
            x: obj.x - this.x,
            y: obj.y - this.y,
        };
        let vLength = Math.sqrt(dVector.x**2 + dVector.y**2);
        if (vLength <= obj.radius + this.hitbox) {
            return true;
        }
        return false;
    }
    
    
}
