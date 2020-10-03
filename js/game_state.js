'use strict';

class GameState {
  constructor(ctx) {
    // Store the canvas context
    this._ctx = ctx;

    // Create the player
    this._playerX = 4;
    this._playerImage = new SrcImage("images/player.png");

    // Load the world
    this._worldRotation = 0;
    this._worldSprite = new SrcImage("images/test_picture.png");

  	// Create keyboard listener
  	this._keyboard = new Keyboard(["x", "ArrowLeft", "ArrowRight"]);
  }


  update(deltaTime) {
	   this._keyboard.update();
  }


  renderWorld() {
    // Save foreground coordinates
	  ctx.save();

  	// Translate to background coordinates
	  ctx.translate(6, -2);
	  ctx.rotate(this._worldRotation);

    // Render all 9 parts of the world (TODO: from one sprite to nine)
    this._ctx.drawImage(this._worldSprite, -6, -6, 12, 12);

    // Restore foreground coordinates
  	ctx.restore();
  }

  renderPlayer() {
    this._ctx.drawImage(this._playerImage, this._playerX, 2, 1, 1);
  }
}
