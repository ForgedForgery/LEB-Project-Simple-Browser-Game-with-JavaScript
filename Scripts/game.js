// game starts with this
function init() {
    game = new gameArea(800, 600);
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