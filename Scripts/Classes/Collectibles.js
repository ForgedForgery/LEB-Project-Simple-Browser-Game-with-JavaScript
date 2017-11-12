var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var width = canvas.width;
var height= canvas.height;

export default class Collectibles {
    constructor() {
        this.triangleSwarm = new TriangleSwarm();
    }
    
    draw() {
        this.triangleSwarm.draw();
    }
    
    checkCollisionWith(obj) {
        this.triangleSwarm.checkCollisionWith(obj);
    }
}

export class TriangleSwarm {
    constructor() {
        this.list = this.spawn5ForTest();
    }
    
    draw() {
        for(let i in this.list) {
            this.list[i].draw();
        }
    }
        
    spawn5ForTest(){
        let list = [];
        let rx, ry, rr;
        for (let i = 0; i < 5; i++){
            rx = Math.random() * width;
            ry = Math.random() * height;
            rr = 15 + Math.random() * 50;
            list.push(new Triangle({
                x: rx,
                y: ry,
                r: rr
            }));
        }
        return list;
    }
    
    checkCollisionWith(obj) {
        for (let i in this.list) {
            if (this.list[i].isCollidedWith(obj)) {
                this.list.splice(i, 1);
            }
        }
    }
}

export class Triangle {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.r = options.r;
        this.hitbox = 0;
    }
    
    draw(){
        c.beginPath();
        c.moveTo(this.x - this.r/2, this.y + this.r/2);
        c.lineTo(this.x + this.r/2, this.y + this.r/2);
        c.lineTo(this.x, this.y - this.r/2);

        c.fillStyle = 'red';
        c.fill();
        c.closePath();
        
        //draw middle point
//        c.beginPath();
//        c.rect(obj.x, obj.y, 3, 3)
//        c.fillStyle = 'black';
//        c.fill();
//        c.closePath();
    }
    
    isCollidedWith(obj) {
        let dVector = {
            x: obj.x - this.x,
            y: obj.y - this.y,
        };
        let vLength = Math.sqrt(dVector.x**2 + dVector.y**2);
        if (vLength <= obj.radius + this.hitbox) {
            return true;
        }
        return false;
    }
    
    
}
