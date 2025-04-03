// JavaScript Document

var canvas;
var context;
var timer;
var interval = 1000 / 60;
var ball;
var paddle;
var hits = 0;
var size = 100;
var ballSpeed = 8;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
ball = new GameObject();
paddle = new GameObject();

paddle.width = 10;
paddle.height = 120;
paddle.x = 20
paddle.y = (canvas.height / 2)

//------Declare the Player's speed on the x and y axis------

ball.vx = -ballSpeed;
ball.vy = 0;
//----------------------------------------------------

timer = setInterval(animate, interval);

function touchingPaddle() {
	//console.log(ball.x + paddle.x)
	if (ball.left() <= paddle.right() && ball.left() > paddle.left()) {
		if (ball.top() < paddle.bottom() && ball.bottom() > paddle.top()) {
			//return true;
			ball.x = paddle.right() + ball.width / 2
			ball.vx *= -1
			if (ball.bottom() < paddle.top() + paddle.height / 3) {
				//touching top
				ball.vy = -ballSpeed;
			}
			if (ball.top() > paddle.bottom() - (paddle.height / 6)) {
				//touching bottom
				ball.vy = ballSpeed;
			}
		}
	}
	return false;
}


function animate() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	if (w) paddle.vy = -10;
	if (s) paddle.vy = 10
	if (!w && !s) paddle.vy = 0;
	paddle.move()

	//----Movement Using the Player's move() function----
	ball.move();
	//---------------------------------------------------

	if (paddle.y < (paddle.height / 2)) {
		paddle.y = paddle.height / 2
	}
	if (paddle.y > canvas.height - (paddle.height / 2)) {
		paddle.y = canvas.height - (paddle.height / 2)
	}

	//--------------Bounce of Right----------------------
	if (ball.x > canvas.width - ball.width / 2) {
		ball.vx *= -1;
		hits++;
	}
	if (ball.x < ball.width / 2) {
		//died
		ball.x = canvas.width / 2
	}
	if (ball.y > canvas.height - ball.height / 2) {
		ball.vy *= -1;
		hits++;
	}
	if (ball.y < ball.width / 2) {
		ball.vy *= -1;
		hits++;
	}
	if (touchingPaddle()) {
		//	ball.vx *= -1;
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
