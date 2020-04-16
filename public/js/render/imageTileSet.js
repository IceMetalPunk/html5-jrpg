import imageRenderer from './imageRenderer.js';

export default class ImageTileSet {
    constructor(name, size = [0,0]) {
        this.imageName = name;
        this.tiles = [];
        this.image = null;
        this.url = null;
        this.tileSize = size;
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
    async loadFromJson(url) {
        try {
            const resp = await fetch(url);
            const json = await resp.json();
            this.imageName = json.name || this.imageName;
            this.tileSize = json.tileSize || this.tileSize;
            await this.load(json.imageUrl);
            this.setTiles(json.tiles);
        } catch (er) {
            console.error(er);
        }
    }
    setTiles(tiles) {
        this.tiles = tiles;
    }
    setTileAt(row, col, tile) {
        this.tiles[row][col] = tile;
    }
    render(x,y) {
        let xx = 0;
        let yy = 0;
        if (this.image && this.tiles) {
            for (let row = 0; row < this.tiles.length; ++row) {
                if (Array.isArray(this.tiles[row])) {
                    for (let col = 0; col < this.tiles[row].length; ++col) {
                        const tile = this.tiles[row][col];
                        if (tile) {
                            imageRenderer.render(this.imageName, x + xx, y + yy, tile.x, tile.y, this.tileSize[0], this.tileSize[1], this.tileSize[0], this.tileSize[1]);
                        }
                        xx += this.tileSize[0];
                    }
                }
                xx = 0;
                yy += this.tileSize[1];
            }
        }
    }
};