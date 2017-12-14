class ResourceCollector {
    constructor() {     
        let playerOptions =
            {
            name: playerData.name,
            score: playerData.score
            //radius: 5,
            //speed: 1
            };      
        
        // game elements
        this.player = new Player(playerOptions);
        this.collectibles = new Collectibles();
        // game systems
        this.scenes = new SceneManager(this.player, this.collectibles);
        this.screen = new Screen(this.scenes);
        
        //execute global update every 20ms
        this.interval = setInterval(() => update(), 1000/framesPerSecond); 
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
    
    checkCollisionWith(obj) {
        obj.checkCollisionWith(this);
    }
        
    update() {
        this.checkInput();
        
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
    
    setTo(options) {
        this.name = options.name;
        this.score = options.score;
    }
    
    checkInput() {
        let speed = this.speed + 5;
        
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
    
    moveX(d) {
        this.x += d;
    }
    
    moveY(d) {
        this.y += d;
    }
    
    increaseScoreByOne() {
        this.score++;
    }
}

class Collectibles {
    constructor() {
        this.counter = 0;
        this.updateCounter = setInterval((() => this.counter++), 1000);
        this.spawnTime = 0;
        this.amountAtSpawn = 0;
        
        this.spawner = new Spawner();
        
        this.counterTextFiel = new TextField({
            
        });
    }
    
    update() {
        if(this.spawner.list.length != this.amountAtSpawn) {
            this.amountAtSpawn = this.spawner.list.length;
            this.spawnTime = Math.pow((this.amountAtSpawn), 2) / 12;
        }
        if(this.counter >= this.spawnTime) {
            this.spawner.spawn();
            this.counter = 0;
            this.amountAtSpawn = this.spawner.list.length;
            this.spawnTime = Math.pow((this.amountAtSpawn), 2) / 12;
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
    constructor() {
        this.list = [];
    }
    
    draw() {
        for(let i in this.list) {
            this.list[i].draw();
        }
    }
    
    spawn() {
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
