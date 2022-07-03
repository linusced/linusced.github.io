var resizeTimeout = null;
var resizeCallbacks = [], instantResizeCallbacks = [];

window.addEventListener("load", () => {
    const buttons = document.querySelectorAll("button, a");
    buttons.forEach(btn => btn.addEventListener("mousedown", () => btn.style.outline = "none"));
    document.body.addEventListener("mouseup", () => buttons.forEach(btn => {
        btn.style.outline = "";
        btn.blur();
    }));
    document.body.addEventListener("touchstart", () => document.body.classList.add("touch"));
});

window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        resizeCallbacks.forEach(callback => callback());
    }, 100);

    instantResizeCallbacks.forEach(callback => callback());
});