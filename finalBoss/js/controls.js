var w = false;
var a = false;
var s = false;
var d = false;
var space = false;
var shift = false;
var r = false;
var mouseX = 0, mouseY = 0;

document.addEventListener("keydown", press);
document.addEventListener("keyup", release);
document.addEventListener("mousemove", mouseMove);
document.addEventListener("click", click);


function press(e) {
	//---This logs key codes into the browser's console.
	console.log(e.keyCode);

	if (e.keyCode == 87) {
		w = true;
	}
	if (e.keyCode == 65) {
		a = true;
	}
	if (e.keyCode == 83) {
		s = true;
	}
	if (e.keyCode == 68) {
		d = true;
	}
	if (e.keyCode == 32) {
		space = true;
	}
	if(e.keyCode == 16){
		shift = true;
	}
	if(e.keyCode == 82){
		r = true;
	}
}

function release(e) {
	//---This logs key codes into the browser's console.
	//console.log(e.keyCode);

	if (e.keyCode == 87) {
		w = false;
	}
	if (e.keyCode == 65) {
		a = false;
	}
	if (e.keyCode == 83) {
		s = false;
	}
	if (e.keyCode == 68) {
		d = false;
	}
	if (e.keyCode == 32) {
		space = false;
	}
	if(e.keyCode == 16){
		shift = false;
	}
	if(e.keyCode == 82){
		r = false;
	}
}

function mouseMove(mouse){
	mouseX = mouse.clientX;
	mouseY = mouse.clientY;
}

function click(mouse){
	click = true;
}
