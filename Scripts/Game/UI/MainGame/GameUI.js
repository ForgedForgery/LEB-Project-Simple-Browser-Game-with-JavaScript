class GameUI {
    constructor(inPlayerReference, inProgressionReference) {
        this.x = 0;
        this.y = height;
        this.width = width;
        this.height = heightUI;
        
        this.player = inPlayerReference;
        this.progression = inProgressionReference;
        
        this.createMenuObjects();
        
        this.spawnCooldownBars = [];
		
		this.activeBarDetails;
    }
    
    createMenuObjects() {
        this.saveButton = new Button({
            x: this.x + 769,
            y: this.y + 25,
            width: 38,
            height: 40,
            label: disketteImg,
            fontSize: "17px",
			affectedReference: this.player,
            onClick: (function(_player, _progression) {
				return function() {
					doSave(_player, _progression);
				}
			})(this.player, this.progression),
            shadowBlur: 5,
            shadowBlurText: 5
        });
        
        this.shopButton = new Button({
            x: this.x + 680,
            y: this.y + 25,
            width: 100,
            label: "Shop",
            fontSize: "20px",
            shadowBlur: 5,
            shadowBlurText: 5,
            onClick: function() {
                    //game.scenes.changeTo("store");
            }
        });
        
        this.playerNameField = new TextField({
            x: this.x + 10,
            y: this.y + 13,
            text: this.player.name,
            align: 'left',
            shadowBlur: 5
        });
                
        this.playerScorePreField = new TextField({
            x: this.x + 10,
            y: this.y + 38,
            text: "Score: ",
            align: 'left',
            shadowBlur: 5
        });
        
        this.playerScoreField = new TextField({
            x: this.x + 75,
            y: this.y + 37.5,
            color: playerScoreFieldColor,
            text: this.player.score,
            align: 'left'
        }); 
    }
    
    update() {
		this.checkIfNewBar();		
        this.saveButton.update();
        this.shopButton.update();
        this.playerNameField.setTextTo(this.player.name);
        this.playerScoreField.setTextTo(this.player.score);
		for(let i = 0; i < this.spawnCooldownBars.length; i++)
            this.spawnCooldownBars[i].update();
    }
	
	checkIfNewBar() {
		let amountToAdd = this.progression.activeLevels.length - this.spawnCooldownBars.length;
		while(amountToAdd > 0) {
			this.addNewCooldownBar();
			amountToAdd--;
		}
	}
	
	addNewCooldownBar() {
			this.spawnCooldownBars.push(new CooldownBar({
				x: width - 300 - (this.spawnCooldownBars.length * 20),
				y: height + 5,
				levelInstance: this.progression.activeLevels[this.spawnCooldownBars.length]
			}));
	}
    
    draw() {
        this.drawBackground();
        this.playerNameField.draw();
        this.playerScoreField.draw();
        this.playerScorePreField.draw();
        this.saveButton.draw();
        this.shopButton.draw();
		this.drawBars();
	}
    
    drawBackground() {
        canvasContext.beginPath();
        canvasContext.rect(this.x, this.y, this.width, this.height);
        canvasContext.fillStyle = gameUIColor;
        canvasContext.fill();
        canvasContext.closePath();
    }
	
	drawBars() {
		this.activeBarDetails = null;
        for(let i = 0; i < this.spawnCooldownBars.length; i++) {
			if(this.spawnCooldownBars[i].detailPanel.active)
				this.activeBarDetails = this.spawnCooldownBars[i].detailPanel;
            this.spawnCooldownBars[i].draw();
		}
		if(this.activeBarDetails)
			this.activeBarDetails.draw();
	}
  
//might be useful somewhere else 
//draws a circular timer
//    drawCircleCooldown() {
//        canvasContext.beginPath();
//        canvasContext.moveTo(this.x + 80, this.y + 13);
//        canvasContext.arc(this.x + 80, this.y + 13, 10, -(Math.PI / 2), (Math.PI * 2 * this.progression.counter / this.progression.spawnTime) - Math.PI / 2);
//        canvasContext.lineTo(this.x + 80, this.y + 13);
//        canvasContext.fillStyle = textFieldSideColor;
//        canvasContext.fill();
//        canvasContext.strokeStyle = playerScoreFieldColor;
//        canvasContext.lineWidth = 1;
//        canvasContext.stroke();
//        canvasContext.closePath();
//    }
	
}