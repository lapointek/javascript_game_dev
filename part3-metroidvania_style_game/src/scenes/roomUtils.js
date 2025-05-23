import { state } from "../state/globalStateManager.js";

export function setBackgroundColor(k, hexColorCode) {
    k.add([
        // create rectangle
        k.rect(k.width(), k.height()),
        k.color(k.Color.fromHex(hexColorCode)),
        // gameobject not affected by camera, remain in same position
        k.fixed(),
    ]);
}

export function setMapColliders(k, map, colliders) {
    for (const collider of colliders) {
        if (collider.polygon) {
            const coordinates = [];
            for (const point of collider.polygon) {
                coordinates.push(k.vec2(point.x, point.y));
            }

            map.add([
                k.pos(collider.x, collider.y),
                // hit box
                k.area({
                    // takes a vector2
                    shape: new k.Polygon(coordinates),
                    // tag to ignore collider when colliding with eachother
                    collisionIgnore: ["collider"],
                }),
                // tag name
                k.body({ isStatic: true }),
                "collider",
                collider.type,
            ]);
            continue;
        }
        if (collider.name === "boss-barrier") {
            // TODO
            continue;
        }
        map.add([
            k.pos(collider.x, collider.y),
            k.area({
                shape: new k.Rect(k.vec2(0), collider.width, collider.height),
                collisionIgnore: ["collider"],
            }),
            // body act as a wall
            k.body({ isStatic: true }),
            "collider",
            collider.type,
        ]);
    }
}

// Camera
export function setCameraControls(k, player, map, roomData) {
    k.onUpdate(() => {
        // if player is in boss fight return
        if (state.current().playerInBossFight) return;

        // if map position is greater than players position than clamp camera position to bounds of map
        if (map.pos.x + 160 > player.pos.x) {
            k.camPos(map.pos.x + 160, k.camPos().y);
            return;
        }

        if (player.pos.x > map.pos.x + roomData.width * roomData.tilewidth - 160) {
            // clamp camera to room
            k.camPos(map.pos.x + roomData.width * roomData.tilewidth - 160, k.camPos().y);
            return;
        }
        // camera follow player on x axis and not y axis
        k.camPos(player.pos.x, k.camPos().y);
    });
}

// Camera
export function setCameraZones(k, map, cameras) {
    for (const camera of cameras) {
        const cameraZone = map.add([
            k.area({
                shape: new k.Rect(k.vec2(0), camera.width, camera.height),
                collisionIgnore: ["collider"],
            }),
            k.pos(camera.x, camera.y),
        ]);
        // on collision of a game object. EventListener
        cameraZone.onCollide("player", () => {
            // get current camera position. if x position not equal to properties first element
            if (k.camPos().x !== camera.properties[0].value) {
                k.tween(
                    k.camPos().y,
                    // value in json
                    camera.properties[0].value,
                    // transition time
                    0.8,
                    // function to use new value
                    (val) => k.camPos(k.camPos().x, val),
                    k.easings.linear
                );
            }
        });
    }
}
