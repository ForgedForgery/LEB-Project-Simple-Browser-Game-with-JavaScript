//TODO: finish this function
function createPatternWithCanvas(_width, _height, _colorList, _drawPattern) {
	let tempCanvas = document.createElement('canvas');
	let tempContext = tempCanvas.getContext('2d');
	tempCanvas.width = _width;
	tempCanvas.height = _height;
	
	tempContext.beginPath();
	_drawPattern(tempCanvas, tempContext, _colorList);
	tempContext.closePath();
	
	let pattern = canvasContext.createPattern(tempCanvas, "no-repeat");
	return pattern;
}

//TODO: split the pattern from color into this
//maybe split into stripes and circles
//maybe add special patterns like bubbles 
var possibleCollectiblePatterns = {
	verticalLines: {
		points: 40,
		fn: function(_canvas, _context, _colorList) {
			let currentColorIndex = _colorList.length;

			for(let c in _colorList) {
				_context.beginPath();
				_context.fillStyle = _colorList[c];
				_context.fillRect(0, 0, currentColorIndex-- * (_canvas.width / _colorList.length), _canvas.height);
				_context.closePath();
			}
		}
	},
};

//var drawPattern = {
//	striped: function(_colorList) {
//		let colorLength = Object.keys(_colorsToAdd).length;
//		let i = colorLength;
//		
//		for(let c in _colorsToAdd) {
//			solidContext.beginPath();
//			solidContext.fillStyle = c;
//			solidContext.fillRect(0, 0, i-- * (solidCanvas.width / colorLength), solidCanvas.height);
//			solidContext.closePath();
//		}
//	}
//};
	

//TODO: delete this when done with top function
function createMultipleSolidAt(_target, _colorsToAdd) {
	let solidCanvas = document.createElement('canvas');
	let solidContext = solidCanvas.getContext('2d');
	
	if(_target.type == "radial") {
		solidCanvas.width = _target.r * 2;
		solidCanvas.height = _target.r * 2;
		
		for(let c in _colorsToAdd) {
			solidContext.beginPath();
			solidContext.arc(solidCanvas.width / 2, solidCanvas.height / 2, solidCanvas.height/2 * _colorsToAdd[c], 0, 2 * Math.PI)
			solidContext.fillStyle = c;
			solidContext.fill();
			solidContext.closePath();
		}
	} else if(_target.type == "linear") {
		solidCanvas.width = _target.width;
		solidCanvas.height = _target.height;
		let colorLength = Object.keys(_colorsToAdd).length;
		let i = colorLength;
		
		for(let c in _colorsToAdd) {
			solidContext.beginPath();
			solidContext.fillStyle = c;
			solidContext.fillRect(0, 0, i-- * (solidCanvas.width / colorLength), solidCanvas.height);
			solidContext.closePath();
		}
	}
	let pattern = canvasContext.createPattern(solidCanvas, "repeat");
	return pattern;
}
	
function createGradiantAt(_target, _colorsToAdd) {
	let grad;
	if(_target.type == "radial") {
		grad = canvasContext.createRadialGradient(_target.r, _target.r, 0, _target.r, _target.r , _target.r);
	} else if(_target.type == "linear") {
		grad = canvasContext.createLinearGradient(0, 0, _target.width, 0);
	}
	
	for(let c in _colorsToAdd) {
		grad.addColorStop(_colorsToAdd[c], c);
	}
	return grad;
}

