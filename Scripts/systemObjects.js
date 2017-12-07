// split input into mouse and keyboard

class Input {
    constructor() {
        this.keysHeldDown = {};
        this.possiblePlayerInput = {
            37: "LEFT",
            38: "UP",
            39: "RIGHT",
            40: "DOWN"
        }
        
        this.mouseX = 0;
        this.mouseY = 0;

        this.upClick = false;
        this.downClick = false;
        this.mouseHold = false;
        this.prevMouseHold = false;
    }
    
    update() {        
        if(this.mouseHold && !this.prevMouseHold) {
            this.downClick = true;
            this.prevMouseHold = true;
        } else {
            this.downClick = false;
        }
        if(!this.mouseHold && this.prevMouseHold) {
            this.upClick = true;
            this.prevMouseHold = false;
        } else {
            this.upClick = false;
        }
    }
    
    getKeysDown() {
        return this.keysHeldDown;
    }
    
    updateKeys(event, state) {
        let key = event.keyCode in this.possiblePlayerInput ?
                    this.possiblePlayerInput[event.keyCode] :
                    0;
        if (key != 0) {
            this.keysHeldDown[key] = state;
        }
    }
    
    updateMouse(e, state) {
        this.mouseHold = state;
    }
    
    updateMouseMove(e) {
        let rect = canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
    }
}