import type * as pdi from "@akashic/pdi-types";
import type { AudioAsset } from "./AudioAsset";
import type { AudioPlayer } from "./AudioPlayer";
import type { GlyphFactory } from "./GlyphFactory";
import type { ImageAsset } from "./ImageAsset";
import type { ScriptAsset } from "./ScriptAsset";
import type { Surface } from "./Surface";
import type { TextAsset } from "./TextAsset";
import type { VideoAsset } from "./VideoAsset";

/**
 * リソースの生成を行うクラス。
 *
 * このクラス (の実装クラス) のインスタンスはエンジンによって生成される。ゲーム開発者が生成する必要はない。
 * またこのクラスの各種アセット生成メソッドは、エンジンによって暗黙に呼び出されるものである。
 * 通常ゲーム開発者が呼び出す必要はない。
 */
export abstract class ResourceFactory implements pdi.ResourceFactory {
	abstract createImageAsset(id: string, assetPath: string, width: number, height: number): ImageAsset;

	abstract createVideoAsset(
		id: string,
		assetPath: string,
		width: number,
		height: number,
		system: pdi.VideoSystem,
		loop: boolean,
		useRealSize: boolean
	): VideoAsset;

	abstract createAudioAsset(
		id: string,
		assetPath: string,
		duration: number,
		system: pdi.AudioSystem,
		loop: boolean,
		hint: pdi.AudioAssetHint,
		offset?: number
	): AudioAsset;

	abstract createTextAsset(id: string, assetPath: string): TextAsset;

	abstract createAudioPlayer(system: pdi.AudioSystem): AudioPlayer;

	abstract createScriptAsset(id: string, assetPath: string): ScriptAsset;

	/**
	 * Surface を作成する。
	 * 与えられたサイズで、ゲーム開発者が利用できる描画領域 (`Surface`) を作成して返す。
	 * 作成された直後のSurfaceは `Renderer#clear` 後の状態と同様であることが保証される。
	 * @param width 幅(ピクセル、整数値)
	 * @param height 高さ(ピクセル、整数値)
	 */
	abstract createSurface(width: number, height: number): Surface;

	/**
	 * GlyphFactory を作成する。
	 *
	 * @param fontFamily フォントファミリ。フォント名、またはそれらの配列で指定する。
	 * @param fontSize フォントサイズ
	 * @param baselineHeight 描画原点からベースラインまでの距離。生成する `g.Glyph` は
	 *                       描画原点からこの値分下がったところにベースラインがあるかのように描かれる。省略された場合、 `fontSize` と同じ値として扱われる
	 * @param fontColor フォントの色。省略された場合、 `"black"` として扱われる
	 * @param strokeWidth ストローク(縁取り線)の幅。省略された場合、 `0` として扱われる
	 * @param strokeColor ストロークの色。省略された場合、 `"black"` として扱われる
	 * @param strokeOnly ストロークのみを描画するか否か。省略された場合、偽として扱われる
	 * @param fontWeight フォントウェイト。省略された場合、 `"normal"` として扱われる
	 *
	 * `fontFamily` に指定できる値は環境に依存する。
	 * 少なくとも `"sans-serif"`, `"serif"`, `"monospace"` (それぞれサンセリフ体、セリフ体、等幅の字体) は有効な値である。
	 * ただし `fontFamily` は参考値であり、環境によってはそれらの字体で描かれるとは限らない。
	 */
	abstract createGlyphFactory(
		fontFamily: string | string[],
		fontSize: number,
		baselineHeight?: number,
		fontColor?: string,
		strokeWidth?: number,
		strokeColor?: string,
		strokeOnly?: boolean,
		fontWeight?: pdi.FontWeightString
	): GlyphFactory;
}
