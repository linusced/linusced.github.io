var resizeTimeout = null;
var resizeCallbacks = [];

window.addEventListener("load", () => {
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        console.log("yes");
        document.body.removeChild(document.querySelector(".bg-image"));
        document.body.classList.add("bg-image");
    }

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
    }, 100);
});
