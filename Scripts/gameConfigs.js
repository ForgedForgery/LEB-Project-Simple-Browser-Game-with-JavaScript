///!!!||!!!!!!!!!!!!!!!!!!!||!!!
///!!!||   DO NOT CHANGE   ||!!!
///!!!VV!!!!!!!!!!!!!!!!!!!VV!!!

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var game;

var keyMap = {};
var possiblePlayerInput = {
    37: "LEFT",
    38: "UP",
    39: "RIGHT",
    40: "DOWN"
}

//key events
window.addEventListener('keydown',
function (event) {
    keyMap[event.keyCode] = true;
})
window.addEventListener('keyup',
function (event) {
    keyMap[event.keyCode] = false;
})

const baseCircleSpeed = 2;
const baseCircleRad = 20;