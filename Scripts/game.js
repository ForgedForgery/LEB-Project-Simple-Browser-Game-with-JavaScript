// game starts with this
function init() {
    //execute global update every 20ms
    game.interval = setInterval(update, 20);
    
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