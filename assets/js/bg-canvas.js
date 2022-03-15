window.addEventListener("load", () => {
    const bgCanvas = document.querySelector("#bg-canvas"),
        bgCanvasCtx = bgCanvas.getContext("2d");

    const canvasImgData = [document.createElement("canvas"), document.createElement("canvas"), document.createElement("canvas"), document.createElement("canvas")];

    const colors = [];
    for (let i = 1; i <= 3; i++) {
        let str = window.getComputedStyle(document.documentElement).getPropertyValue("--color-gradient-" + i);
        str = str.substring(str.indexOf('#') + 1);

        const output = [];
        for (let i = 0; i < 3; i++)
            output.push(parseInt(str.substring(i * 2, i * 2 + 2), 16));

        colors.push(output);
    }

    var imgLoaded = false;
    const smokeCloudImg = document.createElement("img");
    smokeCloudImg.width = smokeCloudImg.height = 800;
    smokeCloudImg.src = "assets/images/smoke-cloud-1.png";
    smokeCloudImg.addEventListener("load", () => {
        imgLoaded = true
        bgCanvasResize();
    });

    var transitionStartTime = 0, transitionDuration = 0,
        transitionStartIndex = 0, transitionEndIndex = 0;

    var transitionTimeout = null;

    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionMedia.addEventListener("change", () => bgCanvasResize());

    resizeCallbacks.push(bgCanvasResize);

    function bgCanvasResize() {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;

        if (imgLoaded) {
            canvasImgDataDraw();

            if (reducedMotionMedia.matches) {
                bgCanvasDrawReducedMotion();
            }
            else {
                transitionStartTime = Date.now() - 250;
                transitionDuration = 500;
                clearTimeout(transitionTimeout);
                bgCanvasDraw();
            }
        }
    }

    function bgCanvasDraw() {
        const transitionTime = Date.now() - transitionStartTime,
            transitionIndex = transitionTime > transitionDuration / 2 ? transitionEndIndex : transitionStartIndex;

        if (transitionTime > transitionDuration)
            bgCanvasCtx.globalAlpha = 1;
        else if (transitionTime > transitionDuration / 2)
            bgCanvasCtx.globalAlpha = (transitionTime - transitionDuration / 2) / (transitionDuration / 2);
        else
            bgCanvasCtx.globalAlpha = 1 - transitionTime / (transitionDuration / 2);

        bgCanvasCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        bgCanvasCtx.drawImage(canvasImgData[transitionIndex], 0, 0);

        if (transitionTime < transitionDuration)
            requestAnimationFrame(bgCanvasDraw);
        else if (!reducedMotionMedia.matches)
            transitionTimeout = setTimeout(bgCanvasTransition, 10000);
    }

    function bgCanvasDrawReducedMotion() {
        bgCanvasCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        bgCanvasCtx.drawImage(canvasImgData[0], 0, 0);
    }

    function bgCanvasTransition() {
        transitionStartTime = Date.now();
        transitionDuration = 2000;
        transitionStartIndex = transitionEndIndex;
        transitionEndIndex = (transitionStartIndex + 1) % (colors.length + 1);
        bgCanvasDraw();
    }

    function canvasImgDataDraw() {
        const width = window.innerWidth, height = window.innerHeight;
        let ctx = canvasImgData[0].getContext("2d");

        canvasImgData[0].width = width;
        canvasImgData[0].height = height;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = ctx.shadowColor = "#fff";
        ctx.shadowBlur = 20;
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";

        ctx.fillRect(0, 0, 10, height);
        ctx.fillRect(width - 10, 0, 10, height);

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 0.3;
        ctx.globalCompositeOperation = "lighter";

        const size = 0.8 * (width > height ? width : height);
        if (width > height) {
            for (let x = -size / 2; x < width + size / 2; x += size / 2)
                for (let y = 0; y < height; y += size / 2)
                    ctx.drawImage(smokeCloudImg, 0, 0, smokeCloudImg.width, smokeCloudImg.height, x - size / 4, y - size / 4, size, size);
        }
        else {
            for (let x = 0; x < width; x += size / 2)
                for (let y = -size / 2; y < height + size / 2; y += size / 2)
                    ctx.drawImage(smokeCloudImg, 0, 0, smokeCloudImg.width, smokeCloudImg.height, x - size / 4, y - size / 4, size, size);
        }

        for (let c = 1; c < canvasImgData.length; c++) {
            canvasImgData[c].width = width;
            canvasImgData[c].height = height;

            var imgData = canvasImgData[0].getContext("2d").getImageData(0, 0, width, height);
            for (let i = 0; i < imgData.data.length; i += 4) {
                imgData.data[i + 0] = colors[c - 1][0];
                imgData.data[i + 1] = colors[c - 1][1];
                imgData.data[i + 2] = colors[c - 1][2];
            }
            canvasImgData[c].getContext("2d").putImageData(imgData, 0, 0);
        }
    }
});