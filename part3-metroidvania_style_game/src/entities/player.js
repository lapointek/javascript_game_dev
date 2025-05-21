import { state } from "../state/globalStateManager.js";

export function makePlayer(k) {
    // create gameobject player
    return k.make([
        k.pos(),
        k.sprite("player"),
        // hit box
        k.area({
            shape: new k.Rect(k.vec2(0, 18), 12, 12),
        }),
        // position
        k.anchor("center"),
        k.body({ mass: 100, jumpForce: 320 }),
        k.doubleJump(state.current()),
        {},
    ]);
}
