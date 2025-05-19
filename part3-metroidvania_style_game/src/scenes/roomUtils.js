export function setBackgroundColor(k, hexColorCode) {
    k.add([
        // create rectangle
        k.rect(k.width(), k.height()),
        k.color(k.Color.fromHex(hexColorCode)),
        // gameobject not affected by camera, remain in same position
        k.fixed(),
    ]);
}
