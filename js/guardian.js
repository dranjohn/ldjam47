'use strict';

class Guardian {
	constructor(leftSprite, rightSprite) {
		this._sprites = {
			left: leftSprite,
			right: rightSprite
		}

		this._isVisible = true;
	}

	get isVisible() {
		return this._isVisible;
	}

	set isVisible(isVisible) {
		this._isVisible = isVisible;
	}

	getSprite(facingRight) {
		return this._sprites[facingRight ? "right" : "left"];
	}
}
