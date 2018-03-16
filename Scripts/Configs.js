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
    score: 0,
	levels: 
	{
		//TESTING
//		0: {
//			shape: "trisaw",
//			color: ["lightblue", "blue", "green", "blue", "green", "blue", "green", "blue", "green", "blue", "green", "blue", "green"],
//			pattern: "randomCircles" 
//		},
//		1: {
//			shape: "tetrasaw",
//			color: ["lightblue", "blue", "green", "blue", "green", "blue", "green", "blue", "green", "blue", "green", "blue", "green"],
//			pattern: "randomCircles"
//		},
//		2: {
//			shape: "pentasaw",
//			color: ["pink", "black", "pink", "green", "lightblue"],
//			pattern: "randomCircles"
//		},
//		3: { 
//			shape: "heptasaw",
//			color: ["green", "blue", "green", "blue", "green"],
//			pattern: "randomCircles"
//		},	
//		4: {
//			shape: "hexasaw",
//			color: ["blue", "lightblue", "red", "pink"],
//			pattern: "randomCircles"
//		},
//		5: {
//			shape: "octasaw",
//			color: ["pink", "blue", "lightblue"],
//			pattern: "randomCircles"
//		} //TESTING
	}
};

var canvas = document.querySelector('canvas');
var canvasContext = canvas.getContext('2d');

var disketteImg = new Image(40, 40);
disketteImg.src = "media/Diskette.jpg";   

var diceImg = new Image(15, 15);
diceImg.src = "media/dice.png";
