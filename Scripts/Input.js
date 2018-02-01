// TODO: maybe split input into mouse and keyboard?
class Input {
    constructor() {
        this.keysHeldDown = {};
        this.possiblePlayerInput = {
            37: "LEFT",
            38: "UP",
            39: "RIGHT",
            40: "DOWN",
            69: "E"
        }
		this.resetIntervals = {};
        
        this.mouseX = 0;
        this.mouseY = 0;

        this.upClick = false;
        this.downClick = false;
        this.mouseHold = false;
        this.prevMouseHold = false;
		
		this.addEventListener();
    }
	
	addEventListener() {
		window.addEventListener('keydown',
			function (event) {
				playerInput.updateKeys(event, true);
			});
		window.addEventListener('keyup',
			function (event) {
				playerInput.updateKeys(event, false);
			});
		window.addEventListener('mousemove',
			function (event) {
				playerInput.updateMouseMove(event);
			});
		window.addEventListener('mouseup',
			function (event) {
				playerInput.updateMouse(event, false);
			});
		window.addEventListener('mousedown',
			function (event) {
				playerInput.updateMouse(event, true);
			});
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
	
	KeyDown(inKeyWord) {
		return this.keysHeldDown[inKeyWord];
	}
    
    updateKeys(event, state) {
        let keyWord = event.keyCode in this.possiblePlayerInput ?
                    this.possiblePlayerInput[event.keyCode] :
                    0;
        if (keyWord != 0) {
            this.keysHeldDown[keyWord] = state;
			
			if(state) {
				if(this.resetIntervals[keyWord])
					clearInterval(this.resetIntervals[keyWord]);
				this.resetIntervals[keyWord] = setInterval(() => {
					this.keysHeldDown[keyWord] = false;
					clearInterval(this.resetIntervals[keyWord]);
				}, 500);
        	}
    	}
	}
    
    updateMouse(e, state) {
        this.mouseHold = state;
    }
    
    updateMouseMove(e) {
        let rect = canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left - 4;
        this.mouseY = e.clientY - rect.top - 4;
    }
}