import imageRenderer from './render/imageRenderer.js';
import AudioManager from './audio/audioManager.js';
import Sprite from './render/sprite.js';
import {SPRITES, AUDIO, TILESETS} from './constants.js';
import {SPRITE_DEFS, AUDIO_DEFS, TILESET_DEFS} from './assets.js';
import game from './game.js';
import Character from './entities/character.js';
import ImageTileSet from './render/imageTileSet.js';

const gameScreen = document.getElementById('gameScreen');
const ctx = gameScreen.getContext('2d');
gameScreen.width = gameScreen.offsetWidth;
gameScreen.height = gameScreen.offsetHeight;

const loadSprites = async function() {
    const spriteList = Object.keys(SPRITE_DEFS);
    for (let i = 0; i < spriteList.length; ++i) {
        const name = spriteList[i];
        const def = SPRITE_DEFS[name];
        const spr = new Sprite(def.name);
        await spr.load(def.url);
        drawLoadingScreen(`Loading graphics (${Math.round(100*(i + 1)/spriteList.length)}%)... Please wait...`)
        spr.slice(def.frames, ...def.slices);
        SPRITES[name] = spr;
    }
    return Object.freeze(SPRITES);
};

const loadTileSets = async function() {
    const tilesetList = Object.keys(TILESET_DEFS);
    for (let i = 0; i < tilesetList.length; ++i) {
        const name = tilesetList[i];
        const def = TILESET_DEFS[name];
        const tileset = new ImageTileSet(def.name);
        await tileset.loadFromJson(def.url);
        drawLoadingScreen(`Loading tiles (${Math.round(100*(i + 1)/tilesetList.length)}%)... Please wait...`)
        TILESETS[name] = tileset;
    }
    return Object.freeze(TILESETS);
};

const loadSounds = async function() {
    const audioList = Object.keys(AUDIO_DEFS);
    for (let i = 0; i < audioList.length; ++i) {
        const name = audioList[i];
        const def = AUDIO_DEFS[name];
        const audio = await AudioManager.load(def.name, def.url, def.loop);
        drawLoadingScreen(`Loading audio (${Math.round(100*(i + 1)/audioList.length)}%)... Please wait...`)
        AUDIO[name] = audio;
    }
    return Object.freeze(AUDIO);
};

const drawLoadingScreen = function(text) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '12pt sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, gameScreen.width, gameScreen.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(text, gameScreen.width/2, gameScreen.height/2);
};

const setup = async function() {
    drawLoadingScreen('Loading... Please wait...');
    imageRenderer.attach(gameScreen, ctx);
    game.attach(gameScreen, ctx);
    drawLoadingScreen('Loading graphics... Please wait...');
    await loadSprites();
    drawLoadingScreen('Loading audio... Please wait...');
    await loadSounds();
    drawLoadingScreen('Loading tiles... Please wait...');
    await loadTileSets();

    AudioManager.playSound('MAIN_BGM');
    const char = new Character(gameScreen.width/2, gameScreen.height/2);
    game.entities.push(char);
    game.start();
    gameScreen.removeEventListener('click', setup);
};

gameScreen.addEventListener('click', setup);
gameScreen.addEventListener('contextmenu', e => {
    e.preventDefault();
    e.cancelBubble = true;
    e.stopPropagation();
    return false;
});
drawLoadingScreen('Click here to start.');