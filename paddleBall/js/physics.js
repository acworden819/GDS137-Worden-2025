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

var score = 0;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

player = new GameObject();
paddle = new GameObject();

timer = setInterval(animate, interval);

trail = new GameObject();
trail.color = "#d93b3b"

player.width = 80
player.height = 80
player.color = "#ff00ff"
player.force = 5;


paddle.width = 250;
paddle.height = 40;
paddle.color = "#00ffff"

function lerp(start, end, alpha) {
	return start + (end - start) * alpha;
  }

var slices = []
function checkPaddle(){
	var centerOfBall = player.x;

	slices = [
		lerp(paddle.left(), paddle.right(), 1/6),
		lerp(paddle.left(), paddle.right(), 1/3),
		lerp(paddle.left(), paddle.right(), 2/3),
		lerp(paddle.left(), paddle.right(), 5/6),
	]

	if(player.right() > paddle.left() && centerOfBall < slices[0]){
		player.vx = -player.force * 5
	}
	if(centerOfBall > slices[0] && centerOfBall < slices[1]){
		player.vx = -player.force
	}
	if(centerOfBall > slices[2] && centerOfBall < slices[3]){
		player.vx = player.force
	}
	if(centerOfBall > slices[3] && player.left() < paddle.right()){
		player.vx = player.force * 5
	}

	player.vy = -35
}

function animate() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	paddle.move();

	showBounce();

	trail.x = lastX
	trail.y = lastY

	lastX = player.x
	lastY = player.y


	//trail.drawRect(true);
	player.drawCircle(true);

	paddle.drawRect(true);

	context.beginPath();
	context.moveTo(paddle.x, paddle.y);
	context.lineTo(player.x, player.y);
	context.closePath();
	context.lineWidth = 2;
	context.stroke();

	context.font = "16px arial black"
	context.fillStyle = "#555555"
	context.textAlign = "center"
	context.textBaseline = "top"
	context.fillText("Score: "+ score, 80, 25)

}


/*IMPORTANT: Below are four functions that demonstrate the various elements we will use to simulating Game Physics.
each function is a copy of the previous with more functionality added. 
ONLY CALL ONE OF THESE FUNCTIONS AT A TIME!!!!!!!!*/

function showBounce() {

	if (d) {
		paddle.vx += paddle.ax * paddle.force;
	}
	if (a) {
		paddle.vx += paddle.ax * -paddle.force;
	}

	player.vy *= frictionY;
	player.vx *= frictionX;

	paddle.vx *= frictionX;

	player.vy += gravity;

	player.x += player.vx;
	player.y += player.vy;

	paddle.x += paddle.vx;
	paddle.y = canvas.height-50
	//--------------------Check Collision------------------------------------------------------
	if (player.y > canvas.height - player.height / 2) {
		player.y = canvas.height - player.height / 2;
		player.vy = -player.vy * .67;
		score = 0;
	}

	if (player.right() > canvas.width){
		player.x = canvas.width - player.width/2;
		player.vx = -player.vx
	}

	if (player.left() < 0){
		player.x = player.width/2;
		player.vx = -player.vx
	}

	if (paddle.right() > canvas.width){
		paddle.x = canvas.width-paddle.width/2
	}

	if (paddle.left() < 0){
		paddle.x = paddle.width/2
	}

	if (player.bottom() > paddle.top() && player.right() > paddle.left() && player.left() < paddle.right()) {

		//--------Bounce the Ball---------------------------------------------------------------
		player.y = paddle.top()-(player.height/2)
		checkPaddle();
		score ++;
	}

	//-----------------------------------------------------------------------------------------
}


