import { Trigger } from "@akashic/akashic-engine";
import { AudioPlayer } from "..";
import { AudioSystem } from "./helpers";

describe("test AudioPlayer", () => {
	it("初期化-music", () => {
		const system = new AudioSystem("1", 10);
		const player = new AudioPlayer(system);
		expect(player.volume).toBe(system.volume);
		expect(player.onPlay.constructor).toBe(Trigger);
		expect(player.onStop.constructor).toBe(Trigger);
		expect(player.currentAudio).toBeUndefined();
	});

	it("初期化-sound", () => {
		const system = new AudioSystem("1", 10);
		system.volume = 0.5;
		const player = new AudioPlayer(system);
		expect(player.volume).toBe(system.volume);
		expect(player.onPlay.constructor).toBe(Trigger);
		expect(player.onStop.constructor).toBe(Trigger);
		expect(player.currentAudio).toBeUndefined();
	});
});
