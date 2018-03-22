class ResourceCollector {
    constructor(inWidth, inHeight, inPlayerInput) {  
        let playerOptions =
            {
			input: inPlayerInput,
            name: loadedPlayerData.name,
            score: loadedPlayerData.score
            };
		
		this.input = inPlayerInput;
        
        this.player = new Player(playerOptions);
        this.progression = new ProgressionSystem(this.player);
        
        this.scenes = new SceneManager(this.player, this.progression);
        this.screen = new Screen(inWidth, inHeight, this.scenes);
		
		this.saveTimer = 0;
    }
    
    update() {
        this.input.update();
        this.scenes.update();
		//this.savePeriodically();
    }
	
    savePeriodically() {
		this.saveTimer += deltaTime;
		if(this.saveTimer > 10) {
			doSave(this.player, this.progression);
			this.saveTimer = 0;
		}
	}
    
    draw() {
        this.screen.draw();
    }
}

class Screen {
    constructor(inWidth, inHeight, inSceneReference) {
        canvas.width = inWidth;
        canvas.height = inHeight;
        this.scenes = inSceneReference;
    }
    
    draw() {
        this.clear();
        this.scenes.draw();
    }
        
    clear() {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    }
}
