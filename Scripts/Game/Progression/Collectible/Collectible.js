//TODO: maybe put color/pattern creation into level instead
// could create one pattern instance and use translate to draw it in the right place
class Collectible {
	constructor(_drawFn, _color, _dimensions) {
		let rx, ry, rr;
        rx = Math.random() * width;
        ry = Math.random() * height;
		rr = this.randomizeRadius();
		this.x = _dimensions.x || rx;
        this.y = _dimensions.y || ry;
        this.r = _dimensions.r || rr; // radius, also hitbox
        
        this.patternRotation = Math.random() * 360;
		
		this.points = 0;
		
		this.color = _color;
		this.draw = _drawFn({
			x: this.x,
			y: this.y,
			r: this.r,
            patternRotation: this.patternRotation,
			color: this.color
		});
	}
	
	randomizeRadius() {
        return 20 - 5 + Math.random() * 10;
    }
	
	isCollidedWith(obj) {
		let distance = this.getDistanceTo(obj);
		let collisionPoint = (obj.radius + this.r) * 0.9;
		return distance < collisionPoint;
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