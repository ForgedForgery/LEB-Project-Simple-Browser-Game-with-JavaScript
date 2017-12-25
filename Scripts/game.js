// game starts with this
function init() {
    loginForm = new LoginForm();
    playerInput = new Input();
    game = new ResourceCollector();
}

// animations go in here, I think
function tick() {
    var now = (new Date).getTime(); // current time in ms
    deltaTime = (now - lastTick) / 1000; // amount of time elapsed since last tick in seconds
    lastTick = now;
    
    update();
    
    window.requestAnimationFrame(tick);  
}

function update() {
    game.update();
    game.draw();
}

// start game
init();
tick();