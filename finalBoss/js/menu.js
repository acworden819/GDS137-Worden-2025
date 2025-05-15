function hsvToHex(h, s, v) {
	// Ensure h, s, and v are within valid ranges
	h = Math.max(0, Math.min(360, h));
	s = Math.max(0, Math.min(100, s));
	v = Math.max(0, Math.min(100, v));
  
	// Convert s and v to decimal values
	s /= 100;
	v /= 100;
  
	let r, g, b;
  
	const i = Math.floor(h / 60);
	const f = h / 60 - i;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);
  
	switch (i % 6) {
	  case 0: r = v; g = t; b = p; break;
	  case 1: r = q; g = v; b = p; break;
	  case 2: r = p; g = v; b = t; break;
	  case 3: r = p; g = q; b = v; break;
	  case 4: r = t; g = p; b = v; break;
	  case 5: r = v; g = p; b = q; break;
	}
  
	const rHex = Math.round(r * 255).toString(16).padStart(2, '0');
	const gHex = Math.round(g * 255).toString(16).padStart(2, '0');
	const bHex = Math.round(b * 255).toString(16).padStart(2, '0');
  
	return `#${rHex}${gHex}${bHex}`;
}


var startButton = new GameObject({height: 100, color: "black" });
var instructionsButton = new GameObject({height: 100, color: "black" });
var menuButton = new GameObject({height: 100, color: "black" });

var menuBackground = new GameObject();
menuBackground.width = canvas.width
menuBackground.height = canvas.height

var buttons = [
	startButton, 
	instructionsButton,
	menuButton
]

var t = 0;
var titleColor = "#ffffff"
gameStates[`menu`] = function () {
	t+=2;

	if (t>=360){
		t = 0;
	}
	titleColor = hsvToHex(t, 360, 100)
	
	startButton.x = canvas.width*.5
	startButton.width = canvas.width*.2
	startButton.y = 550
	startButton.drawRect();

	instructionsButton.x = canvas.width*.5
	instructionsButton.width = canvas.width*.2
	instructionsButton.y = 700
	instructionsButton.drawRect();

	context.save();

	context.font = '100px tahoma'
	context.textAlign = 'center'
	context.fillStyle = titleColor
	context.fillText('rgb run', canvas.width / 2, 300)

	context.font = '50px tahoma'
	context.fillStyle = 'white'
	context.fillText('play', canvas.width / 2, 565)

	context.font = '50px tahoma'
	context.fillStyle = 'white'
	context.fillText('instructions', canvas.width / 2, 715)

	if(click){
		click = false;
		for (let i = 0; i < buttons.length; i++) {
			let button = buttons[i]
			if (button.hitTestObject(trackMouse)){
				if(button == startButton){
					gameReset = true;
					gameStates.changeState(`game`);
				}
				if(button == instructionsButton){
					gameStates.changeState(`instructions`);
				}
			}
		}
	}

	context.restore();
}

gameStates['instructions'] = function(){
	
	menuButton.x = canvas.width*.5
	menuButton.width = canvas.width*.2
	menuButton.y = 700
	menuButton.drawRect();

	context.save();

	context.font = '50px tahoma'
	context.fillStyle = 'white'
	context.textAlign = 'center'
	context.fillText('menu', canvas.width / 2, 715)

	context.font = '30px tahoma'
	context.fillStyle = 'black'
	context.textAlign = 'center'
	context.fillText('step on buttons to change your color.', canvas.width / 2, 200)
	context.fillText('each color has their own ability.', canvas.width / 2, 250)
	context.fillText('abilities last for a few seconds.', canvas.width / 2, 300)

	context.font = '30px tahoma'
	context.fillStyle = '#ff0022'
	context.fillText('red - sprint', canvas.width / 2, 420)
	context.fillStyle = '#00ff00'
	context.fillText('green - reverse gravity', canvas.width / 2, 420+50)
	context.fillStyle = '#0000ff'
	context.fillText('blue - double jump', canvas.width / 2, 420+100)

	if(click){
		click = false;
		for (let i = 0; i < buttons.length; i++) {
			let button = buttons[i]
			if (button.hitTestObject(trackMouse)){
				if(button == menuButton){
					gameStates.changeState(`menu`);
				}
			}
		}
	}

	context.restore();
}


