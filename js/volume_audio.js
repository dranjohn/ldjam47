"use strict";

class VolumeAudio extends Audio {
	constructor(src, volume) {
		super(src);
		this.volume = volume;
	}
}
