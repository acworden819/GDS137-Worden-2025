// JavaScript Document

var canvas;
var context;
var timer;
var interval = 1000 / 60;
var ball;
var hits = 0;
var size = 100;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
ball = new Ball();

//------Declare the Player's speed on the x and y axis------
ball.vx = 8;
ball.vy = 8;
//----------------------------------------------------

timer = setInterval(animate, interval);


function animate() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	//----Movement Using the Player's move() function----
	ball.move();
	//---------------------------------------------------

	//--------------Bounce of Right----------------------
	if (ball.x > canvas.width - ball.width / 2) {
		ball.vx = -ball.vx;
		hits++;
		return;
	}
	if (ball.x < ball.width / 2) {
		ball.vx = -ball.vx;	
		hits++;
		return;
	}
	if (ball.y > canvas.height - ball.height / 2) {
		ball.vy = -ball.vy;
		hits++;
		return;
	}
	if (ball.y < ball.width / 2) {
		ball.vy = -ball.vy;
		hits++;	
		return;
	}
	//---------------------------------------------------
	ball.width = size+(hits*5);
	ball.height = size+(hits*5);
	if (hits % 2 == 0) {
		ball.color = "#00ff44"
		ball.drawSquare();
	} else {
		ball.color = "#8800ff"
		ball.draw();
	}


}
