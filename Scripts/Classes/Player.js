import Input from './Input.js';

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

export default class Player {
    constructor(options) {
        this.radius = options.radius;
        this.x = options.x || canvas.width/2;
        this.y = options.y || canvas.height/2;
        this.speed = options.speed;
        this.name = options.name;
        this.score = options.score || 0;
        
        this.controls = new Input();
    }
    
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        c.fillStyle = 'black';
        c.fill();
        c.closePath();
    }
    
    checkCollisionWith(obj) {
        obj.checkCollisionWith(this);
    }
        
    input() {
        let speed = this.speed;
        
        let keys = this.controls.getKeysDown();
        for (let k in keys) {
            if (keys[k]) {
                switch(k) {
                    case "LEFT":
                        this.moveX(-speed);
                        break;
                    case "RIGHT":
                        this.moveX(speed);
                        break;
                    case "UP":
                        this.moveY(-speed);
                        break;
                    case "DOWN":
                        this.moveY(speed);
                        break;
                    default:
                        break;
                }
            }
        }
    }
    
    moveX(d) {
        this.x += d;
    }
    
    moveY(d) {
        this.y += d;
    }
}