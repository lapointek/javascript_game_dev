import { k } from "./kaboomLoader.js";
import { room1 } from "./scenes/room1.js";
import { room2 } from "./scenes/room2.js";

// scenes
k.scene("room1", () => {
    room1(k);
});

k.scene("room2", () => {
    room2();
});

k.scene("intro", () => {});

// default scene
k.go("room1");
