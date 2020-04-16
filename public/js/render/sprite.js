import imageRenderer from './imageRenderer.js';

export default class Sprite {
    constructor(name) {
        this.imageName = name;
        this.currentFrame = 0;
        this.framesN = 0;
        this.image = null;
        this.framesStartX = 0;
        this.framesStartY = 0;
        this.frameWidth = 32;
        this.frameHeight = 32;
        this.framePadding = 0;
        this.fx = 0;
        this.fy = 0;
        this.url = null;
    }
    async copy() {
        const newSpr = new Sprite(this.imageName);
        await newSpr.load(this.url);
        newSpr.slice(this.framesN, this.framesStartX, this.framesStartY, this.frameWidth, this.frameHeight, this.framePadding);
        return newSpr;
    }
    async load(url) {
        try {
            this.image = await imageRenderer.load(this.imageName, url);
            this.url = url;
            return this.image;
        } catch (er) {
            console.error(er);
        }
    }
    slice(n = 1, xstart = 0, ystart = 0, width = this.image.width, height = this.image.height, padding = 0) {
        this.framesN = n;
        this.framesStartX = xstart;
        this.framesStartY = ystart;
        this.frameWidth = width;
        this.frameHeight = height;
        this.framePadding = padding;
        this.fx = this.framesStartX;
        this.fy = this.framesStartY;
        return this;
    }
    render(x,y) {
        if (this.image) {
            imageRenderer.render(this.imageName, x, y, this.fx, this.fy, this.frameWidth, this.frameHeight, this.frameWidth, this.frameHeight);
        }
    }
    advance(amount = 1) {
        this.currentFrame = (this.currentFrame + amount) % this.framesN;
        const xindex = Math.floor(this.currentFrame) % Math.floor((this.image.width - this.framesStartX) / (this.frameWidth + this.framePadding));
        const yindex = Math.floor(Math.floor(this.currentFrame) / Math.floor((this.image.width - this.framesStartX) / (this.frameWidth + this.framePadding)));
        this.fx = this.framesStartX + xindex * (this.frameWidth + this.framePadding);
        this.fy = this.framesStartY + yindex * (this.frameHeight + this.framePadding);
    }
    setIndex(index) {
        this.currentFrame = index;
    }
};