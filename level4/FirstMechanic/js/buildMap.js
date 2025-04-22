canvas.width = window.innerWidth
canvas.height = window.innerHeight

floor = new GameObject({color: "#f2f2f2"});
floor.width = canvas.width;
floor.x = canvas.width / 2;
floor.y = canvas.height - floor.height / 2


var colorAlpha = 0;
var backgroundColor = "#ffffff"
var globalLower = false;
var globalRaise = false;

var swatchSize = { width: 50, height: 20 }
var colorSwatchData = [
	{
		x: 500, y: (floor.y - floor.height / 2) - (swatchSize.height / 2),  //position
		width: swatchSize.width, height: swatchSize.height,  //size
		color: '#ff0000', swatch: true,  //color
        abilityLength: 1,
	},
	{
		x: 300, y: (floor.y - floor.height / 2) - (swatchSize.height / 2),  //position
		width: swatchSize.width, height: swatchSize.height,  //size
		color: '#00aaff', swatch: true,  //color
        abilityLength: 1,
	},
	{
		x: 400, y: (floor.y - floor.height / 2) - (swatchSize.height / 2),  //position
		width: swatchSize.width, height: swatchSize.height,  //size
		color: '#00ff2f', swatch: true,  //color
        abilityLength: 1,
	},
    {
		x: 600, y: (floor.y - floor.height / 2) - (swatchSize.height / 2),  //position
		width: swatchSize.width, height: swatchSize.height,  //size
		color: '#e100ff', swatch: true,  //color
        abilityLength: 1,
	},
    {
		x: 700, y: (floor.y - floor.height / 2) - (swatchSize.height / 2),  //position
		width: swatchSize.width, height: swatchSize.height,  //size
		color: '#ffee00', swatch: true,  //color
        abilityLength: 1,
	},
]

var colorSwatchFolder = []

for (let i = 0; i < colorSwatchData.length; i++) {
	colorSwatchFolder[i] = new GameObject(colorSwatchData[i])
}