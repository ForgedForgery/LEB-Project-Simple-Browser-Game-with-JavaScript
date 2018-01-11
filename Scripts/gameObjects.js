class ResourceCollector {
    constructor() {     
        let playerOptions =
            {
            name: playerData.name,
            score: playerData.score
            //radius: 5,
            //speed: 1
            };      
        
        this.player = new Player(playerOptions);
        this.progression = new ProgressionSystem(this.player);
        
        this.scenes = new SceneManager(this.player, this.progression);
        this.screen = new Screen(this.scenes);
    }
    
    update() {
        playerInput.update();
        this.scenes.update();
    }
    
    draw() {
        this.screen.draw();
    }
}

class Screen {
    constructor(inSceneObj) {
        canvas.width = width;
        canvas.height = height + heightUI;
        this.scenes = inSceneObj;
    }
    
    draw() {
        this.clear();
        this.scenes.draw();
    }
        
    clear() {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    }
}

class Player {
    constructor(options) {
        this.radius = options.radius || baseCircleRad;
        this.x = options.x || width/2;
        this.y = options.y || height/2;
        this.speed = options.speed || baseCircleSpeed;
        this.name = options.name;
        this.score = options.score || 0;
    }
    
    draw() {
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        canvasContext.fillStyle = playerColor;
        canvasContext.fill();
        canvasContext.closePath();
    }
    
    setTo(options) {
        this.name = options.name;
        this.score = options.score;
    }
    
    checkCollisionWith(obj) {
        obj.checkCollisionWith(this);
    }
        
    update() {
        this.checkInput();
        this.checkOutOfBounds();
    }
    
    checkInput() {
        let speed = this.speed;
        
        let keys = playerInput.getKeysDown();
        for (let k in keys) {
            if (keys[k]) {
                switch(k) {
                    case "LEFT":
                        this.moveX(-speed);
                        break;
                    case "RIGHT":
                        this.moveX(speed);
                        break;
                    case "UP":
                        this.moveY(-speed);
                        break;
                    case "DOWN":
                        this.moveY(speed);
                        break;
                    case "E":
                        this.increaseScoreByOne();
                        break;
                    default:
                        break;
                }
            }
        }
    }
    
    checkOutOfBounds() {
        if(this.x > width + this.radius) {
           this.x = 0 - this.radius;
        }
        if(this.x < 0 - this.radius) {
           this.x = width + this.radius;
        }
        if(this.y > height + heightUI + this.radius) {
           this.y = 0 - this.radius;
        }
        if(this.y < 0 - this.radius) {
            this.y = height + heightUI + this.radius;
        }
    }
    
    moveX(distancePerSecond) {
        this.x += deltaTime * distancePerSecond;
    }
    
    moveY(distancePerSecond) {
        this.y += deltaTime * distancePerSecond;
    }
    
    increaseScoreByOne() {
        this.score++;
    }
}

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
        
        // depending on level add new Level here
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
