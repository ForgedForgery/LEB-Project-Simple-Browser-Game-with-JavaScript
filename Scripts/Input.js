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
        
        this.mouseX = 0;
        this.mouseY = 0;

        this.upClick = false;
        this.downClick = false;
        this.mouseHold = false;
        this.prevMouseHold = false;
		
		this.addEventListener();
    }
	
	isMouseInside(inX, inY, inWidth, inHeight) {
		return 	inX < this.mouseX && this.mouseX < inX + inWidth &&
            	inY < this.mouseY && this.mouseY < inY + inHeight;
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
        if (keyWord != 0)
            this.keysHeldDown[keyWord] = state;
	}
    
    updateMouse(e, state) {
        this.mouseHold = state;
    }
    
    updateMouseMove(e) {
        let rect = canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left - 4;
        this.mouseY = e.clientY - rect.top - 4;
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
}