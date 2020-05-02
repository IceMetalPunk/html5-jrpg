const keys = new Set();
const keyListeners = {
    press: [],
    release: []
};
class KeyboardManager {
    constructor() {
        this.pressFn = this.press.bind(this);
        this.releaseFn = this.release.bind(this);
        this.attach();
    }
    attach() {
        document.addEventListener('keydown', this.pressFn);
        document.addEventListener('keyup', this.releaseFn);
    }
    detach() {
        document.removeEventListener('keydown', this.pressFn);
        document.removeEventListener('keyup', this.releaseFn);
    }
    isPressed(key) {
        return keys.has(key);
    }
    listen(type, cb) {
        keyListeners[type].push(cb);
    }
    unlisten(type, cb) {
        keyListeners[type] = keyListeners[type].filter(fn => fn !== cb);
    }
    fireListeners(type, key) {
        keyListeners[type].forEach(cb => cb(key));
    }
    press(ev) {
        if (!this.isPressed(ev.key)) {
            this.fireListeners('press', ev.key);
        }
        keys.add(ev.key);
    }
    release(ev) {
        if (this.isPressed(ev.key)) {
            this.fireListeners('release', ev.key);
        }
        keys.delete(ev.key);
    }
};

const buttons = new Set();
const mouseListeners = {
    press: [],
    release: []
};
let [mouseX, mouseY] = [null, null];
class MouseManager {
    constructor(canvas) {
        this.pressFn = this.press.bind(this);
        this.releaseFn = this.release.bind(this);
        this.moveFn = this.mouseMove.bind(this);
        this.canvas = canvas;
        if (canvas) {
            this.attach(canvas);
        }
    }
    get pos() {
        return {x: mouseX, y: mouseY};
    }
    attach(canvas) {
        if (canvas) {
            canvas.addEventListener('mousedown', this.pressFn);
            canvas.addEventListener('mouseup', this.releaseFn);
            canvas.addEventListener('mousemove', this.moveFn);
        }
    }
    detach() {
        if (this.canvas) {
            this.canvas.removeEventListener('mousedown', this.pressFn);
            this.canvas.removeEventListener('mouseup', this.releaseFn);
            this.canvas.removeEventListener('mousemove', this.moveFn);
        }
    }
    isPressed(button) {
        return buttons.has(button);
    }
    listen(type, cb) {
        mouseListeners[type].push(cb);
    }
    unlisten(type, cb) {
        mouseListeners[type] = mouseListeners[type].filter(fn => fn !== cb);
    }
    fireListeners(type, button) {
        mouseListeners[type].forEach(cb => cb(button));
    }
    press(ev) {
        if (!this.isPressed(ev.button)) {
            this.fireListeners('press', ev.button);
        }
        buttons.add(ev.button);
    }
    release(ev) {
        if (this.isPressed(ev.button)) {
            this.fireListeners('release', ev.button);
        }
        buttons.delete(ev.button);
    }
    mouseMove(ev) {
        mouseX = ev.offsetX;
        mouseY = ev.offsetY;
    }
};

export default class InputManager {
    constructor(canvas) {
        this.keyboard = new KeyboardManager();
        this.mouse = new MouseManager(canvas);
        this.canvas = canvas;
    }
    attach(canvas) {
        this.mouse.detach();
        this.mouse.attach(canvas);
        this.canvas = canvas;
    }
}