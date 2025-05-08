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

player.width = 50;
player.height = 50;
player.x = canvas.width / 2
player.y = canvas.height - player.height / 2 - 25
player.color = "#ffff00"

var amount = 10;
var particles = [];
var colors = ["#7FFF00", "red"];

var lost = false;

var fX = .85;
var fY = .97;

function resetParticle(particle, i){
	particle.x = Math.random() * canvas.width;
	particle.y = Math.random() - canvas.height/2;
	particle.vy = (Math.random() * 6) + 5;
	particle.color = colors[i%2];
	if (i%2 == 1) {
		particle.isCircle = true;
	}else{
		particle.isCircle = false;
	}
}

for (var i = 0; i < amount; i++) {
	particles[i] = new GameObject({ width: 10, height: 10 });
	resetParticle(particles[i], i)
}

var t = 0;

function animate() {
	t++;

	context.clearRect(0, 0, canvas.width, canvas.height);

	if (d) {
		player.vx += player.ax * player.force;
	}
	if (a) {
		player.vx += player.ax * -player.force;
	}
	player.vx *= frictionX;

	player.x += player.vx;
	player.y += player.vy;

	if (player.right() > canvas.width) {
		player.x = canvas.width - player.width / 2
	}

	if (player.left() < 0) {
		player.x = player.width / 2
	}

	for (var p = 0; p < particles.length; p++) {
		particles[p].x += particles[p].vx;
		particles[p].y += particles[p].vy;

		if (particles[p].y > canvas.height + (particles[p].height / 2)) {
			resetParticle(particles[p], p);

		}

		if (particles[p].isCircle) {
			particles[p].drawCircle();
		} else {
			particles[p].drawRect();
		}
		if (particles[p].bottom() > player.top() && particles[p].left() < player.right() && particles[p].right() > player.left()){
			if(!particles[p].isCircle){
				score++;
				player.color = colors[0]
				t = 0;

			}else{
				lost = true;
				player.color = colors[1]
				t = 0;
			}		
			resetParticle(particles[p], p);
		}
	}
	if(lost){
		lost = false;
		score = 0;
		for (var p = 0; p < particles.length; p++) {
			resetParticle(particles[p], p);
		}
	}
	if(t > 60*.5){
		player.color = "#ffff00"
	}	


	lastX = player.x
	lastY = player.y

	player.drawRect(true);

	context.font = "30px Arial semibold"
	context.fillStyle = "#000000"
	context.textAlign = "center"
	context.textBaseline = "top"
	context.fillText("Score: " + score, 80, 25)

}

