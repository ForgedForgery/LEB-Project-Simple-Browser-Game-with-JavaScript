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

class SceneManager {
    constructor(inPlayerReference, inCollectiblesReference) {
        this.currentScene = "None";
        this.allScenes = {
            title: new TitleMenu(),
            game: new MainGame(inPlayerReference, inCollectiblesReference),
            //store: 
        };
    }
    
    update() {
        if (this.currentScene != "None") {
            this.allScenes[this.currentScene].update();
        }
    } 
    
    draw() {
        if (this.currentScene != "None") {
            this.allScenes[this.currentScene].draw();
        }
    }
    
    changeTo(inScene) {
        this.currentScene = inScene;
    }
}

class MainGame {
    constructor(inPlayerReference, inCollectiblesReference) {
        this.player = inPlayerReference;
        this.collectibles = inCollectiblesReference;
    }
    
    update() {
        this.player.input();
        this.player.checkCollisionWith(this.collectibles);
    }
    
    draw() {
        this.collectibles.draw();
        this.player.draw();

        c.font = '30px Arial';
        c.fillText(this.player.name, 10, 30);
    }
}

class TitleMenu {
    constructor() {
        this.btn1 = new Button({
                        x: 300,
                        y: 200,
                        width: 250,
                        label: "Please click!",
                        fontSize: "40px",
                        fontType: "Arial",
                        onClick: function() {
                            game.scenes.changeTo("game");
                        }
                    });
    }
    
    update() {
        this.btn1.update();
    }
    
    draw() {
        c.beginPath();
        c.fillStyle = "black";
        c.strokeStyle = "blue";
        c.font = "40px Comic Sans MS";
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText('Resource Collector',400,100);
        c.closePath();
        
        this.btn1.draw();
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
        c.beginPath();
        c.moveTo(this.x - this.r/2, this.y + this.r/2);
        c.lineTo(this.x + this.r/2, this.y + this.r/2);
        c.lineTo(this.x, this.y - this.r/2);

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
