'use strict';

class Guardian {
	constructor(leftSprite, rightSprite, questionSet) {
		this._sprites = {
			left: leftSprite,
			right: rightSprite
		}

		this._isVisible = true;
		this._score = 0;

		this._hasAskedQuestion = false;
		this._currentQuestion = 0;
		this._questionSet = questionSet;
	}

	get isVisible() {
		return this._isVisible;
	}

	set isVisible(isVisible) {
		this._isVisible = isVisible;
	}

	get score() {
		return this._score;
	}

	set score(score) {
		this._score = score;
	}


	getSprite(facingRight) {
		return this._sprites[facingRight ? "right" : "left"];
	}


	getQuestion(viableOptions) {
		this._hasAskedQuestion = true;

		return this._questionSet[this._currentQuestion];
	}

	updateQuestion() {
		if (this._hasAskedQuestion) {
			if (this._currentQuestion < this._questionSet.length - 1) {
					this._currentQuestion++;
			}

			this._hasAskedQuestion = false;
		}
	}
}
