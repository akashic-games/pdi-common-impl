import type * as pdi from "@akashic/pdi-types";
import { ExceptionFactory } from "./ExceptionFactory";

/**
 * 描画領域を表すクラス。
 *
 * このクラスのインスタンスは、エンジンによって暗黙に生成される。
 * ゲーム開発者はこのクラスのインスタンスを明示的に生成する必要はなく、またできない。
 */
export abstract class Surface implements pdi.Surface, pdi.CommonSize {
	/**
	 * 描画領域の幅。
	 * この値を直接書き換えてはならない。
	 */
	width: number;

	/**
	 * 描画領域の高さ。
	 * この値を直接書き換えてはならない。
	 */
	height: number;

	/**
	 * 描画可能な実体。
	 * 具体的には renderer().drawImage() の実装が描画対象として利用できる値。
	 * @private
	 */
	_drawable: any;

	/**
	 * 本Surfaceが破棄済であるかを示す値。
	 * @private
	 */
	_destroyed!: boolean; // 破棄時に一度だけ代入する特殊なフィールドなため、初期値を代入しない

	/**
	 * `Surface` のインスタンスを生成する。
	 * @param width 描画領域の幅（整数値でなければならない）
	 * @param height 描画領域の高さ（整数値でなければならない）
	 * @param drawable 描画可能な実体。省略された場合、 `undefined`
	 */
	constructor(width: number, height: number, drawable?: any) {
		if (width % 1 !== 0 || height % 1 !== 0) {
			throw ExceptionFactory.createAssertionError("Surface#constructor: width and height must be integers");
		}

		this.width = width;
		this.height = height;
		this._drawable = drawable;
		// this._destroyedは破棄時に一度だけ代入する特殊なフィールドなため、コンストラクタで初期値を代入しない
	}

	/**
	 * このSurfaceへの描画手段を提供するRendererを生成して返す。
	 */
	abstract renderer(): pdi.Renderer;

	/**
	 * このSurfaceが動画を再生中であるかどうかを判定する。
	 */
	abstract isPlaying(): boolean;

	/**
	 * このSurfaceの破棄を行う。
	 * 以後、このSurfaceを利用することは出来なくなる。
	 */
	destroy(): void {
		this._destroyed = true;
	}

	/**
	 * このSurfaceが破棄済であるかどうかを判定する。
	 */
	destroyed(): boolean {
		// _destroyedはundefinedかtrueなため、常にbooleanが返すように!!演算子を用いる
		return !!this._destroyed;
	}
}
