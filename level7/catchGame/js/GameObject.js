// JavaScript Document

function GameObject()
{
	//player's location
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.r = 0;
	
	//player's dimensions
	this.width = 35;
	this.height = 35;
	this.isCircle = false;
	
	//player's velocity or speed on each axis
	
	//player's color
	this.color = "#ffff00";
	
	//This draws the player to the screen

	this.force = 2;

	this.ax = 1.3;
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
