var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

export default class Screen {
    constructor(inWidth, inHeight) {
        canvas.width  = inWidth;
        canvas.height  = inHeight;
    }
    
    draw(obj) {
        this.clear();
        obj.draw();
    }
        
    clear() {
        c.clearRect(0, 0, canvas.width, canvas.height);
    }
}