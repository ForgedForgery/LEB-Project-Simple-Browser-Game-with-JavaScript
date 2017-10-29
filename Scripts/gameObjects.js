class GameArea {
    constructor(inWidth, inHeight) {
        canvas.width = inWidth;
        canvas.height = inHeight;
        this.FrameNo = 0;
        this.sceneNo = 1;
        
        let options =
            {
            //radius: 5,
            //speed: 1
            };      
        this.player = new PlayerObject(options);
        
        this.interval;
    }
    
    update() {
        this.player.input();
        this.draw();

    }
    
    draw() {
        this.clear();
        this.player.draw();
    }

    clear() {
        c.clearRect(0, 0, canvas.width, canvas.height);
    }
}

class PlayerObject {
    constructor(options) {
        this.radius = options.radius || baseCircleRad;
        this.x = options.x || canvas.width/2;
        this.y = options.y || canvas.height/2;
        this.speed = options.speed || baseCircleSpeed;
        
        this.controls = new KeyManager();
    }
    
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        c.fillStyle = 'black';
        c.fill();
        
    }
        
    input() {
        let speed = this.speed;
        let allKeysPressed = this.controls.getKeysDown();
        for (let k in allKeysPressed) {
            switch(allKeysPressed[k]) {
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
        let k = {};
        let index = 0;
        for (let n in this.keysHeldDown){
            if (this.keysHeldDown[n] == true && typeof this.possiblePlayerInput[n] != undefined){
                k[index++] = this.possiblePlayerInput[n];
            }
        }
        return k;
    }
    
    setEvent(event, state) {
        this.keysHeldDown[event.keyCode] = state;
    }
}