// game starts with this
function init() {
    playerInput = new Input();
    game = new ResourceCollector();
    game.scenes.start(["title"]);
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