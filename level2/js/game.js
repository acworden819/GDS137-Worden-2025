// JavaScript Document

var canvas;
var context;
var timer;
var interval = 1000 / 60;
var ball;
var paddle;
var hits = 0;
var size = 100;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
ball = new GameObject();
paddle = new GameObject();

paddle.width = 20;
paddle.height = 120;
paddle.x = 40
paddle.y = (canvas.height/2)

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
		//return;
	}
	if (ball.x < ball.width / 2) {
		ball.vx = -ball.vx;	
		hits++;
		//return;
	}
	if (ball.y > canvas.height - ball.height / 2) {
		ball.vy = -ball.vy;
		hits++;
		//return;
	}
	if (ball.y < ball.width / 2) {
		ball.vy = -ball.vy;
		hits++;	
		//return;
	}
	//---------------------------------------------------

	paddle.drawRect();

	//ball.width = size+(hits*5);
	//ball.height = size+(hits*5);
	//if (hits % 2 == 0) {
	//	ball.color = "#00ff44"
	//	ball.drawRect();
	//} else {
		ball.color = "#8800ff"
		ball.drawCircle();
	//}


}
