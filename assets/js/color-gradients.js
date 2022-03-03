window.addEventListener("load", () => {
    const gradientElements = document.querySelectorAll(".js-gradient-container");

    resizeCallbacks.push(updateGradientElements);
    updateGradientElements();

    function updateGradientElements() {
        for (var i = 0; i < gradientElements.length; i++) {
            const boundingBox = gradientElements[i].getBoundingClientRect();
            gradientElements[i].querySelector(".js-gradient").style.left = -boundingBox.left + 'px';
        }
    }
});