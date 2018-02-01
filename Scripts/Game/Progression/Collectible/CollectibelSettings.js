//TODO: draw more shapes
var possibleCollectibleShapes = {
	triangle: {
		points: 1,
		fn: function() {
			canvasContext.beginPath();

			canvasContext.moveTo(this.x - this.r, this.y + this.r);
			canvasContext.lineTo(this.x + this.r, this.y + this.r);
			canvasContext.lineTo(this.x, this.y - this.r);
			canvasContext.lineTo(this.x - this.r, this.y + this.r);

			canvasContext.fillStyle = this.color;
			canvasContext.fill();
			canvasContext.lineWidth = "1";
			canvasContext.stroke();
			
			canvasContext.closePath();
		}
	},
	square: {
		points: 5,
		fn: function() {
			canvasContext.beginPath();

			canvasContext.moveTo(this.x - this.r, this.y + this.r);
			canvasContext.lineTo(this.x + this.r, this.y + this.r);
			canvasContext.lineTo(this.x + this.r, this.y - this.r);
			canvasContext.lineTo(this.x - this.r, this.y - this.r);
			canvasContext.lineTo(this.x - this.r, this.y + this.r);

			canvasContext.fillStyle = this.color;
			canvasContext.fill();
			canvasContext.lineWidth = "1";
			canvasContext.stroke();
			
			canvasContext.closePath();
		}
	},
	pentagon: {
		points: 10,
		fn: function() {
			canvasContext.beginPath();
			
			canvasContext.moveTo(this.x + this.r * Math.sin(0), this.y - this.r * Math.cos(0));
			for(let i = 1; i <= 5; i++) {
				canvasContext.lineTo(this.x + this.r * Math.sin(i * 2 * Math.PI / 5),
									 this.y - this.r * Math.cos(i * 2 * Math.PI / 5));
			}
			
			canvasContext.fillStyle = this.color;
			canvasContext.fill();
			canvasContext.lineWidth = "1";
			canvasContext.stroke();
			
			canvasContext.closePath();
		}
	},
	octagon: {
		points: 15,
		fn: function() {
			canvasContext.beginPath();
			
			canvasContext.moveTo(this.x + this.r * Math.sin(0), this.y - this.r * Math.cos(0));
			for(let i = 1; i <= 8; i++) {
				canvasContext.lineTo(this.x + this.r * Math.sin(i * 2 * Math.PI / 8),
									 this.y - this.r * Math.cos(i * 2 * Math.PI / 8));
			}
			
			canvasContext.fillStyle = this.color;
			canvasContext.fill();
			canvasContext.lineWidth = "1";
			canvasContext.stroke();
			
			canvasContext.closePath();
		}
	},
	decagon: {
		points: 30,
		fn: function() {
			canvasContext.beginPath();
			
			canvasContext.moveTo(this.x + this.r * Math.sin(0), this.y - this.r * Math.cos(0));
			for(let i = 1; i <= 10; i++) {
				canvasContext.lineTo(this.x + this.r * Math.sin(i * 2 * Math.PI / 10),
									 this.y - this.r * Math.cos(i * 2 * Math.PI / 10));
			}
			
			canvasContext.fillStyle = this.color;
			canvasContext.fill();
			canvasContext.lineWidth = "1";
			canvasContext.stroke();
			
			canvasContext.closePath();
		}
	},
	pentagram: {
		points: 20,
		fn: function() {
			canvasContext.beginPath();
			
			canvasContext.moveTo(this.x + this.r * Math.sin(0), this.y - this.r * Math.cos(0));
			for(let i = 1; i <= 5; i++) {
				canvasContext.lineTo(this.x + this.r * Math.sin(i * 2 * 2 * Math.PI / 5),
									 this.y - this.r * Math.cos(i * 2 * 2 * Math.PI / 5));
			}
			
			canvasContext.fillStyle = this.color;
			canvasContext.fill();
			canvasContext.lineWidth = "1";
			canvasContext.stroke();
			
			canvasContext.closePath();
		}
	},
	hexagram: {
		points: 25,
		fn: function() {
			canvasContext.beginPath();
			
			canvasContext.moveTo(this.x + this.r * Math.sin(0), this.y - this.r * Math.cos(0));
			for(let i = 1; i <= 3; i++) {
				canvasContext.lineTo(this.x + this.r * Math.sin(i * 2 * Math.PI / 3),
									 this.y - this.r * Math.cos(i * 2 * Math.PI / 3));
			}
			
			canvasContext.fillStyle = this.color;
			canvasContext.lineWidth = "1";
			canvasContext.fill();
			canvasContext.stroke();
			
			canvasContext.moveTo(this.x + this.r * Math.sin(0), this.y + this.r * Math.cos(0));
			for(let i = 1; i <= 3; i++) {
				canvasContext.lineTo(this.x + this.r * Math.sin(i * 2 * Math.PI / 3),
									 this.y + this.r * Math.cos(i * 2 * Math.PI / 3));
			}
			canvasContext.fill();
			canvasContext.stroke();
			
			canvasContext.closePath();
		}
	},
	decagram: {
		points: 30,
		fn: function() {
			canvasContext.beginPath();
			
			canvasContext.moveTo(this.x + this.r * Math.sin(0), this.y - this.r * Math.cos(0));
			for(let i = 1; i <= 10; i++) {
				canvasContext.lineTo(this.x + this.r * Math.sin(i * 3 * 2 * Math.PI / 10),
									 this.y - this.r * Math.cos(i * 3 * 2 * Math.PI / 10));
			}
			
			canvasContext.fillStyle = this.color;
			canvasContext.fill();
			canvasContext.lineWidth = "1";
			canvasContext.stroke();
			
			canvasContext.closePath();
		}
	}
};

var possibleCollectibleColor = {
	blue: {
		points: 1,
		color: "rgba(0, 0, 255, 0.8)"
	},
	red: {
		points: 2,
		color: "rgba(255, 0, 0, 0.8)"
	},
	yellow: {
		points: 3,
		color: "rgba(255, 255, 0, 0.8)"
	},
	purple: {
		points: 4,
		color: "rgba(100, 0, 255, 0.8)"
	},
	green: {
		points: 5,
		color: "rgba(0, 255, 0, 0.8)"
	},
	pink: {
		points: 6,
		color: "rgba(255, 51, 204, 0.8)"
	}
};