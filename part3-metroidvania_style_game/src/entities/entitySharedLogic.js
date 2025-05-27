export async function makeBlink(k, entity, timespan) {
    await k.tween(
        entity.opacity,
        o,
        timespan,
        (val) => (entity.opacity = val),
        k.easings.linear
    );
    k.tween(
        entity.opacity,
        1,
        timespan,
        (val) => (entity.opacity = val),
        k.easings.linear
    );
}
