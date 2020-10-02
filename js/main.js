"use strict";

const KEYS = ["x", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

var canvas, ctx;
var width, height;
var keyboard;

var backgroundImage;

function update(now) {
	keyboard.update();

	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, width, height);

	ctx.scale(width / 12, height / 4);

	ctx.translate(6, -2);
	ctx.rotate(0.2 * Math.PI * now / 1000.0);

	ctx.drawImage(backgroundImage, -6, -6, 12, 12);

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

	backgroundImage = new SrcImage("images/test_picture.png");

	requestAnimationFrame(update);
}
