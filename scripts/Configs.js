// TODO: Split this file and/or reorganize it
const baseCircleSpeed = 300; // in pixel per second the player can move
const baseCircleRad = 20;
const width = 800;
const heightUI = 50;
const height = 550;
const framesPerSecond = 60;

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
var loadedPlayerData = {
    name: "Guest",
    score: 0
};

var canvas = document.querySelector('canvas');
var canvasContext = canvas.getContext('2d');

var disketteImg = new Image(40, 40);
disketteImg.src = "media/Diskette.jpg";   

var diceImg = new Image(15, 15);
diceImg.src = "media/dice.png";