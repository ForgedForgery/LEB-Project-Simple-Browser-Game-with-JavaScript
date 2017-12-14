const baseCircleSpeed = 2;
const baseCircleRad = 20;
const width = 800;
const heightUI = 50;
const height = 550;
const framesPerSecond = 60;

const paleColors = {
    C1: "#878E88",
    C2: "#C9F2C7",
    C3: "#F06449",
    C4: "#EDE6E3",
    C5: "#36382E"
};

const greenColors = {
    C1: "#ECBA82",
    C2: "#81C14B",
    C3: "#2E933C",
    C4: "#297045",
    C5: "#204E4A"
};

const contrastingColors = {
    C1: "#04E762",
    C2: "#F5B700",
    C3: "#DC0073",
    C4: "#008BF8",
    C5: "#89FC00"
};

const gameUIColor = greenColors.C1;
const buttonBGColor = greenColors.C2;
const titleBGColor = greenColors.C4;
const textFieldColor = greenColors.C5;
const buttonHoldColor = greenColors.C4;
const buttonHoverColor = greenColors.C3;

const gameBGColor = paleColors.C4;
const collectibleColor = paleColors.C3;
const playerColor = paleColors.C5;

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