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
