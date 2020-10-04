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
		this._isIndifferent = false;

		this._isPendingRemoval = false;
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

	set isPendingRemoval(pendingRemoval) {
		this._isPendingRemoval = pendingRemoval;
	}

	get isWinner() {
		return this._isWinner;
	}


	win() {
		this._isWinner = true;
		this._currentQuestion = 0;
	}

	makeIndifferent() {
		this._isIndifferent = true;
		this._hasAskedQuestion = false;
	}

	resolvePendingRemoval() {
		if (this._isPendingRemoval) {
			this._isVisible = false;
		}
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

		if (this._isIndifferent) {
			if (this._hasAskedQuestion) {
				return undefined;
			}

			this._hasAskedQuestion = true;
			this._isPendingRemoval = true;

			return this._questionSet.indifferenceQuestion;
		}


		if (!isInOverworld) {
			return this._questionSet.underworldQuestion;
		}

		if (this._currentQuestion >= this._questionSet.questions.length) {
			return this._questionSet.exhaustedQuestion;
		}

		if (this._hasAskedQuestion) {
			return this._questionSet.noQuestion;
		}
		this._hasAskedQuestion = true;


		var currentQuestion = this._questionSet.questions[this._currentQuestion];

		var viableAnswers = [];
		var viablePoints = [];

		var answerPointPairs = currentQuestion.answers.map((e, i) => [e, currentQuestion.points[i]]);
		//answerPointPairs.shuffle();

		for (let p of answerPointPairs) {
			if (viableOptions.includes(p[1])) {
				viableAnswers.push(p[0]);
				viablePoints.push(p[1]);
			}
		}


		return {
			question: currentQuestion.question,
			answers: viableAnswers,
			points: viablePoints
		};
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
