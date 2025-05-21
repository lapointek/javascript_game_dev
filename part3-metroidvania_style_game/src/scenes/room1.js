import { makePlayer } from "../entities/player.js";
import { setBackgroundColor, setMapColliders } from "./roomUtils.js";

export function room1(k, roomData) {
    // color background of canvas
    setBackgroundColor(k, "#a2aed5");

    // Camera
    k.camScale(4);
    k.camPos(170, 100);
    k.setGravity(1000);

    const roomLayers = roomData.layers;

    const map = k.add([k.pos(0, 0), k.sprite("room1")]);
    const colliders = [];
    const positions = [];
    const cameras = [];
    for (const layer of roomLayers) {
        if (layer.name === "cameras") {
            cameras.push(...layer.objects);
        }

        if (layer.name === "positions") {
            positions.push(...layer.objects);
            continue;
        }

        if (layer.name === "colliders") {
            // pushing all roomdData layers into colliders array
            colliders.push(...layer.objects);
            break;
        }
    }
    setMapColliders(k, map, colliders);
    const player = map.add(makePlayer(k));
}
