import type * as pdi from "@akashic/pdi-types";
import { Asset } from "./Asset";

/**
 * 音リソースを表すクラス。
 * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
 * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
 * Scene#assets、またはGame#assetsによって取得して利用する。
 *
 * AudioAsset#playを呼び出す事で、その音を再生することが出来る。
 */
export abstract class AudioAsset extends Asset implements pdi.AudioAsset {
	type: "audio" = "audio";
	data: any;
	duration: number;
	loop: boolean;
	hint: pdi.AudioAssetHint;
	offset: number;

	/**
	 * @private
	 */
	_system: pdi.AudioSystem;

	/**
	 * @private
	 */
	_lastPlayedPlayer: pdi.AudioPlayer | undefined;

	constructor(
		id: string,
		assetPath: string,
		duration: number,
		system: pdi.AudioSystem,
		loop: boolean,
		hint: pdi.AudioAssetHint,
		offset: number
	) {
		super(id, assetPath);
		this.duration = duration;
		this.loop = loop;
		this.hint = hint;
		this._system = system;
		this.data = undefined;
		this.offset = offset;
	}

	play(): pdi.AudioPlayer {
		const player = this._system.createPlayer();
		player.play(this);
		this._lastPlayedPlayer = player;
		return player;
	}

	stop(): void {
		const players = this._system.findPlayers(this);
		for (let i = 0; i < players.length; ++i) players[i].stop();
	}

	inUse(): boolean {
		return this._system.findPlayers(this).length > 0;
	}

	destroy(): void {
		if (this._system) this.stop();

		this.data = undefined;
		this._system = undefined!;
		this._lastPlayedPlayer = undefined;
		super.destroy();
	}
}
