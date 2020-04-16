class AudioManager {
    constructor() {
        this.sounds = new Map();
    }

    load(name, url, loop = false) {
        if (this.sounds.has(name)) {
            return Promise.resolve(this.sounds.get(name));
        }
        return new Promise((res, rej) => {
            const sound = new Audio();
            sound.oncanplaythrough = () => {
                this.sounds.set(name, sound);
                sound.loop = loop;
                res(sound);
            };
            sound.onerror = er => rej(er);
            sound.src = url;
        });
    }
    get(name) {
        return this.sounds.get(name);
    }
    async playSound(name) {
        const sound = this.get(name);
        if (sound) {
            await sound.play();
        }
    }
};
export default new AudioManager();