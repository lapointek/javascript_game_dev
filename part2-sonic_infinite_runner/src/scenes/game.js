import { makeMotobug } from "../entities/motobug";
import { makeSonic } from "../entities/sonic";
import k from "../kaplayCtx";

export default function game() {
    // set gravity in game
    k.setGravity(3100);

    const bgPieceWidth = 1920;
    const bgPieces = [
        // add component to scene and determine position
        k.add([
            k.sprite("chemical-bg"),
            k.pos(0, 0),
            k.scale(2),
            k.opacity(0.8),
        ]),
        k.add([
            k.sprite("chemical-bg"),
            k.pos(bgPieceWidth, 0),
            k.scale(2),
            k.opacity(0.8),
        ]),
    ];

    const platformWidth = 1280;
    // add platform sprite
    const platforms = [
        k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
        k.add([k.sprite("platforms"), k.pos(platformWidth, 450), k.scale(4)]),
    ];

    const sonic = makeSonic(k.vec2(200, 745));
    sonic.setControls();
    sonic.setEvents();
    // collide with sprite that has enemy as a tag, and destroy the enemy sprite
    sonic.onCollide("enemy", (enemy) => {
        if (!sonic.isGrounded()) {
            k.play("destroy", { volume: 0.5 });
            k.play("hyper-ring", { volume: 0.5 });
            k.destroy(enemy);
            // play jump animation
            sonic.play("jump");
            // make sonic jump
            sonic.jump();
            return;
        }
        k.play("hurt", { volume: 0.5 });
        // TODO
        k.go("gameover");
    });

    // increase speed of platform sprite
    let gameSpeed = 300;
    k.loop(1, () => {
        gameSpeed += 50;
    });

    const spawnMotoBug = () => {
        const motobug = makeMotobug(k.vec2(1950, 773));
        // on update loop for motobug
        motobug.onUpdate(() => {
            if (gameSpeed < 3000) {
                motobug.move(-(gameSpeed + 300), 0);
                return;
            }
            // motobug moves at same game speed as platform
            motobug.move(-gameSpeed, 0);
        });
        // destroy motoBug when offscreen to the left
        motobug.onExitScreen(() => {
            if (motobug.pos.x < 0) k.destroy(motobug);
        });
        // spawn motobug after a certain random time
        const waitTime = k.rand(0.5, 2.5);
        k.wait(waitTime, spawnMotoBug);
    };
    spawnMotoBug();

    const spawnRing = () => {
        // const ring =
    };

    // add collision box on platform
    k.add([
        k.rect(1920, 300),
        k.opacity(0),
        k.area(),
        k.pos(0, 832),
        k.body({ isStatic: true }),
    ]);

    k.onUpdate(() => {
        // move game object chemical-bg to left
        if (bgPieces[1].pos.x < 0) {
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
            bgPieces.push(bgPieces.shift());
        }
        bgPieces[0].move(-100, 0);
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

        bgPieces[0].moveTo(bgPieces[0].pos.x, -sonic.pos.y / 10 - 50);
        bgPieces[1].moveTo(bgPieces[1].pos.x, -sonic.pos.y / 10 - 50);

        // move platform
        if (platforms[1].pos.x < 0) {
            platforms[0].moveTo(platforms[1].pos.x + platformWidth * 4, 450);
            platforms.push(platforms.shift());
        }
        platforms[0].move(-gameSpeed, 0);
        platforms[1].moveTo(platforms[0].pos.x + platformWidth * 4, 450);
    });
}
