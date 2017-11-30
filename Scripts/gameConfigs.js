const baseCircleSpeed = 2;
const baseCircleRad = 20;
const width = 800;
const heightUI = 50;
const height = 550;
const framesPerSecond = 60;

var game;
var playerInput;
var playerData = {
    name: "Guest",
    score: 0
};

var canvas = document.querySelector('canvas');
var canvasContext = canvas.getContext('2d');

//key and mouse events
window.addEventListener('keydown',
    function (event) {
        playerInput.updateKeys(event, true);
    });
window.addEventListener('keyup',
    function (event) {
        playerInput.updateKeys(event, false);
    });
window.addEventListener('mousemove',
    function (event) {
        playerInput.updateMouseMove(event);
    });
window.addEventListener('mouseup',
    function (event) {
        playerInput.updateMouse(event, false);
    });
window.addEventListener('mousedown',
    function (event) {
        playerInput.updateMouse(event, true);
    });