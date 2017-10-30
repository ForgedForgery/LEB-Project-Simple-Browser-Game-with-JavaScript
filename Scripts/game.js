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

// start game
init();
animate();