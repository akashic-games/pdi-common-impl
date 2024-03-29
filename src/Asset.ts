import type * as pdi from "@akashic/pdi-types";
import { Trigger } from "@akashic/trigger";

/**
 * 各種リソースを表すクラス。
 * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
 * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
 * Scene#assets、またはGame#assetsによって取得して利用する。
 */
export abstract class Asset implements pdi.Asset {
	// @ts-ignore 妥当な値を派生クラスが代入しているのでここでは値を入れない
	type: string;
	id: string;
	path: string;
	originalPath: string;
	onDestroyed: Trigger<pdi.Asset>;

	constructor(id: string, path: string) {
		this.id = id;
		this.originalPath = path;
		this.path = this._assetPathFilter(path);
		this.onDestroyed = new Trigger<pdi.Asset>();
	}

	destroy(): void {
		this.onDestroyed.fire(this);
		this.id = undefined!;
		this.originalPath = undefined!;
		this.path = undefined!;
		this.onDestroyed.destroy();
		this.onDestroyed = undefined!;
	}

	destroyed(): boolean {
		return this.id === undefined;
	}

	/**
	 * 現在利用中で解放出来ない `Asset` かどうかを返す。
	 * 戻り値は、利用中である場合真、でなければ偽である。
	 *
	 * 本メソッドは通常 `false` が返るべきである。
	 * 例えば `Sprite` の元画像として使われているケース等では、その `Sprite` によって `Asset` は `Surface` に変換されているべきで、
	 * `Asset` が利用中で解放出来ない状態になっていない事を各プラットフォームで保障する必要がある。
	 *
	 * 唯一、例外的に本メソッドが `true` を返すことがあるのは音楽を表す `Asset` である。
	 * BGM等はシーンをまたいで演奏することもありえる上、
	 * 演奏中のリソースのコピーを常に各プラットフォームに強制するにはコストがかかりすぎるため、
	 * 本メソッドは `true` を返し、適切なタイミングで `Asset` が解放されるよう制御する必要がある。
	 */
	inUse(): boolean {
		return false;
	}

	/**
	 * アセットの読み込みを行う。
	 *
	 * ゲーム開発者がアセット読み込み失敗時の挙動をカスタマイズする際、読み込みを再試行する場合は、
	 * (このメソッドではなく) `AssetLoadFailureInfo#cancelRetry` に真を代入する必要がある。
	 *
	 * @param loader 読み込み結果の通知を受け取るハンドラ
	 * @private
	 */
	abstract _load(loader: pdi.AssetLoadHandler): void;

	/**
	 * @private
	 */
	_assetPathFilter(path: string): string {
		// 拡張子の補完・読み替えが必要なassetはこれをオーバーライドすればよい。(対応形式が限定されるaudioなどの場合)
		return path;
	}
}
