"use strict";

class AudioWrapper extends Audio {
	constructor(src, volume, playbackRate) {
		super(src);
		this.volume = volume;
		this.playbackRate = playbackRate;
	}

	stop() {
		this.pause();
		this.currentTime = 0;
	}
}
