//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;


canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

player = new GameObject({ x: 150, width: 40, height: 70, color: "#e8e8e8" });

floor = new GameObject({color: "#f2f2f2"});
floor.width = canvas.width;
floor.x = canvas.width / 2;
floor.y = canvas.height - floor.height / 2

var fX = .85;
var fY = .97;

var gravity = 1;

interval = 1000 / 60;
timer = setInterval(animate, interval);

var colorAlpha = 0;
var backgroundColor = "#ffffff"

var swatchSize = { width: 50, height: 20 }
var colorSwatchData = [
	{
		x: 500, y: (floor.y - floor.height / 2) - (swatchSize.height / 2),  //position
		width: swatchSize.width, height: swatchSize.height,  //size
		color: '#ff0000', swatch: true  //color
	},
	{
		x: 300, y: (floor.y - floor.height / 2) - (swatchSize.height / 2),  //position
		width: swatchSize.width, height: swatchSize.height,  //size
		color: '#00aaff', swatch: true  //color
	},
	{
		x: 400, y: (floor.y - floor.height / 2) - (swatchSize.height / 2),  //position
		width: swatchSize.width, height: swatchSize.height,  //size
		color: '#00ff2f', swatch: true  //color
	},
	{
		x: 800, y: (floor.y - floor.height / 2) - (swatchSize.height / 2),  //position
		width: swatchSize.width, height: swatchSize.height,  //size
		color: player.color, swatch: true  //color
	},
]

var colorSwatchFolder = []

for (let i = 0; i < colorSwatchData.length; i++) {
	colorSwatchFolder[i] = new GameObject(colorSwatchData[i])
}

function animate() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	if (w && player.canJump && player.vy == 0) {
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


	for (let i = 0; i < colorSwatchFolder.length; i++) {
		let swatch = colorSwatchFolder[i]

		if (player.hitTestObject(swatch) && !swatch.swatchLowering) {
			swatch.swatchFrames = 0;
			colorAlpha = 0;
			swatch.swatchLowering = true;
			player.y = swatch.y - swatchSize.height * 2
		}
		if (swatch.swatchLowering) {
			swatch.y += 4;
			colorAlpha += 0.2;
			player.color = player.interpolateColor(player.lastColor, swatch.color, colorAlpha)

			if (colorAlpha >= 1) {
				swatch.swatchLowering = false
				player.lastColor = player.color;
				backgroundColor = player.color
				swatch.swatchDown = true;
				colorAlpha = 0;
			}
		}
		if(swatch.swatchDown){
			swatch.swatchFrames++;
		}

		if (swatch.swatchFrames >= 60*swatch.abilityLength){
			let originalY = colorSwatchData[i].y
			if (swatch.y > originalY){
				swatch.y -= 4;
				player.color = player.interpolateColor(player.lastColor, swatch.color, colorAlpha)
			}
			else{
				swatch.y = originalY
			}
		}
		
	}

	context.fillStyle =  player.interpolateColor('#ffffff', backgroundColor, 0.2);
	context.fillRect(0, 0, canvas.width, canvas.height);

	player.drawRect();
	for (let i = 0; i < colorSwatchFolder.length; i++) {
		colorSwatchFolder[i].drawRect();
	}
	floor.color = floor.interpolateColor(floor.originalColor, backgroundColor , .2)
	floor.drawRect();


	//player.drawDebug()

}

