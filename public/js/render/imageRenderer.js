import Renderer from './renderer.js';

class ImageRenderer extends Renderer {
    constructor(canv = null, ctx = null) {
        super(canv, ctx);
        this.images = new Map();
    }

    load(name, url) {
        if (this.images.has(name)) {
            return Promise.resolve(this.images.get(name));
        }
        return new Promise((res, rej) => {
            const img = new Image();
            img.onload = () => {
                this.images.set(name, img);
                res(img);
            };
            img.onerror = er => rej(er);
            img.src = url;
        });
    }
    get(name) {
        return this.images.get(name);
    }
    render(name, x, y, sx = 0, sy = 0, swidth, sheight, width, height) {
        const img = this.get(name);
        if (img) {
            swidth = isNaN(swidth) ? img.width : swidth;
            sheight = isNaN(sheight) ? img.height : sheight;
            width = isNaN(width) ? img.width : width;
            height = isNaN(height) ? img.height : height;
            this.context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
        }
    }
};

export default new ImageRenderer();