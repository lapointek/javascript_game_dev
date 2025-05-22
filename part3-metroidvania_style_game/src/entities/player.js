import { state } from "../state/globalStateManager.js";

export function makePlayer(k, initialPos) {
    // create gameobject player
    return k.make([
        k.pos(initialPos),
        k.sprite("player"),
        // hit box
        k.area({
            shape: new k.Rect(k.vec2(0, 18), 12, 12),
        }),
        // position
        k.anchor("center"),
        k.body({ mass: 100, jumpForce: 320 }),
        // allow player to jump twice
        k.doubleJump(state.current().isDoubleJumpUnlocked ? 2 : 1),
        k.opacity(),
        k.health(state.current().playerHp),
        // player tag
        "player",
        {
            speed: 150,
            isAttacking: false,
            // player controls
            setControls() {
                this.controlHandlers = [];
                this.controlHandlers.push(
                    k.onKeyPress((key) => {
                        if (key === "x") {
                            // play jump animation when current animation is not jump
                            if (this.curAnim() !== "jump") this.play("jump");
                            this.doubleJump();
                        }
                        if (
                            key === "z" &&
                            this.curAnim() !== "attack" &&
                            this.isGrounded()
                        ) {
                            this.isAttacking = true;
                            // hit box
                            this.add([
                                k.pos(this.flipX ? -25 : 0, 10),
                                k.area({
                                    shape: new k.Rect(k.vec2(0), 25, 10),
                                }),
                                "sword-hitbox",
                            ]);
                            this.play("attack");
                            // animation name
                            this.onAimEnd((anime) => {
                                // if animation is attack
                                if (anim === "attack") {
                                    // get swordHitBox
                                    const swordHitBox = k.get("sword-hitbox", {
                                        recursive: true,
                                    })[0];
                                    // if swordHitBox exists then destroy the game object
                                    if (swordHitBox) k.destroy(swordHitBox);
                                    this.isAttacking = false;
                                    // play idle animation after attack is finished
                                    this.play("idle");
                                }
                            });
                        }
                    })
                );

                this.controlHandlers.push(
                    k.onKeyDown((key) => {
                        // if left key is pressed and is not attacking
                        if (key === "left" && !this.isAttacking) {
                            // if current animation is run and player is grounded
                            if (this.curAnim() !== "run" && this.isGrounded()) {
                                this.play("run");
                            }
                            // flip player when pressing left key
                            this.flipX = true;
                            this.move(-this.speed, 0);
                            return;
                        }

                        if (key === "right" && !this.isAttacking) {
                            // if current animation is run and player is grounded
                            if (this.curAnim() !== "run" && this.isGrounded()) {
                                this.play("run");
                            }
                            this.flipX = false;
                            this.move(this.speed, 0);
                            return;
                        }
                    })
                );
            },
        },
    ]);
}
