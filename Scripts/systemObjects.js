class Input {
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
        return this.keysHeldDown;
    }
    
    setEvent(event, state) {
        let key = event.keyCode in this.possiblePlayerInput ?
                    this.possiblePlayerInput[event.keyCode] :
                    0;
        if (key != 0) {
            this.keysHeldDown[key] = state;
        }
    }
}