var colorGroups = {
    "none": "#ffffff",

    "red": "#ff0000",
    "blue": "#00aaff",
}

function GameObject(obj) {

	this.interpolateColor = function(c1, c2, alpha){

		const hexToRgb = (hex) => {
			const sanitizedHex = hex.replace("#", "");
			const r = parseInt(sanitizedHex.substring(0, 2), 16);
			const g = parseInt(sanitizedHex.substring(2, 4), 16);
			const b = parseInt(sanitizedHex.substring(4, 6), 16);
			return { r, g, b };
		  };
		
		  const rgbToHex = (r, g, b) => {
			const componentToHex = (c) => {
			  const hex = c.toString(16);
			  return hex.length === 1 ? "0" + hex : hex;
			};
		
			return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
		  };
		
		  const rgb1 = hexToRgb(c1);
		  const rgb2 = hexToRgb(c2);
		
		  const interpolatedR = Math.round(rgb1.r + (rgb2.r - rgb1.r) * alpha);
		  const interpolatedG = Math.round(rgb1.g + (rgb2.g - rgb1.g) * alpha);
		  const interpolatedB = Math.round(rgb1.b + (rgb2.b - rgb1.b) * alpha);
		
		  return rgbToHex(interpolatedR, interpolatedG, interpolatedB);

	}

	this.x = canvas.width / 2;
	this.y = canvas.height / 2;
	this.width = 100;
	this.height = 100;
	this.force = 1;
	this.ax = 1;
	this.ay = 1;
	this.vx = 0;
	this.vy = 0;

	//whether or not the object can jump
	this.canJump = false;
	this.jumpHeight = -25;

	//----color stuff---//
	this.swatch = false;
	this.swatchDown = false;
	this.swatchFrames = 0;
	this.swatchDown = false;
	this.abilityLength = 3;
	this.colorGroup = null
	this.color = "#ffffff";

	
	//------------------//
	this.isPlatform = false;
	this.isDoor = false;
	//------Allows us to pass object literals into the class to define its properties--------//
	//------This eliminate the need to pass in the property arguments in a specific order------------//
	if (obj !== undefined) {
		for (value in obj) {
			if (this[value] !== undefined) {
				this[value] = obj[value];
			}
		}
	}
	this.originalY = this.y


	if (this.colorGroup){
		this.color = colorGroups[this.colorGroup];
		if (this.isPlatform){
			this.color = backgroundColor
		}
		if (this.isDoor){
			this.color = this.interpolateColor("#ffffff", colorGroups[this.colorGroup], .2)
		}
	}

	this.originalColor = this.color
	this.lastColor = this.color

	this.drawRect = function () {
		context.save();
		context.fillStyle = this.color;
		context.translate(this.x, this.y);
		context.fillRect((-this.width / 2), (-this.height / 2), this.width, this.height);
		context.restore();

	}

	this.drawCircle = function () {
		context.save();
		context.fillStyle = this.color;
		context.beginPath();
		context.translate(this.x, this.y);
		context.arc(0, 0, this.radius(), 0, 360 * Math.PI / 180, true);
		context.closePath();
		context.fill();
		context.restore();

	}



	this.move = function () {
		this.x += this.vx;
		this.y += this.vy;
	}


	//---------Returns object's for the top, bottom, left and right of an object's bounding box.
	this.left = function () {
		return { x: this.x - this.width / 2, y: this.y }
	}
	this.right = function () {
		return { x: this.x + this.width / 2, y: this.y }
	}

	this.top = function () {
		return { x: this.x, y: this.y - this.height / 2 }
	}
	this.bottom = function () {
		return { x: this.x, y: this.y + this.height / 2 }
	}
	this.bottomLeft = function () {
		return { x: this.x - this.width / 2, y: this.y + this.height / 2 }
	}
	this.bottomRight = function () {
		return { x: this.x + this.width / 2, y: this.y + this.height / 2 }
	}

	this.hitTestObject = function (obj) {
		if (this.left().x <= obj.right().x &&
			this.right().x >= obj.left().x &&
			this.top().y <= obj.bottom().y &&
			this.bottom().y >= obj.top().y) {
			return true
		}
		return false;
	}

	//------Tests whether a single point overlaps the bounding box of another object-------
	this.hitTestPoint = function (obj) {
		if (obj.x >= this.left().x &&
			obj.x <= this.right().x &&
			obj.y >= this.top().y &&
			obj.y <= this.bottom().y) {
			return true;
		}
		return false;
	}

	/*-----Sets or gets the radius value--------*/
	this.radius = function (newRadius) {
		return this.width / 2;
	}

	//Draws the collision points
	this.drawDebug = function () {
		var size = 5;
		context.save();
		context.fillStyle = "black";
		context.fillRect(this.left().x - size / 2, this.left().y - size / 2, size, size);
		context.fillRect(this.right().x - size / 2, this.right().y - size / 2, size, size);
		context.fillRect(this.top().x - size / 2, this.top().y - size / 2, size, size);
		context.fillRect(this.bottom().x - size / 2, this.bottom().y - size / 2, size, size);
		context.fillRect(this.x - size / 2, this.y - size / 2, size, size);
		context.restore();
	}
}
