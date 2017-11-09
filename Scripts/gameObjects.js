class GameArea {
    constructor(inWidth, inHeight) {
        canvas.width = inWidth;
        canvas.height = inHeight;
        this.FrameNo = 0;
        this.sceneNo = 1;
        
        let playerOptions =
            {
            name: (typeof loadedData === "undefined" ? false : loadedData.name) || 'Guest',
            score: (typeof loadedData === "undefined" ? false : loadedData.score) || 0
            //radius: 5,
            //speed: 1
            };      
        this.player = new Player(playerOptions);
        
        this.collectibles = new Collectibles();
        
        
        //execute global update every 20ms
        this.interval = setInterval(() => update(), 1000/framesPerSecond);
    }
    
    update() {
        this.player.input();
        this.player.checkCollisionWith(this.collectibles);
        
        this.draw();
    }
    
    draw() {
        this.clear();
        this.collectibles.drawAll();
        this.player.draw();
        
        c.font = '30px Arial';
        c.fillText(this.player.name, 10, 30);
    }

    clear() {
        c.clearRect(0, 0, canvas.width, canvas.height);
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
        
        this.controls = new KeyManager();
    }
    
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        c.fillStyle = 'black';
        c.fill();
        c.closePath();
    }
    
    checkCollisionWith(obj) {
        obj.checkCollisionWith(this);
    }
        
    input() {
        let speed = this.speed;
        
        let keys = this.controls.getKeysDown();
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
    

class KeyManager {
    constructor() {
        this.keysHeldDown = {};
        this.possiblePlayerInput = {
            37: "LEFT",
            38: "UP",
            39: "RIGHT",
            40: "DOWN"
        }
    }
    
    getKeysDown() {
        return this.keysHeldDown;
    }
    
    setEvent(event, state) {
        let key = event.keyCode in this.possiblePlayerInput ?
                    this.possiblePlayerInput[event.keyCode] :
                    0;
        if (key != 0) {
            this.keysHeldDown[key] = state;
        }
    }
}

class Collectibles {
    constructor() {
        this.list = this.spawn5ForTest();
        this.triangleSwarm = new TriangleSwarm();
    }
    
    drawAll() {
        for(let i in this.list) {
            this.drawCollectible(this.list[i]);
        }
    }
    
    drawCollectible(obj){
        c.beginPath();
        c.moveTo(obj.x - obj.r/2, obj.y + obj.r/2);
        c.lineTo(obj.x + obj.r/2, obj.y + obj.r/2);
        c.lineTo(obj.x, obj.y - obj.r/2);

        c.fillStyle = 'red';
        c.fill();
        c.closePath();
        
        //draw middle point
//        c.beginPath();
//        c.rect(obj.x, obj.y, 3, 3)
//        c.fillStyle = 'black';
//        c.fill();
//        c.closePath();
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
        let dVector = {x: 1, y: 1, length: 1};
        for (let i in this.list) {
            dVector.x = obj.x - this.list[i].x;
            dVector.y = obj.y - this.list[i].y;
            dVector.length = Math.sqrt(dVector.x**2 + dVector.y**2);

            if (dVector.length <= obj.radius + this.hitbox) {
                this.list.splice(i, i+1);
                console.log('removed');
            }
        }
    }
}

class TriangleSwarm {
    constructor() {
        this.list;
    }
    
    
}

class Triangle {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.r = options.r;
        this.hitbox = 0;
    }
    
    
}
