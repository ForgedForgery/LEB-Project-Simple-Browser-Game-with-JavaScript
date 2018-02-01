class Player {
    constructor(options) {
		this.input = options.input;
		
        this.radius = options.radius || baseCircleRad;
        this.x = options.x || width/2;
        this.y = options.y || height/2;
        this.speed = options.speed || baseCircleSpeed;
		
        this.name = options.name;
        this.score = options.score || 0;
    }
    
    draw() {
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        canvasContext.fillStyle = playerColor;
        canvasContext.fill();
        canvasContext.closePath();
    }
    
	updateLoadedData() {
		this.name = loadedPlayerData.name;
		this.score = loadedPlayerData.score;
	}
        
    update() {
        this.checkInput();
        this.checkOutOfBounds();
    }
    
    checkInput() {
        let speed = this.speed;
        	
		if(playerInput.KeyDown("LEFT"))
			this.moveX(-speed);
		if(playerInput.KeyDown("RIGHT"))
			this.moveX(speed);
		if(playerInput.KeyDown("UP"))
			this.moveY(-speed);
		if(playerInput.KeyDown("DOWN"))
			this.moveY(speed);
		
		if(playerInput.KeyDown("E"))
			this.increaseScoreByOne();
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