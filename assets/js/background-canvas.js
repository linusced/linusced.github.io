window.addEventListener("load", () => {
    const canvas = document.querySelector("#background-canvas");
    const canvasContext = canvas.getContext("2d");

    var intensity = 0.0;

    resizeCallbacks.push(resizeCanvas);
    resizeCanvas();

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    if (window.innerWidth < 1000 || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;

    scrollCallbacks.push(scrollCanvas);

    function scrollCanvas() {
        intensity += 0.02;
    }

    var canvasInterval = setInterval(drawCanvas, 50); // requestAnimationFrame(drawCanvas);

    function drawCanvas() {
        intensity -= 0.02;
        if (intensity < 0.0)
            intensity = 0.0;
        else if (intensity > 1.0)
            intensity = 1.0;

        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.fillStyle = "#58f";
        canvasContext.globalAlpha = intensity;
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        if (window.innerWidth < 1000 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            clearInterval(canvasInterval);
        }
    }
});