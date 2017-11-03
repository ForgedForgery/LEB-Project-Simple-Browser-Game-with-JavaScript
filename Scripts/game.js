// game starts with this
function init() {

}

// animations go in here, I think
function animate() {
    requestAnimationFrame(animate);  
    
}

function update() {
    game.update();
}

var game = new GameArea(width, height);

// start game
init();
animate();
