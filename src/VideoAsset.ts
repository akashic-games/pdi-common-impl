import type * as pdi from "@akashic/pdi-types";
import { Asset } from "./Asset";

/**
 * 動画リソースを表すクラス。
 * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
 * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
 * Scene#assets、またはGame#assetsによって取得して利用する。
 */
export abstract class VideoAsset extends Asset implements pdi.VideoAsset {
	type: "video" = "video";
	width: number;
	height: number;

	/**
	 * 動画の本来の幅。
	 *
	 * この値は参照のためにのみ公開されている。ゲーム開発者はこの値を変更してはならない。
	 */
	realWidth: number;

	/**
	 * 動画の本来の高さ。
	 *
	 * この値は参照のためにのみ公開されている。ゲーム開発者はこの値を変更してはならない。
	 */
	realHeight: number;

	/**
	 * @private
	 */
	_system: pdi.VideoSystem;

	/**
	 * @private
	 */
	_loop: boolean;

	/**
	 * @private
	 */
	_useRealSize: boolean;

	constructor(
		id: string,
		assetPath: string,
		width: number,
		height: number,
		system: pdi.VideoSystem,
		loop: boolean,
		useRealSize: boolean
	) {
		super(id, assetPath);
		this.width = width;
		this.height = height;
		this.realWidth = 0;
		this.realHeight = 0;
		this._system = system;
		this._loop = loop;
		this._useRealSize = useRealSize;
	}

	abstract asSurface(): pdi.Surface;

	play(_loop?: boolean): pdi.VideoPlayer {
		this.getPlayer().play(this);
		return this.getPlayer();
	}

	stop(): void {
		this.getPlayer().stop();
	}

	abstract getPlayer(): pdi.VideoPlayer;

	destroy(): void {
		this._system = undefined!;
		super.destroy();
	}
}
