import * as AllScenes from './AllScenes.js';

export default class SceneManager {
    constructor(inPlayerReference, inCollectiblesReference) {
        this.currentScene = "None";
        this.allScenes = {
            //title: new TitleScene(),
            Game: new AllScenes.MainGame(inPlayerReference, inCollectiblesReference),
            //store: )
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
