var game;

// game starts with this
function init() {
    game = new ResourceCollector(width, height);
    game.scenes.changeTo("Game");
}

// animations go in here, I think
function animate() {
    requestAnimationFrame(animate);  
    
}

function update() {
    game.update();
    game.draw();
}

// start game
init();
animate();
