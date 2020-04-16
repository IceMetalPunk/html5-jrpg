import Entity from './entity.js';
import {SPRITES} from '../constants.js';
import game from '../game.js';

export default class Character extends Entity {
    constructor(x = 0, y = 0) {
        super(x, y, SPRITES.MAIN_CHAR_UP);
        this.spriteSpeed = 0.2;
    }
    draw() {
        const keyboard = game.inputs.keyboard;
        const {camera, canvas} = game;

        const sp = keyboard.isPressed('Shift') ? 4 : 2;
        const xsp = sp * (keyboard.isPressed('ArrowRight') - keyboard.isPressed('ArrowLeft'));
        const ysp = sp * (keyboard.isPressed('ArrowDown') - keyboard.isPressed('ArrowUp'));
        this.x += xsp;
        this.y += ysp;
        if (xsp === 0 && ysp === 0) {
            this.spriteSpeed = 0;
            this.sprite.setIndex(1);
        } else {
            this.spriteSpeed = 0.1 * sp;
        }
        if ((xsp > 0 && this.x > -camera.x + canvas.width - this.sprite.frameWidth * 1.5) ||
            (xsp < 0 && this.x < -camera.x + this.sprite.frameWidth / 2)) {
            camera.hspeed = -xsp;
        } else {
            camera.hspeed = 0;
        }
        if ((ysp > 0 && this.y > -camera.y + canvas.height - this.sprite.frameHeight * 1.5) ||
            (ysp < 0 && this.y < -camera.y + this.sprite.frameHeight / 2)) {
            camera.vspeed = -ysp;
        } else {
            camera.vspeed = 0;
        }
        super.draw();
    }
};