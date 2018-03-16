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
var radiusOffset1 = 25;
var possibleCollectibleShapes = {
	triangle: {
		points: 1,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(3, 1, _params); 
			});
		}
	},
	square: {
		points: 3,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(4, 1, _params); 
			});
		}
	},
	pentagon: {
		points: 6,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(5, 1, _params); 
			});
		}
	},
	hexagon: {
		points: 9,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(6, 1, _params); 
			});
		}
	},
	heptagon: {
		points: 12,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(7, 1, _params); 
			});
		}
	},
	octagon: {
		points: 15,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(8, 1, _params); 
			});
		}
	},
	nonagon: {
		points: 18,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(9, 1, _params); 
			});
		}
	},
	decagon: {
		points: 21,
		fn: function(_params) {			
			return (function() {
				drawNSidedShape(10, 1, _params); 
			});
		}
	},
	pentagongram: {
		points: 251,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(5, 1, _params); 
				drawNSidedShape(5, 2, _params); 
			});
		}
	},
	hexagongram: {
		points: 154,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(6, 1, _params); 
				drawNSidedShape(6, 2, _params); 
			});
		}
	},
	heptagongram: {
		points: 103,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(7, 1, _params); 
				drawNSidedShape(7, 2, _params); 
			});
		}
	},
	octagongram: {
		points: 69,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(8, 1, _params); 
				drawNSidedShape(8, 3, _params); 
			});
		}
	},
	nonagongram: {
		points: 46,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(9, 1, _params); 
				drawNSidedShape(9, 2, _params); 
			});
		}
	},
	decagongram: {
		points: 31,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(10, 1, _params); 
				drawNSidedShape(10, 3, _params); 
			});
		}
	},
	pentagram: {
		points: 1506,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(5, 2, _params); 
			});
		}
	},
	hexagram: {
		points: 1386,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(6, 2, _params); 
			});
		}
	},
	heptagram: {
		points: 1236,
		fn: function(_params) {			
			return (function() {
				drawNSidedShape(7, 2, _params); 
			});
		}
	},
	octagram: {
		points: 1035,
		fn: function(_params) {			
			return (function() {
				drawNSidedShape(8, 3, _params); 
			});
		}
	},
	nonagram: {
		points: 828,
		fn: function(_params) {			
			return (function() {
				drawNSidedShape(9, 2, _params); 
			});
		}
	},
	decagram: {
		points: 651,
		fn: function(_params) {
			return (function() {
				drawNSidedShape(10, 3, _params); 
			});
		}
	},
	trisaw: {
		points: 1903,
		fn: function(_params) {
			return (function() {
				drawNSidedDisksaw(3, _params);
			});
		},
		radius: radiusOffset1
	},
	tetrasaw: {
		points: 2321,
		fn: function(_params) {
			return (function() {
				drawNSidedDisksaw(4, _params);
			});
		},
		radius: radiusOffset1
	},
	pentasaw: {
		points: 2604,
		fn: function(_params) {
			return (function() {
				drawNSidedDisksaw(5, _params);
			});
		},
		radius: radiusOffset1
	},
	heptasaw: {
		points: 3312,
		fn: function(_params) {
			return (function() {
				drawNSidedDisksaw(6, _params);
			});
		},
		radius: radiusOffset1
	},
	hexasaw: {
		points: 4140,
		fn: function(_params) {
			return (function() {
				drawNSidedDisksaw(8, _params);
			});
		},
		radius: radiusOffset1
	},
	octasaw: {
		points: 4944,
		fn: function(_params) {
			return (function() {
				drawNSidedDisksaw(8, _params);
			});
		},
		radius: radiusOffset1
	},
	nonasaw: {
		points: 5544,
		fn: function(_params) {
			return (function() {
				drawNSidedDisksaw(9, _params);
			});
		},
		radius: radiusOffset1
	},
	decasaw: {
		points: 6042,
		fn: function(_params) {
			return (function() {
				drawNSidedDisksaw(10, _params);
			});
		},
		radius: radiusOffset1
	},
	tetradecasaw: {
		points: 6925,
		fn: function(_params) {
			return (function() {
				drawNSidedDisksaw(14, _params);
			});
		},
		radius: radiusOffset1
	},
	icosasaw: {
		points: 7734,
		fn: function(_params) {
			return (function() {
				drawNSidedDisksaw(20, _params);
			});
		},
		radius: radiusOffset1
	},
	moon: {
		points: 8531,
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
				
				canvasContext.bezierCurveTo(_params.x - _params.r * 0.5, _params.y - h + 3, 
											_params.x - _params.r * 0.5, _params.y + h - 3,
											x, y);
				
				fillStrokeShape(_params);
				
				canvasContext.closePath();
			});
		}
	},
	turkey: {
		points: 9312,
		fn: function(_params) {
			return (function() {
				canvasContext.beginPath();
				
				let h = _params.r * Math.sqrt(2);
				let x = h / 2 + _params.x;
				let y = h / 2 + _params.y;
		
				canvasContext.arc(_params.x, _params.y, _params.r, 0.25 * Math.PI, 1.75 * Math.PI);
				canvasContext.bezierCurveTo(_params.x - _params.r * 0.5, _params.y - h + 3, 
											_params.x - _params.r * 0.5, _params.y + h - 3,
											x, y);
				
				fillStrokeShape(_params);
				
				let starDimensions = {
					color: _params.color,
					x: _params.x + h * 0.4,
					y: _params.y,
					r: _params.r * 0.5
				};
				drawNSidedShape(5, 2, starDimensions);
				
				canvasContext.closePath();
			});
		}
	},
	weirdstar: {
		points: 10052,
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
		},
		radius: radiusOffset1
	}
};

function drawNSidedDisksaw(_n, _target) {
	canvasContext.beginPath();

	canvasContext.moveTo(_target.x, _target.y);
	for(let i = 1; i <= _n; i++) {
		canvasContext.lineTo(_target.x + _target.r * Math.sin(i * 2 * Math.PI / _n),
							 _target.y - _target.r * Math.cos(i * 2 * Math.PI / _n));
		canvasContext.lineTo(_target.x + _target.r / 2 * Math.sin(Math.PI * 0.5 + i * 2 * Math.PI / _n),
							 _target.y - _target.r / 2 * Math.cos(Math.PI * 0.5 + i * 2 * Math.PI / _n));
		canvasContext.lineTo(_target.x, _target.y);
	}


	fillStrokeShape(_target);

	canvasContext.closePath();
}