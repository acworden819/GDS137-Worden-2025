// JavaScript Document

var canvas;
var context;
var timer;
var interval = 1000 / 60;
var player, trail, paddle;

//---------------Set Friction and Gravity-----------------
var frictionX = .85;
var frictionY = .97;
var gravity = 1;
//--------------------------------------------------------

var lastX = 0
var lastY = 0

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

player = new GameObject();
player.force = 2;
paddle = new GameObject();

timer = setInterval(animate, interval);

trail = new GameObject();
trail.color = "#d93b3b"

player.width = 80
player.height = 80
player.vx = 5
player.color = "#ff00ff"

paddle.width = 250;
paddle.height = 40;
paddle.color = "#00ffff"

function lerp(start, end, alpha) {
	return start + (end - start) * alpha;
  }

var slices = []
function checkPaddle(){
	var centerOfBall = player.x + (player.width/2);

	slices = [
		lerp(paddle.left(), paddle.right(), 1/6),
		lerp(paddle.left(), paddle.right(), 1/3),
		lerp(paddle.left(), paddle.right(), 2/3),
		lerp(paddle.left(), paddle.right(), 5/6),
	]
	console.log(centerOfBall, slices[0])
	if(centerOfBall > paddle.right() && centerOfBall < slices[0]){
		player.vx = -player.force * 5
	}
	if(centerOfBall > paddle.right() && centerOfBall < slices[1]){
		player.vx = -player.force
	}
	if(centerOfBall > paddle.right() && centerOfBall < slices[2]){
		player.vx = -player.force
	}
	if(centerOfBall > paddle.right() && centerOfBall < slices[3]){
		player.vx = player.force * 5
	}

	player.vy = -35
}

function animate() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	showBounce();




	trail.x = lastX
	trail.y = lastY

	lastX = player.x
	lastY = player.y

	paddle.move();

	//trail.drawRect(true);
	player.drawCircle(true);

	paddle.drawRect(true);
}


/*IMPORTANT: Below are four functions that demonstrate the various elements we will use to simulating Game Physics.
each function is a copy of the previous with more functionality added. 
ONLY CALL ONE OF THESE FUNCTIONS AT A TIME!!!!!!!!*/

function showBounce() {
	paddle.vx = 0;
	if (d) {
		paddle.vx = 5;
	}
	if (a) {
		paddle.vx = -5;
	}

	player.vy *= frictionY;
	player.vx *= frictionX;

	player.vy += gravity;

	player.x += player.vx;
	player.y += player.vy;

	paddle.x += paddle.vx;
	paddle.y = canvas.height-50
	//--------------------Check Collision------------------------------------------------------
	if (player.y > canvas.height - player.height / 2) {
		player.y = canvas.height - player.height / 2;
		player.vy = -player.vy * .67;
	}

	if (player.bottom() > paddle.top() && player.right() > paddle.left() && player.left() < paddle.right()) {

		//--------Bounce the Ball---------------------------------------------------------------
		player.y = paddle.top()-(player.height/2)
		checkPaddle();
	}

	//-----------------------------------------------------------------------------------------
}


