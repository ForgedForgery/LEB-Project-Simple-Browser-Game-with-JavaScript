const baseCircleSpeed = 2;
const baseCircleRad = 20;
const width = 800;
const heightUI = 50;
const height = 550;
const framesPerSecond = 60;

//const C1 = "#878E88";
//const C2 = "#C9F2C7";
//const C3 = "#F06449";
//const C4 = "#EDE6E3";
//const C5 = "#36382E";

const C1 = "#FFE066";
const C2 = "#247BA0";
const C3 = "#F25F5C";
const C4 = "#70C1B3";
const C5 = "#50514F";

var game;
var playerInput;
var loginForm;
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