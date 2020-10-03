'use strict';

class GameState {
  constructor(ctx) {
    // Store the canvas context
    this._ctx = ctx;

    // Create the player
    this._playerX = 4;
    this._playerSprites = {
      idle: {
        left: new SrcImage("images/player/idle_left.png"),
        right: new SrcImage("images/player/idle_right.png")
      },
      turning: {
        left: new SrcImage("images/player/turning_left.png"),
        right: new SrcImage("images/player/turning_right.png")
      }
    };
    this._playerFacingRight = true;

    // Load the world
    this._worldRotation = 0;
    this._targetWorldRotation = 0;

    this._worldSprite = new SrcImage("images/world.png");

  	// Create keyboard listener
  	this._keyboard = new Keyboard(["x", "ArrowLeft", "ArrowRight"]);
  }


  getPlayerSprite(baseSprite) {
    if (this._playerFacingRight) {
      return baseSprite.right;
    } else {
      return baseSprite.left;
    }
  }


  update(deltaTime) {
    this._keyboard.update();

    if (this._worldRotation != this._targetWorldRotation) {
      // World rotation
      const rotationSpeed = 1;

      var dr = Math.sign(this._targetWorldRotation - this._worldRotation);

      if (Math.abs(this._targetWorldRotation - this._worldRotation) <= Math.abs(rotationSpeed * dr * deltaTime)) {
        // Rotation has completed
        this._worldRotation = this._targetWorldRotation;

        this._playerX = (this._playerX > 5.5) ? 1 : 10;
      } else {
        this._worldRotation += rotationSpeed * dr * deltaTime;
      }
    } else {
      // Player movement
      const playerSpeed = 7;

      var dx = 0;
      if (this._keyboard.keys.ArrowLeft.down) {
        dx -= 1;
      }
      if (this._keyboard.keys.ArrowRight.down) {
        dx += 1;
      }

      if (dx != 0) {
        this._playerX += playerSpeed * dx * deltaTime;
        this._playerFacingRight = dx > 0;

        if (this._playerX <= 1) {
          this._playerX = 1;

          // Trigger world left rotate
          this._targetWorldRotation -= 1;
        }
        if (this._playerX >= 10) {
          this._playerX = 10;

          // Trigger world right rotate
          this._targetWorldRotation += 1;
        }
      }
    }
  }


  renderWorld() {
    // Save foreground coordinates
	  ctx.save();

  	// Translate to background coordinates
	  ctx.translate(6, -2);
	  ctx.rotate(this._worldRotation * Math.PI / 2);

    // Render all 9 parts of the world (TODO: from one sprite to nine)
    this._ctx.drawImage(this._worldSprite, -6, -6, 12, 12);

    // Restore foreground coordinates
  	ctx.restore();
  }

  renderPlayer() {
    if (this._targetWorldRotation == this._worldRotation) {
      this._ctx.drawImage(this.getPlayerSprite(this._playerSprites.idle), this._playerX, 2, 1, 1);
    } else {
      // Translate to background coordinates
  	  ctx.translate(6, -2);
  	  ctx.rotate((this._worldRotation - this._targetWorldRotation - Math.sign(this._worldRotation - this._targetWorldRotation)) * Math.PI / 2);

      this._ctx.drawImage(this.getPlayerSprite(this._playerSprites.turning), this._playerX - 6, 4, 1, 1);
    }
  }
}