const baseCircleSpeed = 2;
const baseCircleRad = 20;
const width = 800;
const height = 600;
const framesPerSecond = 50;

///!!!||!!!!!!!!!!!!!!!!!!!||!!!
///!!!||   DO NOT CHANGE   ||!!!
///!!!VV!!!!!!!!!!!!!!!!!!!VV!!!

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var game = new GameArea(width, height);



//key events
window.addEventListener('keydown',
    function (event) {
        game.player.controls.setEvent(event, true);
    });
window.addEventListener('keyup',
    function (event) {
        game.player.controls.setEvent(event, false);
    });