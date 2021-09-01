import * as pdi from "@akashic/pdi-types";
import { Asset } from "./Asset";

/**
 * ベクタ画像リソースを表すクラス。
 * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
 * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
 * Scene#assets、またはGame#assetsによって取得して利用する。
 */
export abstract class VectorImageAsset extends Asset implements pdi.VectorImageAsset {
	type: "vector-image" = "vector-image";
	width: number;
	height: number;
	hint: pdi.ImageAssetHint | undefined;

	constructor(id: string, assetPath: string, width: number, height: number, hint?: pdi.VectorImageAssetHint) {
		super(id, assetPath);
		this.width = width;
		this.height = height;
		this.hint = hint;
	}

	abstract createSurface(width: number, height: number): pdi.Surface | null;

	abstract createSurface(
		 width: number,
		 height: number,
		 sx: number,
		 sy: number,
		 sWidth: number,
		 sHeight: number
	 ): pdi.Surface | null;
}
