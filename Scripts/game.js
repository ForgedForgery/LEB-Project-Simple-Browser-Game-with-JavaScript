// game starts with this
function init() {

}

// animations go in here, I think
function animate() {
    requestAnimationFrame(animate);  
    
}

function update() {
    game.update();
    game.draw();
}

var game = new ResourceCollector(width, height);
game.scenes.changeTo("Game");
// start game
init();
animate();
