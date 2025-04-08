// JavaScript Document

var canvas;
var context;
var timer;
var interval = 1000 / 60;
var ball;
var paddle;
var paddle2;
var hits = 0;
var size = 100;
var ballSpeed = 8;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
ball = new GameObject();
paddle = new GameObject();
paddle2 = new GameObject();

paddle.width = 10;
paddle.height = 120;
paddle.x = 20
paddle.y = (canvas.height / 2)

paddle2.width = 10;
paddle2.height = 120;
paddle2.x = canvas.width-20
paddle2.y = (canvas.height / 2)
//------Declare the Player's speed on the x and y axis------

ball.vx = -ballSpeed;
ball.vy = 0;
//----------------------------------------------------

timer = setInterval(animate, interval);


function animate() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	if (w) paddle.vy = -10;
	if (s) paddle.vy = 10
	if (!w && !s) paddle.vy = 0;

	if (up) paddle2.vy = -10;
	if (down) paddle2.vy = 10
	if (!up && !down) paddle2.vy = 0;

	paddle.move();
	paddle2.move();

	//----Movement Using the Player's move() function----

	ball.move();

	//--------------Locking paddle---------------------------

	if (paddle.y < (paddle.height / 2)) {
		paddle.y = paddle.height / 2
	}
	if (paddle.y > canvas.height - (paddle.height / 2)) {
		paddle.y = canvas.height - (paddle.height / 2)
	}

	if (paddle2.y < (paddle2.height / 2)) {
		paddle2.y = paddle2.height / 2
	}
	
	if (paddle2.y > canvas.height - (paddle2.height / 2)) {
		paddle2.y = canvas.height - (paddle2.height / 2)
	}

	//--------------Bounce of Right----------------------
	if (ball.x > canvas.width - ball.width / 2) {
		ball.x = canvas.width / 2
	}
	if (ball.x < ball.width / 2) {
		ball.x = canvas.width / 2
	}
	if (ball.y > canvas.height - ball.height / 2) {
		ball.vy *= -1;
		hits++;
	}
	if (ball.y < ball.height / 2) {
		ball.vy *= -1;
		hits++;
	}

	if (ball.hitTestObject(paddle)){
		ball.x = paddle.right() + ball.width / 2
		ball.vx *= -1
		if (ball.bottom() < paddle.top() + paddle.height / 3) {
			//touching top
			ball.vy = -ballSpeed;
		}
		if (ball.top() > paddle.bottom() - (paddle.height / 3)) {
			//touching bottom
			ball.vy = ballSpeed;
		}
	}

	if (ball.hitTestObject(paddle2)){
		ball.x = paddle2.left() - ball.width / 2
		ball.vx *= -1
		if (ball.bottom() < paddle2.top() + paddle2.height / 3) {
			//touching top
			ball.vy = -ballSpeed;
		}
		if (ball.top() > paddle2.bottom() - (paddle2.height / 3)) {
			//touching bottom
			ball.vy = ballSpeed;
		}
	}


	//---------------------------------------------------

	paddle.drawRect();
	paddle2.drawRect();

	ball.color = "#8800ff"
	ball.drawCircle();
	//}


}
