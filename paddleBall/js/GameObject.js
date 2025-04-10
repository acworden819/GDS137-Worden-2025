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

function GameObject()
{
	//player's location
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.r = 0;
	
	//player's dimensions
	this.width = 35;
	this.height = 35;
	
	//player's velocity or speed on each axis
	
	//player's color
	this.color = "#ff0000";
	
	//This draws the player to the screen

	this.force = 2;

	this.ax = 1;
	this.ay = 1;

	this.vx = 0;
	this.vy = 0;


	this.drawCircle = function()
	{
		context.save();
			context.fillStyle = this.color;
			context.translate(this.x, this.y);
			context.rotate((this.r))
			context.beginPath()
			context.arc(0, 0, this.height/2, 0, 360*Math.PI/180, true)
			context.fill()
		context.restore();
		
	}	
	this.drawImage = function(image)
	{
		context.save();
			context.fillStyle = this.color;
			context.translate(this.x, this.y);
			context.drawImage(img, -this.width/2, -this.height/2, this.width, this.height)
		context.restore();
		
	}	
	this.drawRect = function()
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
	this.move = function () {
		this.x += this.vx;
		this.y += this.vy;
	}

	this.top = function(){
		return this.y - (this.height/2);
	}
	this.bottom = function(){
		return this.y + (this.height/2);
	}
	this.left = function(){
		return this.x - (this.width/2);
	}
	this.right = function(){
		return this.x + (this.width/2);
	}
	
	this.hitTestObject = function(obj)
	{
		if(this.left() < obj.right() && 
		   this.right() > obj.left() &&
		   this.top() < obj.bottom() &&
		   this.bottom() > obj.top())
		{
			return true
		}
		return false;
	}
	
	//This changes the player's position
	this.move = function()
	{
		this.x += this.vx;
		this.y += this.vy;
		this.r += this.vr;
	}
}
