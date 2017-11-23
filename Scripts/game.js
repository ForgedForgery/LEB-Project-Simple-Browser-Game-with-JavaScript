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
        width: 250,
        label: "Please click!",
        fontSize: "40px",
        fontType: "Arial",
        onClick: function() {
            text("You made the right choice!", this.x, this.y+this.height);
        }
    });
    btn1.draw();
    btn1.handelMouseClick();
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
