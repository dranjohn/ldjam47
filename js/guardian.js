'use strict';

class Guardian {
	constructor(leftSprite, rightSprite) {
		this._sprites = {
			left: leftSprite,
			right: rightSprite
		}
	}

	getSprite(facingRight) {
		return this._sprites[facingRight ? "right" : "left"];
	}
}
