'use strict';

const FIRST_REMOVAL_SCORE = 2;
const SECOND_REMOVAL_SCORE = 4;

const WIN_SCORE = 6;
const INDIFFERENCE_SCORE = 6;
/*
#Q = number of questions per character
WS = required score for winning
IS = required score for the indifference ending
FRS/SRS = first/second removal score

IS = 4 * #Q - (FRS + SRS + 2 * WS - 4)
IS = 4 * 5 - (2 + 4 + 2 * 6 - 4)
*/

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
		this._isWalking = false;

		this._isTalking = false;
		this._talkingTimeElapsed = 0;
		this._talkingMessage = [];
		this._isTyping = false;
		this._talkingOptions = [];
		this._selectedOption = 0;

		this._selectSound = new VolumeAudio("sound/select.wav", 0.1);
		this._actionSound = new VolumeAudio("sound/action.wav", 0.1);
		this._turningSound = new VolumeAudio("sound/turning.wav", 0.1);

		// Load the world
		this._isTurning = false;
		this._worldRotation = 0;
		this._targetWorldRotation = 0;

		this._isWalkingForward = true;

		this._worldSprite = new SrcImage("images/world/world.png");
		this._winningWorldSprites = [
			new SrcImage("images/world/world_spring.png"),
			new SrcImage("images/world/world_summer.png"),
			new SrcImage("images/world/world_autumn.png"),
			new SrcImage("images/world/world_winter.png")
		]

		this._unlockedOptions = [-1, 4];
		this._removedOptions = [];
		this._guardians = [
			new Guardian(new SrcImage("images/guardian/spring_left.png"), new SrcImage("images/guardian/spring_right.png"), GUARDIAN_QUESTIONS[0]),
			new Guardian(new SrcImage("images/guardian/summer_left.png"), new SrcImage("images/guardian/summer_right.png"), GUARDIAN_QUESTIONS[1]),
			new Guardian(new SrcImage("images/guardian/autumn_left.png"), new SrcImage("images/guardian/autumn_right.png"), GUARDIAN_QUESTIONS[2]),
			new Guardian(new SrcImage("images/guardian/winter_left.png"), new SrcImage("images/guardian/winter_right.png"), GUARDIAN_QUESTIONS[3])
		];

		this._questionPoints = [];
		this._indifferenceScore = 0;

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
		this._isWalking = false;
		this._isTalking = true;
		this._talkingTimeElapsed = 0;
		this._talkingMessage = this._splitText(message);
		this._talkingOptions = [];
		for (let option of options) {
			this._talkingOptions.push(this._splitText(option));
		}
		this._selectedOption = 0;
		this._isTyping = true;
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

	_updatePlayer(deltaTime) {
		// Check if the player wants to talk to a guardian
		let currentGuardian = this._guardians[this._worldRotation];
		let inGuardianRange = 4 <= this._playerX && this._playerX <= 7;
		let isPlayerInteracting = this._keyboard.keys.x.pressed && currentGuardian.isVisible;

		if (inGuardianRange && isPlayerInteracting) {
			let viableOptions = []; // (unlocked U [i]) \cap (viable)
			for (let i = 0; i <= 4; ++i) {
				if (!this._unlockedOptions.includes(i) && i !== this._worldRotation) {
					continue;
				}

				if (this._removedOptions.includes(i)) {
					continue;
				}

				viableOptions.push(i);
			}

			let guardianQuestion = currentGuardian.getQuestion(viableOptions, this._isWalkingForward);

			if (guardianQuestion !== undefined) {
				this._actionSound.play();

				this._questionPoints = guardianQuestion.points;
				this._startTalking(guardianQuestion.question, guardianQuestion.answers);
			}

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

			this._isWalking = true;

			// Update the player position
			this._playerX += playerSpeed * dx * deltaTime;
			this._playerFacingRight = dx > 0;

			// Trigger world rotation if necessary
			if (this._playerX <= 1) {
				this._playerX = 1;

				// Trigger world left rotate
				this._targetWorldRotation -= 1;
				this._isTurning = true;
				this._turningSound.play();
			}
			if (this._playerX >= 10) {
				this._playerX = 10;

				// Trigger world right rotate
				this._targetWorldRotation += 1;
				this._isTurning = true;
				this._turningSound.play();
			}

			if (this._isTurning) {
				// If the turn is from winter to spring
				if (this._worldRotation === 3 && this._targetWorldRotation === 4) {
					// Update guardian questions
					if (this._isWalkingForward) {
						for (var i = 0; i < 4; i++) {
							this._guardians[i].updateQuestion();
						}
					}

					// Set player into the 'overworld' cycle
					this._isWalkingForward = true;
				}

				// If the turn from spring to winter
				if (this._worldRotation === 0 && this._targetWorldRotation === -1) {
					// Set player into the 'underworld' cycle
					this._isWalkingForward = false;
				}
			}
		} else {
			// If the player is not moving, reset the walking animation
			this._playerWalkingCycle = 0;
			this._isWalking = false;
		}
	}

	_updateRotation(deltaTime) {
		// World rotation
		const rotationSpeed = 1;

		var dr = Math.sign(this._targetWorldRotation - this._worldRotation);

		if (Math.abs(this._targetWorldRotation - this._worldRotation) <= Math.abs(rotationSpeed * dr * deltaTime)) {
			// Rotation has completed
			// Set the world rotation into the [0, 3] range
			this._targetWorldRotation += 4;
			this._targetWorldRotation %= 4;
			this._worldRotation = this._targetWorldRotation;

			// Update player
			this._playerX = (this._playerX > 5.5) ? 1 : 10;
			this._isTurning = false;

			// Remove indifferent guardians
			for (var i = 0; i < 4; ++i) {
				this._guardians[i].resolvePendingRemoval();
			}
		} else {
			this._worldRotation += rotationSpeed * dr * deltaTime;
		}
	}

	_updateDialog(deltaTime) {
		this._talkingTimeElapsed += deltaTime;

		if (this._isTyping) {
			return;
		}

		if (this._keyboard.keys.ArrowDown.pressed) {
			this._selectedOption++;

			if (this._talkingOptions.length > 0) {
				this._selectSound.play();
			}
		}
		if (this._keyboard.keys.ArrowUp.pressed) {
			this._selectedOption--;

			if (this._talkingOptions.length > 0) {
				this._selectSound.play();
			}
		}

		if (this._talkingOptions.length > 0) {
			this._selectedOption += this._talkingOptions.length;
			this._selectedOption %= this._talkingOptions.length;
		}

		if (this._keyboard.keys.x.pressed) {
			this._isTalking = false;
			this._actionSound.play();

			if (this._guardians[this._worldRotation].isWinner) {
				// Change the world to the winners world
				this._worldSprite = this._winningWorldSprites[this._worldRotation];
			} else if (this._questionPoints !== []) {
				let guardianIndex = this._questionPoints[this._selectedOption];
				if (0 <= guardianIndex && guardianIndex < 4) {
					// Increase guardian score
					this._guardians[guardianIndex].score++;

					// Unlock guardian
					if (this._guardians[guardianIndex].score === 1) {
						this._unlockedOptions.push(guardianIndex);
					}


					let lowestScore = WIN_SCORE;
					let lowestScoreGuardians = [];

					switch (this._guardians[guardianIndex].score) {
					case FIRST_REMOVAL_SCORE:
						if (this._removedOptions.length > 0) {
							break;
						}

						for (let i = 0; i < 4; ++i) {
							if (this._guardians[i].score < lowestScore) {
								lowestScoreGuardians = [i];
								lowestScore = this._guardians[i].score;
							} else if (this._guardians[i].score === lowestScore) {
								lowestScoreGuardians.push(i);
							}
						}

						this._removedOptions.push(lowestScoreGuardians[Math.floor(Math.random() * lowestScoreGuardians.length)]);

						break;
					case SECOND_REMOVAL_SCORE:
						if (this._removedOptions.length > 1) {
							break;
						}

						for (let i = 0; i < 4; ++i) {
							if (i === this._removedOptions[0]) {
								continue;
							}

							if (this._guardians[i].score < lowestScore) {
								lowestScoreGuardians = [i];
								lowestScore = this._guardians[i].score;
							} else if (this._guardians[i].score === lowestScore) {
								lowestScoreGuardians.push(i);
							}
						}

						this._removedOptions.push(lowestScoreGuardians[Math.floor(Math.random() * lowestScoreGuardians.length)]);

						break;
					case WIN_SCORE:
						// Remove guardians that are not the winner
						for (var i = 0; i < 4; i++) {
							if (i === guardianIndex) {
								continue;
							}

							if (i === this._worldRotation) {
								this._guardians[i].isPendingRemoval = true;
								continue;
							}

							this._guardians[i].isVisible = false;
						}

						// Give the winner the winning flag
						this._guardians[guardianIndex].win();
						break;
					default:
						break;
					}
				} else if (guardianIndex === 4) {
					this._indifferenceScore++;

					if (this._indifferenceScore === INDIFFERENCE_SCORE) {
						for (var i = 0; i < 4; i++) {
							this._guardians[i].isIndifferent = true;
						}
					}
				}
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
		if (!this._isTurning) {
			var currentPlayerSprite = this._playerSprites.idle;
			if (this._isWalking) {
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
		this._ctx.scale(0.025, 0.025); // this._ctx.scale(0.25, 0.25);

		/*if (this._isTyping) {
			this._typeoutSounds[this._worldRotation].play();
			//this._selectSound.play();
		}*/

		let lettersLeft = Math.floor(this._talkingTimeElapsed * 20);

		for (let i = 0; i < this._talkingMessage.length; i++) {
			this._ctx.fillText(this._talkingMessage[i].substring(0, lettersLeft), 10, (i+1)*10); // 1, i+1);
			lettersLeft -= this._talkingMessage[i].length;
		}

		if (lettersLeft > 0) {
			let lineNumber = 1;

			for (let i = 0; i < this._talkingOptions.length; i++) {
				if (i !== this._selectedOption) {
					this._ctx.fillStyle = "gray";
				}
				for (let line of this._talkingOptions[i]) {
					this._ctx.fillText(line.substring(0, lettersLeft), 330, lineNumber*10); // 33, lineNumber);
					lettersLeft -= line.length;
					lineNumber++;
				}
				this._ctx.fillStyle = "white";
				lineNumber++;
			}

			this._isTyping = (lettersLeft < 0);
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
			if (this._guardians[i].isVisible) {
				let facingRight = this._playerX > 6;
				let isApproaching = i === ((this._targetWorldRotation + 4) % 4);
				facingRight ^= this._isTurning && isApproaching;

				this._ctx.drawImage(this._guardians[i].getSprite(facingRight), 0, 3, 1, 2);
			}

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
		this._ctx.scale(0.025, 0.025); // (0.25, 0.25);

		for (let word of words) {
			if (this._ctx.measureText(currentLine.concat([word])).width > 140) { // 14) {
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
