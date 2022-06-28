window.addEventListener("load", () => {
    const scrollElements = document.querySelectorAll(".js-scroll-effect");

    window.addEventListener("scroll", scroll);
    scroll();

    function scroll() {
        for (var i = 0; i < scrollElements.length; i++) {
            const scrollMultiplierX = parseFloat(scrollElements[i].getAttribute("data-scroll-multiplier-x")),
                scrollMultiplierY = parseFloat(scrollElements[i].getAttribute("data-scroll-multiplier-y"));

            scrollElements[i].style.transform = "translate(" + (window.scrollY * (scrollMultiplierX || 0.0)) + "px," + (window.scrollY * (scrollMultiplierY || 0.0)) + "px)";
        }
    }
});