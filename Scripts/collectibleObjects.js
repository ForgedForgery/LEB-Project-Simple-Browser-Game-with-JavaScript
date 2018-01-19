class Collectible {
	constructor(options) {
		let rx, ry, rr;
        rx = Math.random() * width;
        ry = Math.random() * height;
		rr = this.randomizeRadius();
		this.x = options.x || rx;
        this.y = options.y || ry;
        this.r = options.r || rr; // radius, also hitbox
		this.color = options.color;
		this.pointsGiven = options.pointsGiven;
	}
	
	randomizeRadius() {
        return 20 - 5 + Math.random() * 10;
    }
	
	draw() {
		
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
        let vectorLength = Math.sqrt(dVector.x**2 + dVector.y**2);
	}
}

class Triangle extends Collectible {
    constructor(options) {
		super(options);
    }
    
    draw(){
        canvasContext.beginPath();
		
        canvasContext.moveTo(this.x - this.r, this.y + this.r);
        canvasContext.lineTo(this.x + this.r, this.y + this.r);
        canvasContext.lineTo(this.x, this.y - this.r);

        canvasContext.fillStyle = this.color;
        canvasContext.fill();
        canvasContext.closePath();

        //draw middle point
//        canvasContext.beginPath();
//        canvasContext.rect(obj.x, obj.y, 3, 3)
//        canvasContext.fillStyle = 'black';
//        canvasContext.fill();
//        canvasContext.closePath();
    }
}

// TODO: add new forms

// ideas:
//  new collectible forms: triangle, square, pentagon, octagon, pentagram, hexagram, octagram, crescent
//                         expand/shrink, rotates
//  colors gotten from gambling: rainbow gradient, gradients, blinking, pulse
//  colors for normal levels: plain colors, maybe dual colored
//  challenging mechanics: running away, collecting at the right time (pulsing object influences speed depending on timing for a bit), players needs to have correct color

class Square extends Collectible {
	construtor(options) {
		//super(options);
		
	}
	
	draw() {
		
	}
}

class Pentagon extends Collectible {
	construtor(options) {
		//super(options);
	}
	
	draw() {
		// step = 2 * Math.PI / 5
		// this.x + this.r * Math.cos(start + step * i)
	}
}