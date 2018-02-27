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
	
	// offset vars
	var offset_x = target.x - target.r;
	var offset_y = target.y - target.r;
    var offset_r = target.patternRotation;

	// offset
	canvasContext.translate(offset_x, offset_y);

	// draw
	canvasContext.fillStyle = target.color;
	canvasContext.fill();
    
	//canvasContext.translate(target.r, target.r);
    //canvasContext.rotate(target.patternRotation);

	// undo offset
    canvasContext.setTransform(1, 0, 0, 1, 0, 0);
	
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
//TODO: maybe you could just add stuff like 3 for corners and 1 for steps to draw and create the draw methods somewhere else like in Collectibles.js
var possibleCollectibleShapes = {
	triangle: {
		points: 1,
		fn: function(_params) {
			return (function() {
				createNSidedShape(3, 1, _params); 
			});
		}
	},
	square: {
		points: 2,
		fn: function(_params) {
			return (function() {
				createNSidedShape(4, 1, _params); 
			});
		}
	},
	pentagon: {
		points: 3,
		fn: function(_params) {
			return (function() {
				createNSidedShape(5, 1, _params); 
			});
		}
	},
	hexagon: {
		points: 4,
		fn: function(_params) {
			return (function() {
				createNSidedShape(6, 1, _params); 
			});
		}
	},
	heptagon: {
		points: 5,
		fn: function(_params) {
			return (function() {
				createNSidedShape(7, 1, _params); 
			});
		}
	},
	octagon: {
		points: 6,
		fn: function(_params) {
			return (function() {
				createNSidedShape(8, 1, _params); 
			});
		}
	},
	nonagon: {
		points: 6,
		fn: function(_params) {
			return (function() {
				createNSidedShape(9, 1, _params); 
			});
		}
	},
	decagon: {
		points: 7,
		fn: function(_params) {			
			return (function() {
				createNSidedShape(10, 1, _params); 
			});
		}
	},
	pentagram: {
		points: 8,
		fn: function(_params) {
			return (function() {
				createNSidedShape(5, 2, _params); 
			});
		}
	},
	hexagram: {
		points: 25,
		fn: function(_params) {
			return (function() {
				createNSidedShape(6, 2, _params); 
			});
		}
	},
	heptagram: {
		points: 25,
		fn: function(_params) {			
			return (function() {
				createNSidedShape(7, 2, _params); 
			});
		}
	},
	octagram: {
		points: 25,
		fn: function(_params) {			
			return (function() {
				createNSidedShape(8, 3, _params); 
			});
		}
	},
	nonagram: {
		points: 25,
		fn: function(_params) {			
			return (function() {
				createNSidedShape(9, 2, _params); 
			});
		}
	},
	decagram: {
		points: 9,
		fn: function(_params) {
			return (function() {
				createNSidedShape(10, 3, _params); 
			});
		}
	}
};