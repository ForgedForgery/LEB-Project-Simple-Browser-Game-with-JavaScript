class Collectible {
	constructor(formProperties, colorProperties, dimensions) {
		let rx, ry, rr;
        rx = Math.random() * width;
        ry = Math.random() * height;
		rr = this.randomizeRadius();
		this.x = dimensions.x || rx;
        this.y = dimensions.y || ry;
        this.r = dimensions.r || rr; // radius, also hitbox
		
		this.color = colorProperties.color;
		
		this.points = 0;
		this.points += formProperties.points;
		this.points += colorProperties.points
		
		this.draw = formProperties.fn;
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