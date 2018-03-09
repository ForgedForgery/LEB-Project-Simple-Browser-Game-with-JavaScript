//TODO: 
//maybe add special patterns like bubbles 

// ranking of what looks better:
// radialLines > radialGradient > verticalLines > linearGradient
var possibleCollectiblePatterns = {
	solid: {
		points: 1,
		fn: function(_canvas, _context, _colorList) {
			_context.beginPath();
			_context.fillStyle = _colorList[0];
			_context.fillRect(0, 0, _canvas.width, _canvas.height);
			_context.closePath();
		}
	},
	verticalLines: {
		points: 10,
		fn: function(_canvas, _context, _colorList) {
			let maxColorIndex = _colorList.length;

			for(let colorIndex in _colorList) {
				_context.beginPath();
				_context.fillStyle = _colorList[colorIndex];
				
				_context.fillRect(0, 0, (1 - colorIndex / maxColorIndex) * _canvas.width, _canvas.height);
				
				_context.closePath();
			}
		}
	},
	radialLines: {
		points: 40,
		fn: function(_canvas, _context, _colorList) {
			let maxColorIndex = _colorList.length - 1;

			for(let colorIndex in _colorList) {
				_context.beginPath();
				
				colorIndex--;
				
				if(colorIndex == -1) {
					_context.fillStyle = _colorList[maxColorIndex--];
					_context.fillRect(0, 0, _canvas.width, _canvas.height);
				}
				else {
					_context.fillStyle = _colorList[maxColorIndex - colorIndex];
					
					let innerOffset = 0.25, outerOffset;
					switch (maxColorIndex) {
						case 0:
							innerOffset = 0.5;
							outerOffset = 0;
							break;
						case 1:
							outerOffset = 0.4;
							break;
						case 2:
							outerOffset = 0.3;
							break;
						case 3:
							outerOffset = 0.2;
							break;
						default:
							outerOffset = 0.1;
					}
					let circleFractionToDraw = maxColorIndex == 0 ? 1 : colorIndex / maxColorIndex;
					let arcRadius = _canvas.height / 2 * (1 - (outerOffset + circleFractionToDraw * (1 - outerOffset - innerOffset)));
					_context.arc(_canvas.width / 2, _canvas.height / 2, arcRadius, 0, 2 * Math.PI);
					_context.fill();
				}
				
				_context.closePath();
			}
		}
	},
    linearGradient: {
        points: 5,
        fn: function(_canvas, _context, _colorList) {
			let maxColorIndex = _colorList.length - 1;
            grad = _context.createLinearGradient(0, 0, _canvas.width, 0);
            for(let colorIndex in _colorList) {
                grad.addColorStop(0.15 + colorIndex / maxColorIndex * 0.7, _colorList[colorIndex]);
            }
            _context.fillStyle = grad;
            _context.fillRect(0, 0, _canvas.width, _canvas.height);
        }   
    },
    radialGradient: {
        points: 20,
        fn: function(_canvas, _context, _colorList) {
			let maxColorIndex = _colorList.length - 1;
            grad = _context.createRadialGradient(_canvas.width / 2, _canvas.height / 2, 0, _canvas.width / 2, _canvas.height / 2 , _canvas.height / 2);
            for(let colorIndex in _colorList) {
                grad.addColorStop(0.15 + colorIndex / maxColorIndex * 0.7, _colorList[colorIndex]);
            }
            _context.fillStyle = grad;
            _context.fillRect(0, 0, _canvas.width, _canvas.height);
        }
    },
	randomCircles: {
		points: 100,
		fn: function(_canvas, _context, _colorList) {
			let maxColorIndex = _colorList.length - 1;
			
			for(let colorIndex in _colorList) {
				_context.beginPath();
				
				if(colorIndex == 0) {
					_context.fillStyle = _colorList[maxColorIndex];
					_context.fillRect(0, 0, _canvas.width, _canvas.height);
				}
				else {
					_context.fillStyle = _colorList[colorIndex];
					let x = 0.25 * _canvas.width + Math.random() * _canvas.width * 0.5;
					let y = 0.25 * _canvas.height + Math.random() * _canvas.height * 0.5;
					let r = 2 + Math.random() * 5;
					_context.arc(x, y, r, 0, Math.PI * 2);
					_context.fill();
				}
				
				_context.closePath();
			}
		}
	}
	// small random stars, each with different colors
	// circles right next to each other
	// maybe a picture instead of colors? might just give set amount of color points
	// animated patterns?
};