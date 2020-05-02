import AudioManager from './audio/audioManager.js';
import { TILESETS } from './constants.js';
import InputManager from './input/inputManager.js';
import Camera from './render/camera.js';

class Game {
    constructor(canv, ctx) {
        this.camera = new Camera(ctx);
        this.inputs = new InputManager(canv);
        this.entities = [];
        this.gameLoop = null;
        this.fps = 0;
        this.attach(canv, ctx);
    }
    attach(canv, ctx) {
        this.canvas = canv;
        this.context = ctx;
        this.camera.attach(ctx);
        this.inputs.attach(canv);
    }
    tick() {
        this.camera.update();
        this.context.clearRect(-this.camera.x, -this.camera.y, this.canvas.width, this.canvas.height);
        for (let tileSet of Object.keys(TILESETS)) {
            TILESETS[tileSet].render(0,0);
        }
        this.entities.forEach(entity => {
            entity.draw();
        });
    }
    start(fps = 30) {
        this.inputs.mouse.listen('press', button => {
            if (button === 0) {
                AudioManager.playSound('SWORD');
            }
        });
        this.stop();
        this.fps = fps;
        this.gameLoop = window.setInterval(this.tick.bind(this), 1000/fps);
    }
    stop() {
        this.fps = 0;
        if (this.gameLoop) {
            window.clearInterval(this.gameLoop);
        }
    }
}
export default new Game();