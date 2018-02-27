class SpawnCooldown {
	constructor() {
		this.timer = 0;
		this.maximum = 0;
	}
	
	//PUBLIC
	tick() {
		if(!this.isFinished())
			this.timer += deltaTime;
	}
	
	//PUBLIC
	isFinished() {
		return this.timer >= this.maximum;
	}
	
	//PUBLIC
	resetBasedOn(spawnAmount) {
		this.timer = 0;
		this.maximum = this.generateNewMaximum(spawnAmount);
	}
	
	//PUBLIC
	adjustTimerBasedOn(spawnAmount) {
		let previousPercentage = this.getPercentage();
		
		this.maximum = this.generateNewMaximum(spawnAmount);
		this.timer = this.maximum * previousPercentage;
	}
	
	getPercentage() {
		return this.timer / this.maximum;
	}
		
	generateNewMaximum(spawnAmount) {
		return Math.pow((spawnAmount), 2) / 12;
	}
}