function createNSidedShape(n, step, target) {
	canvasContext.beginPath();
	
	canvasContext.moveTo(target.x + target.r * Math.sin(0), target.y - target.r * Math.cos(0));
	for(let i = 1; i <= n; i++) {
		canvasContext.lineTo(target.x + target.r * Math.sin(i * step * 2 * Math.PI / n),
							 target.y - target.r * Math.cos(i * step * 2 * Math.PI / n));
	}
	if(n == 6 && step == 2) {
		canvasContext.moveTo(target.x + target.r * Math.sin(0), target.y + target.r * Math.cos(0));
		for(let i = 1; i <= 3; i++) {
			canvasContext.lineTo(target.x + target.r * Math.sin(i * 2 * Math.PI / 3),
								 target.y + target.r * Math.cos(i * 2 * Math.PI / 3));
		}
	}

	canvasContext.fillStyle = target.color;
	canvasContext.fill();
	canvasContext.lineWidth = "1";
	canvasContext.stroke();
	
	canvasContext.closePath();
}
// TODO: consider this intersting shape:
//
//function createNSidedShape(n, step, target) {
//	canvasContext.beginPath();
//	
//	canvasContext.moveTo(target.x + target.r * Math.sin(0), target.y - target.r * Math.cos(0));
//	for(let i = 1; i <= n; i++) {
//		canvasContext.lineTo(target.x + target.r * Math.sin(i * step * 2 * Math.PI / n),
//							 target.y - target.r * Math.cos(i * step * 2 * Math.PI / n));
//	}
//	if(n == 6 && step == 2) {
//		canvasContext.moveTo(target.x + target.r * Math.sin(0), target.y + target.r * Math.cos(0));
//		for(let i = 1; i <= n; i++) {
//			canvasContext.lineTo(target.x + target.r * Math.sin(i * 2 * Math.PI / n),
//								 target.y + target.r * Math.cos(i * 2 * Math.PI / n));
//		}
//	}
//
//	canvasContext.fillStyle = target.color;
//	canvasContext.fill();
//	canvasContext.lineWidth = "1";
//	canvasContext.stroke();
//	
//	canvasContext.closePath();
//}

//TODO: draw more shapes
var possibleCollectibleShapes = {
	triangle: {
		points: 1,
		fn: function() {
			createNSidedShape(3, 1, this.paramsForForm);
		}
	},
	square: {
		points: 2,
		fn: function() {
			createNSidedShape(4, 1, this.paramsForForm);
		}
	},
	pentagon: {
		points: 3,
		fn: function() {
			createNSidedShape(5, 1, this.paramsForForm);
		}
	},
	hexagon: {
		points: 4,
		fn: function() {
			createNSidedShape(6, 1, this.paramsForForm);
		}
	},
	heptagon: {
		points: 5,
		fn: function() {
			createNSidedShape(7, 1, this.paramsForForm);
		}
	},
	octagon: {
		points: 6,
		fn: function() {
			createNSidedShape(8, 1, this.paramsForForm);
		}
	},
	nonagon: {
		points: 6,
		fn: function() {
			createNSidedShape(9, 1, this.paramsForForm);
		}
	},
	decagon: {
		points: 7,
		fn: function() {			
			createNSidedShape(10, 1, this.paramsForForm);
		}
	},
	pentagram: {
		points: 8,
		fn: function() {
			createNSidedShape(5, 2, this.paramsForForm);
		}
	},
	hexagram: {
		points: 25,
		fn: function() {
			createNSidedShape(6, 2, this.paramsForForm);
		}
	},
	heptagram: {
		points: 25,
		fn: function() {			
			createNSidedShape(7, 2, this.paramsForForm);
		}
	},
	octagram: {
		points: 25,
		fn: function() {			
			createNSidedShape(8, 3, this.paramsForForm);
		}
	},
	nonagram: {
		points: 25,
		fn: function() {			
			createNSidedShape(9, 2, this.paramsForForm);
		}
	},
	decagram: {
		points: 9,
		fn: function() {
			createNSidedShape(10, 3, this.paramsForForm);
		}
	}
};

function createGradiantAt(target, colorsToAdd) {
	let grad;
	if(target.type == "radial")
		grad = canvasContext.createRadialGradient(target.x, target.y, 0, target.x, target.y , target.r);
	else if(target.type == "linear") {
		grad = canvasContext.createLinearGradient(target.x, target.y, target.width, target.height);
		console.log(target);
		console.log(playerInput.mouseX + " " + playerInput.mouseY);
	}
	
	for(let color in colorsToAdd) {
		grad.addColorStop(colorsToAdd[color], color);
	}
	return grad;
}

var possibleCollectibleColor = {
	blue: {
		points: 1,
		color: "rgba(0, 0, 255, 1)"
	},
	red: {
		points: 2,
		color: "rgba(255, 0, 0, 1)"
	},
	yellow: {
		points: 3,
		color: "rgba(255, 255, 0, 1)"
	},
	purple: {
		points: 4,
		color: "rgba(100, 0, 255, 1)"
	},
	green: {
		points: 5,
		color: "rgba(0, 255, 0, 1)"
	},
	pink: {
		points: 6,
		color: "rgba(255, 51, 204, 1)"
	},
	gradiant: {
		points: 50,
		type: "gradient",
		color: function(params) {
			let colorsToAdd = {
				pink: 0,
				gray: 0.5,
				yellow: 1,
			};
			return createGradiantAt(params, colorsToAdd);
		}
	}
};