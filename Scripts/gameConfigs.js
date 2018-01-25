const baseCircleSpeed = 300; // in pixel per second the player can move
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

const purpleColors = {
    C1: "#6B0F1A",
    C2: "#B91372",
    C3: "#31081F",
    C4: "#0E0004",
    C5: "#9D44B5"
};

const titleTextColor = purpleColors.C5;
const titleTextSideColor = purpleColors.C2;
const titleBGColor = paleColors.C4;

const buttonBGColor = paleColors.C5;
const buttonHoldColor = paleColors.C4;
const buttonHoverColor = paleColors.C3;

const textFieldColor = paleColors.C2;
const textFieldSideColor = paleColors.C5;
const playerScoreFieldColor = paleColors.C3; //normal text field that needs to be highlighted

const gameUIColor = paleColors.C1;

const gameBGColor = paleColors.C4;
const playerColor = paleColors.C5;
const collectibleColor = paleColors.C3;

var game;
var lastTick = (new Date).getTime();
var deltaTime;
var playerInput;
var loginForm;
var updateHighscoreInterval;

var highscoreData = {
    name1: "Nicht vorhanden",
    score1: 0,
    name2: "Nicht vorhanden",
    score2: 0,
    name3: "Nicht vorhanden",
    score3: 0
};
var playerData = {
    name: "Guest",
    score: 0
};

var canvas = document.querySelector('canvas');
var canvasContext = canvas.getContext('2d');

var disketteImg = new Image(40, 40);
disketteImg.src = "Scripts/Diskette.jpg";   

var diceImg = new Image(15, 15);
diceImg.src = "Scripts/dice.png";

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
