class ResourceCollector {
    constructor(inWidth, inHeight, inPlayerInput) {  
        let playerOptions =
            {
			input: inPlayerInput,
            name: playerData.name,
            score: playerData.score
            //radius: 5,
            //speed: 1
            };
		
		this.input = inPlayerInput;
        
        this.player = new Player(playerOptions);
        this.progression = new ProgressionSystem(this.player);
        
        this.scenes = new SceneManager(this.player, this.progression);
        this.screen = new Screen(inWidth, inHeight, this.scenes);
    }
    
    update() {
        this.input.update();
        this.scenes.update();
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