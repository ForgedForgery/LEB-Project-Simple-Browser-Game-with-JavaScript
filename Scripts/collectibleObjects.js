var possibleCollectibleShapes = {
	triangle: {
		points: 3,
		fn: function() {
			canvasContext.beginPath();

			canvasContext.moveTo(this.x - this.r, this.y + this.r);
			canvasContext.lineTo(this.x + this.r, this.y + this.r);
			canvasContext.lineTo(this.x, this.y - this.r);

			canvasContext.fillStyle = this.color;
			canvasContext.fill();
			canvasContext.closePath();
		}
	},
	square: {
		points: 5,
		fn: function() {
			
		}
	}
};

var possibleCollectibleColor = {
	blue: {
		points: 1
	},
	red: {
		points: 2
	},
	yellow: {
		points: 3
	},
	purple: {
		points: 5
	}
};

class Collectible {
	constructor(shapeType, color, dimensions) {
		let rx, ry, rr;
        rx = Math.random() * width;
        ry = Math.random() * height;
		rr = this.randomizeRadius();
		this.x = dimensions.x || rx;
        this.y = dimensions.y || ry;
        this.r = dimensions.r || rr; // radius, also hitbox
		
		this.color = color;

		this.points = possibleCollectibleShapes[shapeType].points;
		this.points += possibleCollectibleColor[color].points
		
		this.draw = possibleCollectibleShapes[shapeType].fn;
	}
	
	randomizeRadius() {
        return 20 - 5 + Math.random() * 10;
    }
	
	isCollidedWith(obj) {
		let distance = this.getDistanceTo(obj);
		let maximumDistance = obj.radius + this.r;
        if(distance <= maximumDistance) {
            return true;
        }
        return false;
    }
	
	getDistanceTo(obj) {
		let dVector = {
            x: obj.x - this.x,
            y: obj.y - this.y
        };
        return Math.sqrt(dVector.x**2 + dVector.y**2);
	}
}


// TODO: add new forms

// ideas:
//  new BaseForm forms: triangle, square, pentagon, octagon, pentagram, hexagram, octagram, crescent
//                         expand/shrink, rotates
//  colors gotten from gambling: rainbow gradient, gradients, blinking, pulse
//  colors for normal levels: plain colors, maybe dual colored
//  challenging mechanics: running away, collecting at the right time (pulsing object influences speed depending on timing for a bit), players needs to have correct color
		// pentagram draw method:
		// step = 2 * Math.PI / 5
		// this.x + this.r * Math.cos(start + step * i)