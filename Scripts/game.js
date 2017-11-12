import ResourceCollector from './Classes/ResourceCollector.js';

const baseCircleSpeed = 2;
const baseCircleRad = 20;
const width = 800;
const height = 600;
const framesPerSecond = 60;

const defaults = {
    speed: baseCircleSpeed,
    rad: baseCircleRad,
    fps: framesPerSecond
}
const playerData = {
    name: "Guest",
    score: 0
}

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var game;

//key events
window.addEventListener('keydown',
    function (event) {
        game.player.controls.setEvent(event, true);
    });
window.addEventListener('keyup',
    function (event) {
        game.player.controls.setEvent(event, false);
    });


// game starts with this
function init() {
    game = new ResourceCollector(width, height, defaults, playerData);
    game.interval = setInterval(() => update(), 1000/framesPerSecond)
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
