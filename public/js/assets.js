export const SPRITE_DEFS = Object.freeze({
    MAIN_CHAR_UP: {
        name: 'MAIN_CHAR',
        url: './img/characters/npc/mainChar.png',
        frames: 3,
        slices: [0,0,24,32,0]
    },
    MAIN_CHAR_RIGHT: {
        name: 'MAIN_CHAR',
        url: './img/characters/npc/mainChar.png',
        frames: 3,
        slices: [0,32,24,32,0]
    }
});

export const AUDIO_DEFS = Object.freeze({
    MAIN_BGM: {
        name: 'MAIN_BGM',
        url: './audio/bgm/stiffened village by Spring.ogg',
        loop: true
    },
    SWORD: {
        name: 'SWORD',
        url: './audio/sfx/battle/sword-unsheathe.wav',
        loop: false
    }
});

export const TILESET_DEFS = Object.freeze({
    MAIN_TILES: {
        name: 'MAIN_TILES',
        url: './tilesets/main_tiles.json'
    }
})