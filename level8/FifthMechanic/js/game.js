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
var jumps = 0;
var defaultJH = player.jumpHeight

interval = 1000 / 60;
timer = setInterval(animate, interval);

function animate() {
	
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	
	context.clearRect(0, 0, canvas.width, canvas.height);

	if ((w || space) && player.canJump && player.vy >= 0) {
		player.canJump = false;
		player.vy += player.jumpHeight * gravity;
		jumps++;
	}	
	if(jumps<player.jumpCount){
		player.canJump = true
	}else{
		player.canJump = false;
		if(player.vy == 0){
			jumps = 0;
		}
	}
	console.log(jumps)

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
		player.canJump = true;
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


	
	//---------mechanics in here---------

	if(player.colorGroup){
		let text;
		context.font = '32px tahoma'
		context.textAlign = 'center'
		context.fillStyle = backgroundColor
		if (player.colorGroup == 'red'){
			text = 'hold shift to sprint.'
		}
		if (player.colorGroup == 'blue'){
			text = 'jump twice to double jump.'
		}
		if (player.colorGroup == 'green'){
			text = 'press R to flip gravity.'
		}
		context.fillText(text, canvas.width/2, 40)
	}else{
		gravity = 1;
		player.jumpCount = 1;
	}

	if(shift && player.colorGroup == 'red'){
		player.force = 1.75
	}else{
		player.force = 1
	}

	if(r && player.colorGroup == 'green'){
		r = false;
		gravity *= -1
	}
	if(space && player.colorGroup == 'blue'){
		player.jumpCount = 2;
	}

	//------------------------------------


	player.drawRect();

	//--draw swatches(buttons)--//
	for (let i = 0; i < colorSwatchFolder.length; i++) {
		colorSwatchFolder[i].drawRect();
	}
	//---------------------//

	//--draw default platforms--//
	for (let i = 0; i < defaultPlatformsFolder.length; i++) {
		defaultPlatformsFolder[i].drawRect();

		while (defaultPlatformsFolder[i].hitTestPoint(player.bottom()) && player.vy >= 0) {
			player.y--;
			player.vy = 0;
			player.canJump = true;
		}
		while (defaultPlatformsFolder[i].hitTestPoint(player.top()) && player.vy <= 0 && gravity < 0) {
			player.y++;
			player.vy = 0;
			player.canJump = true;
		}
		while (defaultPlatformsFolder[i].hitTestPoint(player.left()) && player.vx <= 0) {
			player.x++;
			player.vx = 0;
		}
		while (defaultPlatformsFolder[i].hitTestPoint(player.right()) && player.vx >= 0) {
			player.x--;
			player.vx = 0;
		}
	}

	for (let i = 0; i < colorPlatformsFolder.length; i++) {
		colorPlatformsFolder[i].drawRect();

		while (colorPlatformsFolder[i].hitTestPoint(player.bottom()) && player.vy >= 0) {
			
			if (colorPlatformsFolder[i].isPlatform){
				player.y--;
				player.vy = 0;
				player.canJump = true;
			}else if (colorPlatformsFolder[i].isDoor){
				player.x--;
			}

		}
		while (colorPlatformsFolder[i].hitTestPoint(player.top()) && player.vy <= 0 && gravity < 0) {
			player.y++;
			player.vy = 0;
			player.canJump = true;
		}
		while (colorPlatformsFolder[i].hitTestPoint(player.left()) && player.vx <= 0 && !colorPlatformsFolder[i].isPlatform) {
			player.x++;
			player.vx = 0;
		}
		while (colorPlatformsFolder[i].hitTestPoint(player.right()) && player.vx >= 0 && !colorPlatformsFolder[i].isPlatform) {
			player.x--;
			player.vx = 0;
		}
	}

	floor.color = floor.interpolateColor(floor.originalColor, backgroundColor, .2)
	floor.drawRect();

	//player.drawDebug()


}

