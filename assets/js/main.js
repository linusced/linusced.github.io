var resizeTimeout = null;
var resizeCallbacks = [];

window.addEventListener("load", () => {
    document.querySelectorAll(".js-copy").forEach(btn => btn.addEventListener("click", async () => {
        await navigator.clipboard.writeText(btn.getAttribute("data-text"));

        btn.classList.add("active");
        setTimeout(() => {
            btn.classList.remove("active");
        }, 1000);
    }));

    const buttons = document.querySelectorAll("button, a");
    buttons.forEach(btn => btn.addEventListener("mousedown", () => btn.style.outline = "none"));
    document.body.addEventListener("mouseup", e => buttons.forEach(btn => {
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