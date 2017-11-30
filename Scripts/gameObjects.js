class ResourceCollector {
    constructor(inWidth, inHeight) {     
        let playerOptions =
            {
            name: (typeof loadedData === "undefined" ? false : loadedData.name) || 'Guest',
            score: (typeof loadedData === "undefined" ? false : loadedData.score) || 0,
            //radius: 5,
            //speed: 1
            };      
        
        // game elements
        this.player = new Player(playerOptions);
        this.collectibles = new Collectibles();
        // game systems
        this.scenes = new SceneManager(this.player, this.collectibles);
        this.screen = new Screen(inWidth, inHeight, this.scenes);
        
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
    constructor(inWidth, inHeight, inSceneObj) {
        canvas.width  = inWidth;
        canvas.height  = inHeight;
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
        this.x = options.x || canvas.width/2;
        this.y = options.y || canvas.height/2;
        this.speed = options.speed || baseCircleSpeed;
        this.name = options.name;
        this.score = options.score || 0;
    }
    
    draw() {
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        canvasContext.fillStyle = 'black';
        canvasContext.fill();
        canvasContext.closePath();
    }
    
    checkCollisionWith(obj) {
        obj.checkCollisionWith(this);
    }
        
    update() {
        this.checkInput();
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
}

class Collectibles {
    constructor() {
        this.triangleSwarm = new TriangleSwarm();
    }
    
    draw() {
        this.triangleSwarm.draw();
    }
    
    checkCollisionWith(obj) {
        this.triangleSwarm.checkCollisionWith(obj);
    }
}

class TriangleSwarm {
    constructor() {
        this.list = this.spawn5ForTest();
    }
    
    draw() {
        for(let i in this.list) {
            this.list[i].draw();
        }
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
            }
        }
    }
}

class Triangle {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.r = options.r;
        this.hitbox = 0;
    }
    
    draw(){
        canvasContext.beginPath();
        canvasContext.moveTo(this.x - this.r/2, this.y + this.r/2);
        canvasContext.lineTo(this.x + this.r/2, this.y + this.r/2);
        canvasContext.lineTo(this.x, this.y - this.r/2);

        canvasContext.fillStyle = 'red';
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
