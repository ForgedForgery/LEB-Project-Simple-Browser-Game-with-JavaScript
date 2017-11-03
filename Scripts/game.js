// game starts with this
function init() {
    var game = new GameArea(width, height);
}

// animations go in here, I think
function animate() {
    requestAnimationFrame(animate);  
    
}

function update() {
    game.update();
}

// start game
init();
animate();
