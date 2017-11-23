function titleUpdate(){
    c.beginPath();
    c.fillStyle = "black";
    c.strokeStyle = "blue";
    c.font = "40px Comic Sans MS";
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText('Resource Collector',400,100);
    c.closePath();   

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
}



// game starts with this
function init() {

}

// animations go in here, I think
function animate() {
    requestAnimationFrame(animate);  
    
}
var titlex = 100;
function update() {
    game.screen.clear();
    titleUpdate();
}

var game = new ResourceCollector(width, height);

// start game
init();
animate();
