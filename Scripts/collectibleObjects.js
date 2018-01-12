class Collectible {
	constructor(options) {
		this.x = options.x;
        this.y = options.y;
        this.r = options.r; // radius, also hitbox
		this.pointsGiven = options.pointsGiven;
	}
	
	draw() {
		
	}
	
	isCollidedWith(obj) {
        let dVector = {
            x: obj.x - this.x,
            y: obj.y - this.y
        };
        let vectorLength = Math.sqrt(dVector.x**2 + dVector.y**2);
        if(vectorLength <= obj.radius + this.r) {
            return true;
        }
        return false;
    }
}

class Triangle extends Collectible {
    constructor(options) {
		super(options);
		this.color = options.color;
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
