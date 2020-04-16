export default class Entity {
    constructor(x = 0, y = 0, spr = null) {
        this.x = x;
        this.y = y;
        this.sprite = spr;
        this.spriteSpeed = 0.5;
    }
    draw() {
        if (this.sprite) {
            this.sprite.advance(this.spriteSpeed);
            this.sprite.render(this.x, this.y);
        }
    }
}