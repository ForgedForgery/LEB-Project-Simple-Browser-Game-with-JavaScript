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
