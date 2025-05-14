import k from "../kaplayCtx";

export function makeSonic(pos) {
    const sonic = k.add([
        k.sprite("sonic", { anim: "run" }),
        k.scale(4),
        k.area(),
        k.anchor("center"),
        k.pos(pos),
        k.body({ jumpForce: 1500 }),
        {
            setControls() {
                // on button press sprite jump
                k.onButtonPress("jump", () => {
                    if (this.isGrounded()) {
                        // plays animation
                        this.play("jump");
                        this.jump();
                        // play a sound
                        k.play("jump", { volume: 0.2 });
                    }
                });
            },
            setEvents() {
                this.onGround(() => {
                    this.play("run");
                });
            },
        },
    ]);

    return sonic;
}
