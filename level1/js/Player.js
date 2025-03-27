// JavaScript Document

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

function Ball()
{
	//player's location
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.r = 0;
	
	//player's dimensions
	this.width = 100;
	this.height = 100;
	
	//player's velocity or speed on each axis
	this.vx = 0;
	this.vy = 0;
	this.vr = 0;
	
	//player's color
	this.color = "#ff0000";
	
	//This draws the player to the screen
	this.draw = function()
	{
		context.save();
			context.fillStyle = this.color;
			context.translate(this.x, this.y);
			context.rotate((this.r))
			context.beginPath()
			context.arc(0, 0, this.height/2, 0, 360*Math.PI/180, true)
			//context.fillRect((-this.width/2), (-this.height/2), this.width, this.height);
			context.fill()
		context.restore();
		
	}	
	this.drawSquare = function()
	{
		context.save();
			context.fillStyle = this.color;
			context.translate(this.x, this.y);
			context.rotate((this.r))
			//context.beginPath()
			//context.arc(0, 0, 50, 0, 360*Math.PI/180, true)
			context.fillRect((-this.width/2), (-this.height/2), this.width, this.height);
			//context.fill()
		context.restore();
		
	}	
	
	//This changes the player's position
	this.move = function()
	{
		this.x += this.vx;
		this.y += this.vy;
		this.r += this.vr;
	}
}
