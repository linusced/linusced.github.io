window.addEventListener("load", () => {
    const headerElement = document.querySelector(".js-header"),
        navElement = document.querySelector(".js-primary-nav");

    resizeCallbacks.push(headerResize);
    headerResize();

    function headerResize() {
        // Reset to desktop nav before getting bounding box
        navElement.classList.add("row");
        navElement.classList.remove("column");
        navElement.classList.remove("full-width");
        navElement.classList.remove("full-width-children");

        const headerBoundingBox = headerElement.getBoundingClientRect(),
            navBoundingBox = navElement.getBoundingClientRect();

        if (headerBoundingBox.width < navBoundingBox.width) {
            navElement.classList.remove("row");
            navElement.classList.add("column");
            navElement.classList.add("full-width");
            navElement.classList.add("full-width-children");
        }
        else {
            navElement.classList.add("row");
            navElement.classList.remove("column");
            navElement.classList.remove("full-width");
            navElement.classList.remove("full-width-children");
        }
    }
});