var resizeTimeout = null;
var resizeCallbacks = [], scrollCallbacks = [];

window.addEventListener("load", () => {
    document.querySelectorAll(".js-copy").forEach(btn => btn.addEventListener("click", async () => {
        await navigator.clipboard.writeText(btn.getAttribute("data-text"));

        btn.classList.add("active");
        btn.style.cursor = "default";
        setTimeout(() => {
            btn.classList.remove("active");
            btn.style.cursor = "";
        }, 1000);
    }));

    const buttons = document.querySelectorAll("button, a");
    buttons.forEach(btn => btn.addEventListener("mousedown", () => btn.style.outline = "none"));
    document.body.addEventListener("mouseup", () => buttons.forEach(btn => {
        btn.style.outline = "";
        btn.blur();
    }));
});

window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        resizeCallbacks.forEach(callback => callback());
    }, 50);
});
window.addEventListener("scroll", () => {
    scrollCallbacks.forEach(callback => callback());
});