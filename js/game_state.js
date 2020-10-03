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
		this._talkingLines = "";
		this._finishedTalking = false;
		this._talkingOptions = [];
		this._selectedOption = 0;

		// Load the world
		this._isTurning = false;
		this._worldRotation = 0;
		this._targetWorldRotation = 0;

		this._worldSprite = new SrcImage("images/world/world.png");
		this._guardianSprites = [
			{
				left: new SrcImage("images/guardian/spring_left.png"),
				right: new SrcImage("images/guardian/spring_right.png")
			},
			{
				left: new SrcImage("images/guardian/summer_left.png"),
				right: new SrcImage("images/guardian/summer_right.png")
			},
			{
				left: new SrcImage("images/guardian/autumn_left.png"),
				right: new SrcImage("images/guardian/autumn_right.png")
			},
			{
				left: new SrcImage("images/guardian/winter_left.png"),
				right: new SrcImage("images/guardian/winter_right.png")
			}
		];

		// Create keyboard listener
		this._keyboard = new Keyboard(["x", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);
	}


	getPlayerSprite(baseSprite) {
		if (this._playerFacingRight) {
			return baseSprite.right;
		} else {
			return baseSprite.left;
		}
	}

	_startTalking(message, options) {
		this._playerIsWalking = false;
		this._isTalking = true;
		this._talkingTimeElapsed = 0;
		this._talkingLines = this._splitText(message);
		this._talkingOptions = [];
		for (let option of options) {
			this._talkingOptions.push(this._splitText(option));
		}
		this._selectedOption = 0;
		this._finishedTalking = false;
	}


	update(deltaTime) {
		this._keyboard.update();

		if (this._isTurning) {
			this._updateRotation(deltaTime);
		} else if (this._isTalking) {
			this._updateDialog(deltaTime);
		} else {
			this._updatePlayer(deltaTime);
		}
	}

	_updatePlayer (deltaTime) { //function playerMoveFunction(deltaTime) {
		// Check if the player wants to talk to a guardian
		if (this._keyboard.keys.x.pressed && 4 <= this._playerX && this._playerX <= 7) {
			this._startTalking("This is the Question", ["Answer A", "Answer B", "Answer C"]);
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
		if (dx !== 0) {
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
				this._isTurning = true;
			}
			if (this._playerX >= 10) {
				this._playerX = 10;
	
				// Trigger world right rotate
				this._targetWorldRotation += 1;
				this._isTurning = true;
			}
		} else {
			// If the player is not moving, reset the walking animation
			this._playerWalkingCycle = 0;
			this._playerIsWalking = false;
		}
	}

	_updateRotation (deltaTime) { // function worldRotateFunction(deltaTime) {
		// World rotation
		const rotationSpeed = 1;

		var dr = Math.sign(this._targetWorldRotation - this._worldRotation);

		if (Math.abs(this._targetWorldRotation - this._worldRotation) <= Math.abs(rotationSpeed * dr * deltaTime)) {
			// Rotation has completed
			this._worldRotation = this._targetWorldRotation;
	
			// Update player
			this._playerX = (this._playerX > 5.5) ? 1 : 10;
			this._isTurning = false;
	
			// Set the world rotation into the [0, 3] range
			this._worldRotation += 4;
			this._worldRotation %= 4;
			this._targetWorldRotation = this._worldRotation;
		} else {
			this._worldRotation += rotationSpeed * dr * deltaTime;
		}
	}

	_updateDialog(deltaTime) { // function talkingUpdate(deltaTime) {
		this._talkingTimeElapsed += deltaTime;
	
		if (this._finishedTalking) {
			if (this._keyboard.keys.ArrowDown.pressed) {
				this._selectedOption++;
			}
			if (this._keyboard.keys.ArrowUp.pressed) {
				this._selectedOption--;
			}
			this._selectedOption += this._talkingOptions.length;
			this._selectedOption %= this._talkingOptions.length;
	
			if (this._keyboard.keys.x.pressed) {
				this._isTalking = false;
			}
		}
	}

	render() {
		if (!this._isTalking) {
			this._renderWorld();
		} else {
			this._renderText();
		}
		this._renderGuardians();
		this._renderPlayer();
	}


	_renderWorld() {
		// Save foreground coordinates
		ctx.save();

		// Translate to background coordinates
		ctx.translate(6, -2);
		ctx.rotate(this._worldRotation * Math.PI / 2);

		// Render the world
		this._ctx.drawImage(this._worldSprite, -6, -6, 12, 12);

		// Restore foreground coordinates
		ctx.restore();
	}

	_renderPlayer() {
		if (this._targetWorldRotation === this._worldRotation) {
			var currentPlayerSprite = this._playerSprites.idle;
			if (this._playerIsWalking) {
				currentPlayerSprite = this._playerSprites.walking[Math.floor(this._playerWalkingCycle)];
			}

			this._ctx.drawImage(this.getPlayerSprite(currentPlayerSprite), this._playerX, 2, 1, 1);
		} else {
			this._ctx.save();

			// Translate to background coordinates
			ctx.translate(6, -2);
			ctx.rotate((this._worldRotation - this._targetWorldRotation - Math.sign(this._worldRotation - this._targetWorldRotation)) * Math.PI / 2);

			this._ctx.drawImage(this.getPlayerSprite(this._playerSprites.turning), this._playerX - 6, 4, 1, 1);

			this._ctx.restore();
		}
	}

	_renderText() {
		this._ctx.save();
		// We need to zoom out because we cannot use a font smaller than 1px.
		// Each third of the visible frame now measures 16 by 16 virtual pixels.
		this._ctx.scale(0.25, 0.25);

		const talkingSpeed = 20;
		let lettersLeft = Math.floor(this._talkingTimeElapsed * talkingSpeed);

		for (let i = 0; i < this._talkingLines.length; i++) {
			this._ctx.fillText(this._talkingLines[i].substring(0, lettersLeft), 1, i+1);
			lettersLeft -= this._talkingLines[i].length;
		}

		if (lettersLeft > 0) {
			let lineNumber = 1;

			for (let i = 0; i < this._talkingOptions.length; i++) {
				if (i !== this._selectedOption) {
					this._ctx.fillStyle = "gray";
				}
				for (let line of this._talkingOptions[i]) {
					this._ctx.fillText(line.substring(0, lettersLeft), 33, lineNumber);
					lettersLeft -= line.length;
					lineNumber++;
				}
				this._ctx.fillStyle = "white";
				lineNumber++;
			}

			this._finishedTalking = (lettersLeft >= 0);
		}

		this._ctx.restore();
	}

	_renderGuardians() {
		// Save foreground coordinates
		ctx.save();

		// Translate to background coordinates
		ctx.translate(6, -2);
		ctx.rotate(this._worldRotation * Math.PI / 2);

		// Render the guardians
		for (var i = 0; i < 4; ++i) {
			let facingRight = this._playerX > 6;
			let isRotating = this._worldRotation !== this._targetWorldRotation;
			let isApproaching = i === ((this._targetWorldRotation + 4) % 4);
			facingRight ^= isRotating && isApproaching;
			this._ctx.drawImage(this._guardianSprites[i][facingRight ? "right" : "left"], 0, 3, 1, 2);
			ctx.rotate(-Math.PI / 2);
		}

		// Restore foreground coordinates
		ctx.restore();
	}


	_splitText(message) {
		let words = message.split(" ");
		let lines = [];
		let currentLine = [];

		this._ctx.save();
		this._ctx.scale(0.25, 0.25);

		for (let word of words) {
			if (this._ctx.measureText(currentLine.concat([word])).width > 14) {
				lines.push(currentLine.join(" "));
				currentLine = [word];
			} else {
				currentLine.push(word);
			}
		}
		lines.push(currentLine.join(" "));

		this._ctx.restore();

		return lines;
	}
}
