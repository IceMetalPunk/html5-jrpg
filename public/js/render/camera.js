export default class Camera {
    constructor(ctx) {
        this.context = ctx;
        if (ctx) {
            ctx.save();
        }
        this.x = 0;
        this.y = 0;
        this.hspeed = 0;
        this.vspeed = 0;
    }
    attach(ctx) {
        if (this.context) {
            this.context.restore();
        }
        this.context = ctx;
        if (ctx) {
            ctx.save();
        }
    }
    set(x,y) {
        this.x = x;
        this.y = y;
        this.context.setTransform(1, 0, 0, 1, this.x, this.y);
    }
    get offset() {
        return {x: this.x, y: this.y};
    }
    update() {
        this.set(this.x + this.hspeed, this.y + this.vspeed);
    }
}