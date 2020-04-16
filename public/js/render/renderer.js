export default class Renderer {
    constructor(canv, ctx) {
        this.attach(canv, ctx);
    }
    attach(canv, ctx) {
        this.canvas = canv;
        this.context = ctx;
    }
    render(x,y) {}
};