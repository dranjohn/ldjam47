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
    const playerSpeed = 7;

	  this._keyboard.update();

    var dx = 0;
    if (this._keyboard.keys.ArrowLeft.down) {
      dx -= 1;
    }
    if (this._keyboard.keys.ArrowRight.down) {
      dx += 1;
    }

    if (dx != 0) {
      this._playerX += playerSpeed * dx * deltaTime;

      if (this._playerX <= 1) {
        this._playerX = 1;
        //trigger left rotate
      }
      if (this._playerX >= 10) {
        this._playerX = 10;
        //trigger right rotate
      }
    }
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
