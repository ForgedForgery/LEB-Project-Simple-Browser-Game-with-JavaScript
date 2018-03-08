function drawNSidedShape(_n, step, target) {
	canvasContext.beginPath();
	
	if(_n == 6 && step == 2) {
		canvasContext.moveTo(target.x + target.r * Math.sin(0), target.y + target.r * Math.cos(0));
		for(let i = 1; i <= 3; i++) {
			canvasContext.lineTo(target.x + target.r * Math.sin(i * 2 * Math.PI / 3),
								 target.y + target.r * Math.cos(i * 2 * Math.PI / 3));
		}
        _n = 3;
	}
    
    canvasContext.moveTo(target.x + target.r * Math.sin(0), target.y - target.r * Math.cos(0));
    for(let i = 1; i <= _n; i++) {
        canvasContext.lineTo(target.x + target.r * Math.sin(i * step * 2 * Math.PI / _n),
                             target.y - target.r * Math.cos(i * step * 2 * Math.PI / _n));
    }

	fillStrokeShape(target);
	
	canvasContext.closePath();
};

function fillStrokeShape(target) {
	
	canvasContext.fillStyle = target.color;
	
	// offset vars
	var offset_x = target.x - target.r;
	var offset_y = target.y - target.r;
    var offset_r = target.patternRotation; // needs to rotate at pattern creation

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
};
// TODO: consider this intersting shape:
//
//function drawNSidedShape(n, step, target) {
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
		points: 3,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(3, 1, _params); 
			});
		}
	},
	square: {
		points: 4,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(4, 1, _params); 
			});
		}
	},
	pentagon: {
		points: 5,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(5, 1, _params); 
			});
		}
	},
	hexagon: {
		points: 6,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(6, 1, _params); 
			});
		}
	},
	heptagon: {
		points: 7,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(7, 1, _params); 
			});
		}
	},
	octagon: {
		points: 8,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(8, 1, _params); 
			});
		}
	},
	nonagon: {
		points: 9,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(9, 1, _params); 
			});
		}
	},
	decagon: {
		points: 10,
		fn: function(_params) {			
			return (function() {
				drawNSidedShape(10, 1, _params); 
			});
		}
	},
	pentagram: {
		points: 5000000,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(5, 2, _params); 
			});
		}
	},
	hexagram: {
		points: 600000,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(6, 2, _params); 
			});
		}
	},
	heptagram: {
		points: 70000,
		fn: function(_params) {			
			return (function() {
				drawNSidedShape(7, 2, _params); 
			});
		}
	},
	octagram: {
		points: 8000,
		fn: function(_params) {			
			return (function() {
				drawNSidedShape(8, 3, _params); 
			});
		}
	},
	nonagram: {
		points: 900,
		fn: function(_params) {			
			return (function() {
				drawNSidedShape(9, 2, _params); 
			});
		}
	},
	decagram: {
		points: 100,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(10, 3, _params); 
			});
		}
	},
	decagramgon: {
		points: 100,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(10, 1, _params); 
				drawNSidedShape(10, 3, _params); 
			});
		}
	},
	moon: {
		points: 1000000000,
		fn: function(_params) {
			return (function() {
				canvasContext.beginPath();
				
				let h = _params.r * Math.sqrt(2);
				let x = h / 2 + _params.x;
				let y = h / 2 + _params.y;
		
				canvasContext.arc(_params.x, _params.y, _params.r, 0.25 * Math.PI, 1.75 * Math.PI);
//				canvasContext.arcTo(_params.x, _params.y, x, y, _params.r * 1);
//				canvasContext.arc(_params.x, _params.y, _params.r, 1.25 * Math.PI, 1.75 * Math.PI);
//				y = h / 2 + _params.y;
//				x = h / 2 + _params.x;
//				canvasContext.arcTo(_params.x, _params.y, x, y, _params.r * 1);
				
//				canvasContext.quadraticCurveTo(_params.x - 10, _params.y - h, _params.x - 10, _params.y);
//				canvasContext.quadraticCurveTo(_params.x - 10, _params.y + h, x, y);
				
				canvasContext.bezierCurveTo(_params.x - _params.r, _params.y - h, 
											_params.x - _params.r, _params.y + h,
											x, y);
				
				fillStrokeShape(_params);
				
				canvasContext.closePath();
			});
		}
	},
	weirdstar: {
		points: 100000,
		fn: function(_params) {
			return (function() {
				canvasContext.beginPath();
	
				canvasContext.moveTo(_params.x, _params.y);
				let _n = 11;
				for(let i = 1; i <= _n; i++) {
					canvasContext.lineTo(_params.x + _params.r * Math.sin(i * 2 * Math.PI / _n),
										 _params.y - _params.r * Math.cos(i * 2 * Math.PI / _n));
					canvasContext.lineTo(_params.x + _params.r / 2 * Math.cos(i * 2 * Math.PI / _n),
										 _params.y - _params.r / 2 * Math.sin(i * 2 * Math.PI / _n));
					canvasContext.lineTo(_params.x, _params.y);
				
				}

				fillStrokeShape(_params);
				
				canvasContext.closePath();
			});
		}
	},
	disksaw: {
		points: 100000,
		fn: function(_params) {
			return (function() {
				canvasContext.beginPath();
	
				canvasContext.moveTo(_params.x, _params.y);
				let _n = 5;
				for(let i = 1; i <= _n; i++) {
					canvasContext.lineTo(_params.x + _params.r * Math.sin(i * 2 * Math.PI / _n),
										 _params.y - _params.r * Math.cos(i * 2 * Math.PI / _n));
					canvasContext.lineTo(_params.x + _params.r / 2 * Math.sin(Math.PI * 0.5 + i * 2 * Math.PI / _n),
										 _params.y - _params.r / 2 * Math.cos(Math.PI * 0.5 + i * 2 * Math.PI / _n));
					canvasContext.lineTo(_params.x, _params.y);
				}
				

				fillStrokeShape(_params);
				
				canvasContext.closePath();
			});
		}
	}
};