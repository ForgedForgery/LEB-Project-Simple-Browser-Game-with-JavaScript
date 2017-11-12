import Screen from './Screen.js';
import Player from './Player.js';
import Collectibles from './Collectibles.js';
import SceneManager from './SceneManager.js';

export default class ResourceCollector {
    constructor(inWidth, inHeight, defaults, loadedData) {                
        let playerOptions =
            {
            name: loadedData.name,
            score: loadedData.score,
            radius: defaults.rad,
            speed:  defaults.speed
            };      
        
        // game elements
        this.player = new Player(playerOptions);
        this.collectibles = new Collectibles();
        // game systems
        this.screen = new Screen(inWidth, inHeight);
        this.scenes = new SceneManager(this.player, this.collectibles);
        
        //execute global update every 20ms
        this.interval;
    }
    
    update() {
        this.scenes.update();
    }
    
    draw() {
        this.screen.draw(this.scenes);
    }
}
