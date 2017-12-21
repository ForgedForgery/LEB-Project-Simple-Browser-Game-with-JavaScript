// game starts with this
function init() {
    loginForm = new LoginForm();
    playerInput = new Input();
    game = new ResourceCollector();
    game.scenes.start(["title"]);
}

// animations go in here, I think
function tick() {
    var now = (new Date).getTime(); // current time in ms
    deltaTime = now - lastTick; // amount of time elapsed since last tick
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