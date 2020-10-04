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

		this._isWinner = false;
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


	win() {
		this._isWinner = true;
		this._currentQuestion = 0;
	}


	getSprite(facingRight) {
		return this._sprites[facingRight ? "right" : "left"];
	}


	getQuestion(viableOptions, isInOverworld) {
		if (this._isWinner) {
			if (this._currentQuestion >= this._questionSet.endQuestions.length) {
				return undefined;
			}

			return this._questionSet.endQuestions[this._currentQuestion++];
		}

		if (!isInOverworld) {
			return this._questionSet.underworldQuestion;
		}

		if (this._hasAskedQuestion) {
			return this._questionSet.noQuestion;
		}
		this._hasAskedQuestion = true;

		if (this._currentQuestion >= this._questionSet.questions.length) {
			return this._questionSet.exhaustedQuestion;
		}

		return this._questionSet.questions[this._currentQuestion];
	}

	updateQuestion() {
		if (this._isWinner) {
			return;
		}

		if (this._hasAskedQuestion) {
			if (this._currentQuestion < this._questionSet.questions.length) {
					this._currentQuestion++;
			}

			this._hasAskedQuestion = false;
		}
	}
}
