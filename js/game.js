var stage;
var gameContainer;
var ui;
var resources = [{type:"tree", x:50}, {type:"rock", x:80}, {type:"tree", x:100}, {type:"tree", x:200}];
var buildingMenu = new createjs.Container();
var resourceTab = new createjs.Container();
var isBuilding = false;
var wrapper = null;

var original_height = window.innerHeight;
var displacement = 0;

var resources = {};

function init() {
	stage = new createjs.Stage("gameCanvas");
	gameContainer = new createjs.Container();
	ui = new createjs.Container();
	stage.addChild(gameContainer);
	stage.addChild(ui);
	resizeCanvas();

	window.addEventListener('resize', resizeCanvas, false);
	initGround();
	initMainBuilding();
	initCharacter();
    //window.setInterval(spawnEnemy, 2000);
	initResource();
	initResourceTab();

	resizeCanvas();
	
}

function initResourceTab() {
	resources["rock"] = 0;
	resources["wood"] = 0;
	resources["gold"] = 0;

	var size = Object.keys(resources).length;

	var placeholderTab = new createjs.Shape();
	placeholderTab.graphics.beginFill("Purple").drawRect(0,0,120 * size, 80);

	resourceTab.addChild(placeholderTab);

	var count = 0;
	for (key in resources) {
		var value = resources[key];

		var placeholderItem = new createjs.Shape();
		placeholderItem.graphics.beginFill("Red").drawRect(10 + count * 120, 10, 60, 60);
		resourceTab.addChild(placeholderItem);

		var text = new createjs.Text(value);
		text.y = 25;
		text.x = 75 + count * 120;
		text.scaleX = 3;
		text.scaleY = 3;

		resourceTab.addChild(text);
		count++;
	}

	ui.addChild(resourceTab);
	stage.update();
}

function createBuildingMenu() {
	if (gameContainer.children.indexOf(buildingMenu) > -1) {
		return;
	}

	buildingMenu.x = window.innerWidth / 2 - 80;
	buildingMenu.y = window.innerHeight - 350;

	var placeholder = new createjs.Shape();
	placeholder.graphics.beginFill("Black").drawRect(0,0,200,100);
	buildingMenu.addChild(placeholder);

	placeholder.addEventListener("click", createBuilding, false);

	exit = new createjs.Shape();
	exit.graphics.beginFill("Red").drawCircle(200,0,20);
	buildingMenu.addChild(exit);

	exit.addEventListener("click", destroyBuildingMenu, false);

	gameContainer.addChild(buildingMenu);
	stage.update();
}

function createBuilding() {	
	wrapper = stage.on("stagemousedown", spawnBuilding, false);
	isBuilding = true;
}

function spawnBuilding(ev) {
	var building = new createjs.Shape();
	building.graphics.beginFill("Yellow").drawRect(0,0,40,100);

	building.x = ev.stageX;
	building.y = window.innerHeight - 200;
	gameContainer.addChild(building);
	stage.update();
}

function destroyBuildingMenu() {
	gameContainer.removeChild(buildingMenu);

	stage.update();
}

function initMainBuilding() {
	var mainBuilding = new createjs.Bitmap("graphics/base.png");
	mainBuilding.scaleX = 0.3;
	mainBuilding.scaleY = 0.3;
	mainBuilding.x = window.innerWidth / 2 - 50;
	mainBuilding.y = window.innerHeight - 210;
	gameContainer.addChild(mainBuilding);
	stage.update();

	mainBuilding.addEventListener("click", createBuildingMenu, false);
}

function initResource() {
	var offset = 140;
	var resourceCount = resources.length;
	for (var i = 0; i < resourceCount; ++i) {
		console.log(resources[i]);
		spawnResource(resources[i], resources[i].x, window.innerHeight - 100 - 95);
	}
}

function spawnResource(resource, x, y) {
	//log(resource.type);
	if (resource.type == "tree") {
		var resource = new createjs.Bitmap("graphics/tree.png");
		resource.scaleX = 0.1;
		resource.scaleY = 0.1;
		resource.x = x;
		resource.y = y;
		gameContainer.addChild(resource);
	} else if (resource.type == "rock") {
		var resource = new createjs.Bitmap("graphics/tree.png");
		resource.scaleX = 0.1;
		resource.scaleY = 0.1;
		resource.x = x;
		resource.y = y;
		gameContainer.addChild(resource);
	}
	stage.update();
}

function initCharacter() {
	var character = new createjs.Bitmap("graphics/OW_McCree.png");
	character.x = gameContainer.x + (window.innerWidth / 2);
	character.y = gameContainer.y + (window.innerHeight - 100 - 115);
	gameContainer.addChild(character);
	stage.update();

	window.onkeydown = function(e) {
		var code = e.keyCode;

		if (code == 37) {
			character.x -= 5;
			e.preventDefault();

			if (square.x + displacement <= 0) {
				displacement += 5;
				gameContainer.x += 5;
			}

			stage.update();
		}
		if (code == 39) {
			character.x += 5;
			e.preventDefault();

			var canvas = document.getElementById("gameCanvas");

			if (square.x + displacement > canvas.width - 35) {
				displacement -= 5;
				gameContainer.x -= 5;
			}
			stage.update();
		}
		if (code == 27) {
			if (!isBuilding) {
				return;
			}
			isBuilding = false;
			stage.off("stagemousedown", wrapper);
		}
	}
}

function initGround() {
	//var ground = new createjs.Bitmap("graphics/base.png");
	//ground.scaleX = 0.3;
	//ground.scaleY = 0.3;
	//ground.x = window.innerWidth / 2 - 50;
	//ground.y = window.innerHeight - 210;
	var ground = new createjs.Shape();
	ground.graphics.beginFill("Green").drawRect(0,0,10000000,100);
	ground.x = 0;
	ground.y = window.innerHeight - 100;
	gameContainer.addChild(ground);
	stage.update();
}

function resizeCanvas() {
	var canvas = document.getElementById('gameCanvas');
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var offsetY = original_height - canvas.height;
	original_height = canvas.height;
	gameContainer.y -= offsetY;

	stage.update();
}


function spawnEnemy() {
	var enemy = new createjs.Shape();
	enemy.graphics.beginFill("Red").drawRect(10,10,30,30);
	enemy.x = 1000;
	enemy.y = 500;
    gameContainer.addChild(enemy);
	moveEnemy(enemy);
}


function moveEnemy(enemy) {
  	enemy.x = enemy.x - 1;
  	stage.update();
  	setTimeout(function(){
   	 	moveEnemy(enemy);
  	}, 10);
}
