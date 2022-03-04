window.addEventListener("load", () => {
    const headerElement = document.querySelector("#header"),
        parentElement = headerElement.parentElement,
        parentHeightElement = document.createElement("div"),
        navElement = document.querySelector("#header-nav"),
        contactElement = document.querySelector("#header-contact"),
        titleELement = document.querySelector("#header-title"),
        toggleElement = document.querySelector("#header-toggle");

    parentHeightElement.className = "container full-width";
    document.body.insertBefore(parentHeightElement, parentElement);

    resizeCallbacks.push(resizeHeader);
    resizeHeader();

    function resizeHeader() {
        // Reset to desktop nav before getting boundingClientRect
        navElement.classList.add("row");
        navElement.classList.remove("column");
        navElement.classList.remove("full-width");
        navElement.classList.remove("full-width-children");

        navElement.style = "";
        contactElement.style = "";

        if (headerElement.getBoundingClientRect().width < navElement.getBoundingClientRect().width) {
            navElement.classList.remove("row");
            navElement.classList.add("column");
            navElement.classList.add("full-width");
            navElement.classList.add("full-width-children");

            contactElement.classList.add("full-width");
            toggleElement.classList.remove("hidden");
            titleELement.classList.add("full-width");

            if (headerElement.getAttribute("data-mobile-status") != "1")
                closeHeader(true);
        }
        else {
            navElement.classList.add("row");
            navElement.classList.remove("column");
            navElement.classList.remove("full-width");
            navElement.classList.remove("full-width-children");

            contactElement.classList.remove("full-width");
            toggleElement.classList.add("hidden");
            titleELement.classList.remove("full-width");

            headerElement.setAttribute("data-mobile-status", "-1");
        }

        const totalHeight = parentElement.getBoundingClientRect().height;
        parentHeightElement.style.height = totalHeight + "px";
        parentElement.style.transition = "transform .3s linear";
        parentElement.style.transform = window.scrollY > totalHeight ? "translateY(-100%)" : "translateY(0)";
    }

    toggleElement.addEventListener("click", () => {
        if (headerElement.style.height == "") {
            if (headerElement.getAttribute("data-mobile-status") == "1")
                closeHeader();
            else
                openHeader();
        }
    });

    function closeHeader(noAnimation = false) {
        headerElement.setAttribute("data-mobile-status", "0");
        toggleElement.querySelector(".js-open").classList.add("visibility-hidden");
        toggleElement.querySelector(".js-closed").classList.remove("visibility-hidden");

        if (noAnimation) {
            navElement.style = "position: absolute; visibility: hidden;";
            contactElement.style = "position: absolute; visibility: hidden;";
        }
        else {
            const startHeight = headerElement.getBoundingClientRect().height,
                endHeight = titleELement.getBoundingClientRect().height;

            headerElement.style.height = startHeight + "px";
            headerElement.style.transition = "height 0.3s linear";
            headerElement.style.overflow = "hidden";

            setTimeout(() => {
                headerElement.style.height = endHeight + "px";
            }, 5);
            setTimeout(() => {
                headerElement.style.height = headerElement.style.transition = headerElement.style.overflow = "";
                navElement.style = "position: absolute; visibility: hidden;";
                contactElement.style = "position: absolute; visibility: hidden;";
            }, 310);
        }
    }

    function openHeader() {
        headerElement.setAttribute("data-mobile-status", "1");
        toggleElement.querySelector(".js-open").classList.remove("visibility-hidden");
        toggleElement.querySelector(".js-closed").classList.add("visibility-hidden");

        navElement.style = "";
        contactElement.style = "";

        const startHeight = titleELement.getBoundingClientRect().height,
            endHeight = headerElement.getBoundingClientRect().height;

        headerElement.style.height = startHeight + "px";
        headerElement.style.transition = "height 0.3s linear";
        headerElement.style.overflow = "hidden";

        setTimeout(() => {
            headerElement.style.height = endHeight + "px";
        }, 5);
        setTimeout(() => {
            headerElement.style.height = headerElement.style.transition = headerElement.style.overflow = "";
        }, 310);
    }

    var prevScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
        const height = parentElement.getBoundingClientRect().height;

        if (window.scrollY > height && window.scrollY < prevScrollY) {
            parentElement.style.transform = "translateY(0)";
            parentElement.style.top = "0";
        } else if (window.scrollY > height && headerElement.getAttribute("data-mobile-status") != "1") {
            parentElement.style.transform = "translateY(-100%)";
        }
        else if (window.scrollY > prevScrollY && headerElement.getAttribute("data-mobile-status") != "1") {
            parentElement.style.top = -window.scrollY + "px";
        }

        prevScrollY = window.scrollY;
    });
});