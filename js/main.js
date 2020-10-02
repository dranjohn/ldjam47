"use strict";

const KEYS = ["x", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

var canvas, ctx;
var width, height;
var keyboard;

var img, snd;
var camera;

function update(now) {
	keyboard.update();

	if (keyboard.keys.ArrowDown.pressed) {
		console.log(now);
		snd.play();
	}

	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, width, height);

	//camera.transform();

	ctx.scale(height/10, height/10);
	ctx.translate((width/2)/(height/10), (height/2)/(height/10));
	ctx.rotate(Math.PI/2);
	ctx.translate(-(width/2)/(height/10), -(height/2)/(height/10));
	ctx.translate(1, 0);
	//ctx.translate(10, 10);
	//ctx.rotate(Math.PI/4);
	//ctx.translate(-10, -10);
	//ctx.translate(20, 0);

	/*ctx.setTransform(10, 0, 0, -10, 400, 240);

	ctx.strokeStyle = "white";
	ctx.moveTo(0, 0);
	ctx.lineTo(10, 20);
	ctx.stroke();

	ctx.fillStyle = "green";
	ctx.fillRect(0, 0, -2, -2);

	ctx.fillStyle = "blue";
	ctx.fillRect(-3, -3, -2, -2);
	ctx.strokeStyle = "brown";
	ctx.strokeRect(-3, -3, -2, -2);*/

	ctx.drawImage(img, 8, 8, 1, 2);

	requestAnimationFrame(update);
}

function main() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	width = canvas.width;
	height = canvas.height;
	ctx.imageSmoothingEnabled = false;

	keyboard = new Keyboard(KEYS);
	addEventListener("keydown", e => keyboard.keydown(e));
	addEventListener("keyup", e => keyboard.keyup(e));

	img = new SrcImage("images/player3.png");
	snd = new Audio("sound/test.wav");
	camera = new Camera(ctx, 0, 0, 1, 0);

	requestAnimationFrame(update);
}
