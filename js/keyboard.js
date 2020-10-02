"use strict";

class Keyboard {
	constructor(keynames) {
		this._keys = {};

		for (let keyname of keynames) {
			this._keys[keyname] = new Key();
		}
	}

	get keys() {
		return this._keys;
	}

	set keys(newKeys) {
		this._keys = newKeys;
	}

	keydown(e) {
		if (e.key in this._keys) {
			this._keys[e.key].down = true;
			e.preventDefault();
		}
	}

	keyup(e) {
		if (e.key in this._keys) {
			this._keys[e.key].down = false;
			e.preventDefault();
		}
	}

	update() {
		for (let keyname in this._keys) {
			this._keys[keyname].update();
		}
	}
}
