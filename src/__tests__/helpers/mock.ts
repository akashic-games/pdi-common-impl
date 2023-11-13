import type * as pdi from "@akashic/pdi-types";
import * as pci from "../../";

export class AudioSystem implements pdi.AudioSystem {
	id: string;
	volume: number;
	_muted: boolean;
	constructor(id: string, volume: number) {
		this.id = id;
		this.volume = volume || 1;
		this._muted = false;
	}

	stopAll(): void {
		// do nothing
	}
	findPlayers(_asset: pdi.AudioAsset): pdi.AudioPlayer[] {
		return [];
	}
	createPlayer(): pdi.AudioPlayer {
		return null!;
	}
	requestDestroy(_asset: pdi.AudioAsset): void {
		// do nothing
	}
	_reset(): void {
		// do nothing
	}
	_setMuted(_value: boolean): void {
		// do nothing
	}
	_setPlaybackRate(_value: number): void {
		// do nothing
	}
}

export class VideoSystem implements pdi.VideoSystem {}

export class AudioAsset extends pci.AudioAsset {
	constructor(
		_necessaryRetryCount: number,
		id: string,
		assetPath: string,
		duration: number,
		system: pdi.AudioSystem,
		loop: boolean,
		hint: pdi.AudioAssetHint,
		offset: number | undefined,
		loopOffset: number | undefined
	) {
		super(id, assetPath, duration, system, loop, hint, offset, loopOffset);
	}
	_load(_loader: pdi.AssetLoadHandler): void {
		// do nothing
	}
}
export class VideoAsset extends pci.VideoAsset {
	asSurface(): pdi.Surface {
		return null!;
	}
	getPlayer(): pdi.VideoPlayer {
		return null!;
	}
	_load(_loader: pdi.AssetLoadHandler): void {
		return null!;
	}
}

export class Surface extends pci.Surface {
	constructor(width: number, height: number, drawable?: any) {
		super(width, height, drawable);
	}

	renderer(): pdi.Renderer {
		return null!;
	}
	isPlaying(): boolean {
		return false;
	}
	destroy(): void {
		// do nothing
	}
	destroyed(): boolean {
		return false;
	}
}
