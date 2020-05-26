const randomCache = ('Uint32Array' in window) ? new Uint32Array(25) : (new Array(25)).fill(0);
let randomCounter = -1;
const translations = {};
let currentLang = 'en';

if (!('crypto' in window)) {
    window.crypto = {};
}
if (!('getRandomValues' in window.crypto)) {
    window.crypto.getRandomValues = ar => {
        ar.forEach((_, ind) => {
            ar[ind] = Math.round(Math.random() * 4294967295);
        });
    };
}

export default {
    loadTranslations: async (lang, url) => {
        if (lang in translations) {
            return translations[lang];
        }
        const response = await fetch(url);
        const json = await response.json();
        translations[lang] = json;
        return json;
    },
    setLanguage: lang => {
        if (lang in translations) {
            currentLang = lang;
        } else {
            throw new Error(`Error setting language: Language ${lang} has not been loaded yet!`);
        }
    },
    translate: (section, key, lang) {
        return translations[lang || currentLang][section][key];
    },
    random: () => {
        randomCounter = (randomCounter + 1) % randomCache.length;
        if (randomCounter <= 0) {
            window.crypto.getRandomValues(randomCache);
        }
        return randomCache[randomCounter] / 4294967295;
    }
};