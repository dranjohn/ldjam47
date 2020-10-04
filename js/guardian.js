'use strict';

class Guardian {
	constructor(leftSprite, rightSprite) {
		this._sprites = {
			left: leftSprite,
			right: rightSprite
		}

		this._isVisible = true;
		this._score = 0;
		this._hasAskedQuestion = false;
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

		return {
			question: "This is the question",
			answers: [
				"Spring answer",
				"Summer answer",
				"Autumn answer",
				"Winter answer",
				"Indifferent answer"
			]
		};
	}

	updateQuestion() {

	}
}
