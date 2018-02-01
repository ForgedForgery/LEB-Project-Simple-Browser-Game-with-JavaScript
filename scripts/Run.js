// TODO: make isHovered functions follow DRY principle
function init() {	
    doLoadHighscore();
    loginForm = new LoginForm();
    playerInput = new Input();
    game = new ResourceCollector(width, height + heightUI, playerInput);
    updateHighscoreInterval = setInterval(doLoadHighscore, 5000);
}

function tick() {
    var now = (new Date).getTime();
    deltaTime = (now - lastTick) / 1000;
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