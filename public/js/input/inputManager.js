class KeyboardManager {
    constructor() {
        this.keys = new Set();
        this.pressFn = this.press.bind(this);
        this.releaseFn = this.release.bind(this);
        this.listeners = {
            press: [],
            release: []
        };
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
        return this.keys.has(key);
    }
    listen(type, cb) {
        this.listeners[type].push(cb);
    }
    unlisten(type, cb) {
        this.listeners[type] = this.listeners[type].filter(fn => fn !== cb);
    }
    fireListeners(type, key) {
        this.listeners[type].forEach(cb => cb(key));
    }
    press(ev) {
        if (!this.isPressed(ev.key)) {
            this.fireListeners('press', ev.key);
        }
        this.keys.add(ev.key);
    }
    release(ev) {
        if (this.isPressed(ev.key)) {
            this.fireListeners('release', ev.key);
        }
        this.keys.delete(ev.key);
    }
};

class MouseManager {
    constructor(canvas) {
        this.buttons = new Set();
        this.pressFn = this.press.bind(this);
        this.releaseFn = this.release.bind(this);
        this.moveFn = this.mouseMove.bind(this);
        this.canvas = canvas;
        this.mouseX = null;
        this.mouseY = null;
        this.listeners = {
            press: [],
            release: []
        };
        if (canvas) {
            this.attach(canvas);
        }
    }
    get pos() {
        return {x: this.mouseX, y: this.mouseY};
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
        return this.buttons.has(button);
    }
    listen(type, cb) {
        this.listeners[type].push(cb);
    }
    unlisten(type, cb) {
        this.listeners[type] = this.listeners[type].filter(fn => fn !== cb);
    }
    fireListeners(type, button) {
        this.listeners[type].forEach(cb => cb(button));
    }
    press(ev) {
        if (!this.isPressed(ev.button)) {
            this.fireListeners('press', ev.button);
        }
        this.buttons.add(ev.button);
    }
    release(ev) {
        if (this.isPressed(ev.button)) {
            this.fireListeners('release', ev.button);
        }
        this.buttons.delete(ev.button);
    }
    mouseMove(ev) {
        this.mouseX = ev.offsetX;
        this.mouseY = ev.offsetY;
    }
};

export default class InputManager {
    constructor(canvas) {
        this.keyboard = new KeyboardManager(canvas);
        this.mouse = new MouseManager(canvas);
        this.canvas = canvas;
    }
    attach(canvas) {
        this.mouse.detach();
        this.mouse.attach(canvas);
        this.canvas = canvas;
    }
}