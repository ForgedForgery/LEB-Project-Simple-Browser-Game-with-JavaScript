class gameArea {
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
        this.player = new playerObject(options);
        
        //execute update every 20ms
        this.interval = setInterval(update, 20);
    }
    
    update() {
        this.playerInput();
        this.draw();
    }
    
    draw() {
        this.clear();
        this.player.draw();
    }

    clear() {
        c.clearRect(0, 0, canvas.width, canvas.height);
    }

    getKeyDown() {
        let k = {};
        let index = 0;
        for (let n in keyMap){
            if (keyMap[n] == true && typeof possiblePlayerInput[n] != undefined){
                k[index++] = possiblePlayerInput[n];
            }
        }
        return k;
    }
    
    playerInput() {
        let speed = this.player.speed;
        let allKeysPressed = this.getKeyDown();
        for (let k in allKeysPressed) {
            switch(allKeysPressed[k]) {
                case "LEFT":
                    this.player.moveX(-speed);
                    break;
                case "RIGHT":
                    this.player.moveX(speed);
                    break;
                case "UP":
                    this.player.moveY(-speed);
                    break;
                case "DOWN":
                    this.player.moveY(speed);
                    break;
                default:
                    break;
            }
        }

    }
}

class playerObject {
    constructor(options) {
        this.radius = options.radius || baseCircleRad;
        this.x = options.x || canvas.width/2;
        this.y = options.y || canvas.height/2;
        this.speed = options.speed || baseCircleSpeed;
    }
    
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        c.fillStyle = 'black';
        c.fill();
        
    }
    
    moveX(d) {
        this.x += d;
    }
    
    moveY(d) {
        this.y += d;
    }
}

class collectibleObject {
    constructor() {
        
    }
}