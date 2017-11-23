function titleUpdate(){
    c.fillStyle =  "black";
    c.strokeStyle = "blue";
    c.font = "20px Comic Sans MS";
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText('Resource Collector',400,100);
    
    /*var Button = function(config) 
    {
       this.x = config.x || 0;
        this.y = config.y || 0;
        this.width = config.width || 200;
        this.height = config.height || 75;
    };*/

    var Button = function(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.width = config.width || 150;
        this.height = config.height || 50;
        this.label = config.label || "Click";
        this.onClick = config.onClick || function() {};
    };

    Button.prototype.draw = function() {
        c.fillStyle(0, 234, 255);
        c.rect(this.x, this.y, this.width, this.height, 5);
        c.fillStyle(0, 0, 0);
        c.textSize(19);
        c.textAlign='middle';
        c.fillText(this.label, this.x+10, this.y+this.height/4);
    };

    Button.prototype.isMouseInside = function() {
        return mouseX > this.x &&
               mouseX < (this.x + this.width) &&
               mouseY > this.y &&
               mouseY < (this.y + this.height);
    };

    Button.prototype.handleMouseClick = function() {
        if (this.isMouseInside()) {
            this.onClick();
        }
    };

    var btn1 = new Button({
        x: 300,
        y: 200,
        label: "Please click!",
        onClick: function() {
            text("You made the right choice!", this.x, this.y+this.height);
        }
    });
    btn1.draw();


    var btn2 = new Button({
        x: 100,
        y: 213,
        width:50,
        height:50,
        label: "No! Click ME!",
        onClick: function() {
            text("Yay, you picked me!", this.x, this.y+this.height);
        }
    });
    btn2.draw();


    mouseClicked = function() {
        btn1.handleMouseClick();
        btn2.handleMouseClick();
    };    
};



// game starts with this
function init() {

}

// animations go in here, I think
function animate() {
    requestAnimationFrame(animate);  
    
}
var titlex = 100;
function update() {
    game.clear();
    titleUpdate();
}

var game = new GameArea(width, height);

// start game
init();
animate();
