const sounds = new Map();
class AudioManager {
    load(name, url, loop = false) {
        if (sounds.has(name)) {
            return Promise.resolve(sounds.get(name));
        }
        return new Promise((res, rej) => {
            const sound = new Audio();
            sound.oncanplaythrough = () => {
                sounds.set(name, sound);
                sound.loop = loop;
                res(sound);
            };
            sound.onerror = er => rej(er);
            sound.src = url;
        });
    }
    get(name) {
        return sounds.get(name);
    }
    async playSound(name) {
        const sound = this.get(name);
        if (sound) {
            await sound.play();
        }
    }
};
export default new AudioManager();