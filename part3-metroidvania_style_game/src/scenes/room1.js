import { setBackgroundColor, setMapColliders } from "./roomUtils.js";

export function room1(k, roomData) {
    // color background of canvas
    setBackgroundColor(k, "#a2aed5");

    const roomLayers = roomData.layers;

    const map = k.add([k.pos(0, 0), k.sprite("room1")]);
    const colliders = [];
    for (const layer of roomLayers) {
        if (layer.name === "colliders") {
            // pushing all roomdData layers into colliders array
            colliders.push(...layer.objects);
            break;
        }
    }
    setMapColliders(k, map, colliders);
}
