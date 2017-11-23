const baseCircleSpeed = 2;
const baseCircleRad = 20;
const width = 800;
const height = 600;
const framesPerSecond = 60;

///!!!||!!!!!!!!!!!!!!!!!!!||!!!
///!!!||   DO NOT CHANGE   ||!!!
///!!!VV!!!!!!!!!!!!!!!!!!!VV!!!

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

//key events
window.addEventListener('keydown',
    function (event) {
        playerInput.updateKeys(event, true);
    });
window.addEventListener('keyup',
    function (event) {
        playerInput.updateKeys(event, false);
    });
window.addEventListener('mouseover',
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