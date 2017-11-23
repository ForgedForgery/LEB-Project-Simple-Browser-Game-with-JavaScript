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
        playerInput.setEvent(event, true);
    });
window.addEventListener('keyup',
    function (event) {
        playerInput.setEvent(event, false);
    });
