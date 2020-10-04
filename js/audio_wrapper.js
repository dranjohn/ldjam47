"use strict";

class AudioWrapper extends Audio {
	constructor(src, volume, playbackRate, loop) {
		super(src);
		this.volume = volume;
		this.playbackRate = playbackRate;
		this.loop = loop;
	}

	stop() {
		this.pause();
		this.currentTime = 0;
	}
}
