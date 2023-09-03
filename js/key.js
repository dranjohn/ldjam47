/*
 * SPDX-FileCopyrightText: 2020, 2023 dranjohn
 * SPDX-FileCopyrightText: 2020, 2023 Daniel Kalak
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

"use strict";

class Key {
	constructor() {
		this._currentDown = false;
		this._frozenDown = false;
		this._currentPressed = false;
		this._frozenPressed = false;
	}

	set down(newDown) {
		if (newDown && !this._currentDown) {
			this._currentPressed = true;
		}
		this._currentDown = newDown;
	}

	get down() {
		return this._frozenDown;
	}

	get pressed() {
		return this._frozenPressed;
	}

	update() {
		this._frozenDown = this._currentDown;
		this._frozenPressed = this._currentPressed;
		this._currentPressed = false;
	}
}
