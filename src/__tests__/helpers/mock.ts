import * as g from "@akashic/akashic-engine";
import * as pdi from "../../";

export class AudioSystem implements g.AudioSystemLike {
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
	findPlayers(_asset: g.AudioAssetLike): g.AudioPlayerLike[] {
		return [];
	}
	createPlayer(): g.AudioPlayerLike {
		return null!;
	}
	requestDestroy(_asset: g.AudioAssetLike): void {
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

export class VideoSystem implements g.VideoSystemLike {}

export class AudioAsset extends pdi.AudioAsset {
	constructor(
		_necessaryRetryCount: number,
		id: string,
		assetPath: string,
		duration: number,
		system: g.AudioSystemLike,
		loop: boolean,
		hint: g.AudioAssetHint
	) {
		super(id, assetPath, duration, system, loop, hint);
	}
	_load(_loader: g.AssetLoadHandler): void {
		// do nothing
	}
}
export class VideoAsset extends pdi.VideoAsset {
	asSurface(): g.SurfaceLike {
		return null!;
	}
	getPlayer(): g.VideoPlayerLike {
		return null!;
	}
	_load(_loader: g.AssetLoadHandler): void {
		return null!;
	}
}

export class Surface extends pdi.Surface {
	constructor(width: number, height: number, drawable?: any) {
		super(width, height, drawable);
	}

	renderer(): g.RendererLike {
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
