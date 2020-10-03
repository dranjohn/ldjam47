'use strict';

function playerMoveFunction(deltaTime) {
  // Check if the player wants to talk to a guardian
  if (this._keyboard.keys.x.pressed && 4 <= this._playerX && this._playerX <= 7) {
    console.log("guardian talk " + this._worldRotation);
		this._isTalking = true;
		this._talkingTimeElapsed = 0;
		this._update = talkingUpdate;
		return;
  }

  // Player movement
  const playerSpeed = 7;

  // Calculate player speed
  var dx = 0;
  if (this._keyboard.keys.ArrowLeft.down) {
    dx -= 1;
  }
  if (this._keyboard.keys.ArrowRight.down) {
    dx += 1;
  }

  // Only execute this if the player is actually moving
  if (dx != 0) {
    // Update the player walk cycle animation
    this._playerWalkingCycle += deltaTime * playerSpeed * 0.8;
    this._playerWalkingCycle %= 2;

    this._playerIsWalking = true;

    // Update the player position
    this._playerX += playerSpeed * dx * deltaTime;
    this._playerFacingRight = dx > 0;

    // Trigger world rotation if necessary
    if (this._playerX <= 1) {
      this._playerX = 1;

      // Trigger world left rotate
      this._targetWorldRotation -= 1;
      this._update = worldRotateFunction;
    }
    if (this._playerX >= 10) {
      this._playerX = 10;

      // Trigger world right rotate
      this._targetWorldRotation += 1;
      this._update = worldRotateFunction;
    }
  } else {
    // If the player is not moving, reset the walking animation
    this._playerWalkingCycle = 0;
    this._playerIsWalking = false;
  }
}

function worldRotateFunction(deltaTime) {
  // World rotation
  const rotationSpeed = 1;

  var dr = Math.sign(this._targetWorldRotation - this._worldRotation);

  if (Math.abs(this._targetWorldRotation - this._worldRotation) <= Math.abs(rotationSpeed * dr * deltaTime)) {
    // Rotation has completed
    this._worldRotation = this._targetWorldRotation;

    // Update player
    this._playerX = (this._playerX > 5.5) ? 1 : 10;
    this._update = playerMoveFunction;

    // Set the world rotation into the [0, 3] range
    this._worldRotation += 4;
    this._worldRotation %= 4;
    this._targetWorldRotation = this._worldRotation;
  } else {
    this._worldRotation += rotationSpeed * dr * deltaTime;
  }
}

function talkingUpdate(deltaTime) {
	this._talkingTimeElapsed += deltaTime;

	if (this._talkingTimeElapsed >= 2) {
		this._isTalking = false;
		this._update = playerMoveFunction;
	}
}

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
      },

      walking: [
        {
          left: new SrcImage("images/player/walking_left_1.png"),
          right: new SrcImage("images/player/walking_right_1.png")
        },
        {
          left: new SrcImage("images/player/walking_left_2.png"),
          right: new SrcImage("images/player/walking_right_2.png")
        }
      ]
    };
    this._playerFacingRight = true;

    this._playerWalkingCycle = 0;
    this._playerIsWalking = false;

		this._isTalking = false;
		this._talkingTimeElapsed = 0;

    // Load the world
    this._worldRotation = 0;
    this._targetWorldRotation = 0;

    this._worldSprite = new SrcImage("images/world.png");

  	// Create keyboard listener
  	this._keyboard = new Keyboard(["x", "ArrowLeft", "ArrowRight"]);
    this._update = playerMoveFunction;
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
    this._update(deltaTime);
  }


  renderWorld() {
		if (this._isTalking) {
			return;
		}
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
      var currentPlayerSprite = this._playerSprites.idle;
      if (this._playerIsWalking) {
        currentPlayerSprite = this._playerSprites.walking[Math.floor(this._playerWalkingCycle)];
      }

      this._ctx.drawImage(this.getPlayerSprite(currentPlayerSprite), this._playerX, 2, 1, 1);
    } else {
      // Translate to background coordinates
  	  ctx.translate(6, -2);
  	  ctx.rotate((this._worldRotation - this._targetWorldRotation - Math.sign(this._worldRotation - this._targetWorldRotation)) * Math.PI / 2);

      this._ctx.drawImage(this.getPlayerSprite(this._playerSprites.turning), this._playerX - 6, 4, 1, 1);
    }
  }
}
