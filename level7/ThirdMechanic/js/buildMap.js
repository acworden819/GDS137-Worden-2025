canvas.width = window.innerWidth
canvas.height = window.innerHeight

floor = new GameObject({ color: "#f2f2f2" });
floor.width = canvas.width;
floor.x = canvas.width / 2;
floor.y = canvas.height - floor.height / 2


var colorAlpha = 0;
var backgroundColor = "#ffffff"
var globalLower = false;
var globalRaise = false;

var swatchSize = { width: 50, height: 20 }


var defaultPlatformsData = [ //platforms that can be touched no matter the color (grey platforms)
	{
		x: 150, y: canvas.height - 150,  //position
		width: 300, height: 100,  //size
		color: "#f5f5f5",
	},
	{
		x: 1300, y: canvas.height - 250,  //position
		width: 400, height: 300,  //size
		color: "#f5f5f5",
	},
	{
		x: 150	, y: 50,  //position
		width: 400, height: 100,  //size
		color: "#f5f5f5",
	},
]

var colorPlatformsData = [
	{
		x: 450, y: canvas.height - 200,  //position
		width: 150, height: 25,  //size
		colorGroup: "red", 
		isPlatform: true,
	},
	{
		x: 700, y: canvas.height - 300,  //position
		width: 150, height: 25,  //size
		colorGroup: "red", 
		isPlatform: true,
	},
	{
		x: 950, y: canvas.height - 350,  //position
		width: 150, height: 25,  //size
		colorGroup: "red", 
		isPlatform: true,
	},
	{
		x: 1350, y: canvas.height - 550,  //position
		width: 20, height: 300,  //size
		colorGroup: "blue", 
		isDoor: true,
	},
	{
		x: 550, y: 90,  //position
		width: 150, height: 25,  //size
		colorGroup: "green", 
		isPlatform: true,
	},
	{
		x: 850, y: 90,  //position
		width: 150, height: 25,  //size
		colorGroup: "green", 
		isPlatform: true,
	},
	{
		x: 1150, y: 90,  //position
		width: 150, height: 25,  //size
		colorGroup: "green", 
		isPlatform: true,
	},
]

var colorSwatchData = [
	{
		x: 250, y: (floor.y - floor.height / 2) - (swatchSize.height / 2) - defaultPlatformsData[0].height,  //position
		width: swatchSize.width, height: swatchSize.height,  //size
		swatch: true, colorGroup: "red",  //color
		abilityLength: 2,
	},
	{
		x: 1200, y: (floor.y - floor.height / 2) - (swatchSize.height / 2) - defaultPlatformsData[1].height,  //position
		width: swatchSize.width, height: swatchSize.height,  //size
		swatch: true, colorGroup: "blue", //color
		abilityLength: 2,
	},
	{
		x: 80, y: (floor.y - floor.height / 2) - (swatchSize.height / 2) - defaultPlatformsData[0].height,  //position
		width: swatchSize.width, height: swatchSize.height,  //size
		swatch: true, colorGroup: "green",  //color
		abilityLength: 4,
	},
]

var colorSwatchFolder = []
var defaultPlatformsFolder = []
var colorPlatformsFolder = []
var colorChangingObjects = []


for (let i = 0; i < colorSwatchData.length; i++) {
	colorSwatchFolder[i] = new GameObject(colorSwatchData[i])
}

for (let i = 0; i < defaultPlatformsData.length; i++) {
	defaultPlatformsFolder[i] = new GameObject(defaultPlatformsData[i])
	colorChangingObjects[colorChangingObjects.length] = defaultPlatformsFolder[i]
}

for (let i = 0; i < colorPlatformsData.length; i++) {
	colorPlatformsFolder[i] = new GameObject(colorPlatformsData[i])
	colorChangingObjects[colorChangingObjects.length] = colorPlatformsFolder[i]
}