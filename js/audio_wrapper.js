/*
 * SPDX-FileCopyrightText: 2020, 2023 dranjohn
 * SPDX-FileCopyrightText: 2020, 2023 Daniel Kalak
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

"use strict";

class AudioWrapper extends Audio {
	constructor(src, volume, playbackRate, loop) {
		super(src);
		this.volume = volume;
		this.playbackRate = playbackRate;
		this.loop = loop;
	}

	play() {
		this.currentTime = 0;
		super.play();
	}

	stop() {
		this.pause();
		this.currentTime = 0;
	}
}
