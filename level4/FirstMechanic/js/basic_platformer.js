//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

player = new GameObject({ x: 150, width: 40, height: 70, color: "#e8e8e8" });

var fX = .85;
var fY = .97;

var gravity = 1;

interval = 1000 / 60;
timer = setInterval(animate, interval);

function animate() {
	
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	
	context.clearRect(0, 0, canvas.width, canvas.height);

	if ((w || space) && player.canJump && player.vy == 0) {
		player.canJump = false;
		player.vy += player.jumpHeight;
	}

	if (a) {
		player.vx += -player.ax * player.force;
	}
	if (d) {
		player.vx += player.ax * player.force;
	}

	player.vx *= fX;
	player.vy *= fY;

	player.vy += gravity;

	player.x += Math.round(player.vx);
	player.y += Math.round(player.vy);


	while (floor.hitTestPoint(player.bottom()) && player.vy >= 0) {
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}

	while (floor.hitTestPoint(player.left()) && player.vx <= 0) {
		player.x++;
		player.vx = 0;
	}
	while (floor.hitTestPoint(player.right()) && player.vx >= 0) {
		player.x--;
		player.vx = 0;
	}

	while (floor.hitTestPoint({ x: player.bottomLeft().x, y: player.bottomLeft().y }) && player.vy >= 0) {
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}

	updateColorData() //get color data for player

	//--draw background--//
	context.fillStyle = player.interpolateColor('#ffffff', backgroundColor, 0.2);
	context.fillRect(0, 0, canvas.width, canvas.height);
	//------------------//

	player.drawRect();

	//--draw swatches(buttons)--//
	for (let i = 0; i < colorSwatchFolder.length; i++) {
		colorSwatchFolder[i].drawRect();
	}
	//---------------------//

	floor.color = floor.interpolateColor(floor.originalColor, backgroundColor, .2)
	floor.drawRect();

	//player.drawDebug()


}

