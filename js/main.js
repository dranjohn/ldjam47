"use strict";

// Canvas data and input handling (do not modify!)
var canvas, ctx;
var width, height;
var keyboard;

// Game state
var currentTime = 0;
var gameState;


/*
 * The main game loop.
 */
function update(now) {
	// Update game state
	keyboard.update();
	gameState.update(now - currentTime);
	currentTime = now;

	// Reset canvas
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, width, height);

	// Create virtual coordinates (foreground coordinates)
	ctx.scale(width / 12, height / 4);

	// Draw background
	gameState.renderWorld();

	// Draw player
	gameState.renderPlayer();


	// Request the next animation frame in the loop
	requestAnimationFrame(update);
}


/*
 * Game entry point.
 */
function main() {
	// Get the canvas context
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	width = canvas.width;
	height = canvas.height;
	ctx.imageSmoothingEnabled = false;

	// Load initial game state
	gameState = new GameState(ctx);

	// Start the game loop
	requestAnimationFrame(update);
}
