var gradientElements = [];
var resizeTimeout;
var numOfGradientColors;
var gradientColors = [];
var gradientColorsInterpolation = 0.0;
const hslColorRegex = /\s*hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/;

window.addEventListener("load", () => {

    gradientElements = document.querySelectorAll("[data-background-gradient]");
    numOfGradientColors = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--num-of-gradient-colors"));

    var hslStr;
    var hslRegexResult;

    for (var i = 1; i <= numOfGradientColors; i++) {
        hslStr = getComputedStyle(document.documentElement).getPropertyValue(`--gradient-color-${i}`);
        hslRegexResult = hslColorRegex.exec(hslStr);
        gradientColors.push([parseInt(hslRegexResult[1]), parseInt(hslRegexResult[2]), parseInt(hslRegexResult[3])]);
    }

    if (window.screen.width > 999) {
        for (var i = 0; i < gradientElements.length; i++)
            if (gradientElements[i].getAttribute("data-background-gradient") == "hover") {
                gradientElements[i].addEventListener("mouseenter", e => {
                    e.target.setAttribute("data-background-gradient", "active");
                    updateGradientElement(e.target);
                });
                gradientElements[i].addEventListener("mouseleave", e => {
                    e.target.setAttribute("data-background-gradient", "");
                    updateGradientElement(e.target);
                });
            }

        window.setInterval(updateGradientColors, 100);
        window.addEventListener("resize", () => {

            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateAllGradientElements();
            }, 300);
        });
    }

    updateAllGradientElements();
});

function updateGradientElement(element) {
    if (element.getAttribute("data-background-gradient") === "active") {

        const boundingBox = element.getBoundingClientRect();

        const gradientBegin = -boundingBox.x,
            gradientEnd = gradientBegin + window.innerWidth;

        var styleStr = "linear-gradient(to right", pixelValue;

        for (var j = 0; j < numOfGradientColors; j++) {
            pixelValue = (j / (numOfGradientColors - 1)) * (gradientEnd - gradientBegin) + gradientBegin;

            styleStr += `, var(--gradient-color-${j + 1}) ${pixelValue}px`;
        }

        styleStr += ")";
        element.style.background = styleStr;
    }
    else
        element.style.background = "";
}

function updateAllGradientElements() {
    for (var i = 0; i < gradientElements.length; i++)
        updateGradientElement(gradientElements[i]);
}

function updateGradientColors() {
    gradientColorsInterpolation += 0.02;

    if (gradientColorsInterpolation >= 1.0) {
        gradientColorsInterpolation = 0;

        var firstColor = gradientColors[0];
        for (var i = 0; i < numOfGradientColors; i++)
            gradientColors[i] = i < numOfGradientColors - 1 ? gradientColors[i + 1] : firstColor;
    }

    var currentColor = [0, 0, 0];

    for (var i = 0, j; i < numOfGradientColors; i++) {
        j = i < numOfGradientColors - 1 ? i + 1 : 0;

        for (var k = 0; k < 3; k++)
            currentColor[k] = Math.round(gradientColors[i][k] + (gradientColors[j][k] - gradientColors[i][k]) * gradientColorsInterpolation);

        document.documentElement.style.setProperty(`--gradient-color-${i + 1}`, `hsl(${currentColor[0]}, ${currentColor[1]}%, ${currentColor[2]}%)`);
    }
}