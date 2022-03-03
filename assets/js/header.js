window.addEventListener("load", () => {
    const headerElement = document.querySelector(".js-header"),
        navElement = document.querySelector(".js-primary-nav");

    resizeCallbacks.push(headerResize);
    headerResize();

    function headerResize() {
        const headerBoundingBox = headerElement.getBoundingClientRect(),
            navBoundingBox = navElement.getBoundingClientRect();

        if (headerBoundingBox.width < navBoundingBox.width) {
            // mobile nav
        }
        else {
            // default nav
        }
    }
});