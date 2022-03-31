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
        navElement.classList.add("row");
        navElement.classList.remove("column");
        navElement.classList.remove("full-width");
        navElement.classList.remove("full-width-children");

        navElement.classList.remove("hidden-absolute");
        contactElement.classList.remove("hidden-absolute");

        if (window.innerWidth < 500 || headerElement.getBoundingClientRect().width < navElement.getBoundingClientRect().width) {
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
            navElement.classList.add("hidden-absolute");
            contactElement.classList.add("hidden-absolute");
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
                navElement.classList.add("hidden-absolute");
                contactElement.classList.add("hidden-absolute");
            }, 310);
        }
    }

    function openHeader() {
        headerElement.setAttribute("data-mobile-status", "1");
        toggleElement.querySelector(".js-open").classList.remove("visibility-hidden");
        toggleElement.querySelector(".js-closed").classList.add("visibility-hidden");

        navElement.classList.remove("hidden-absolute");
        contactElement.classList.remove("hidden-absolute");

        const startHeight = titleELement.getBoundingClientRect().height,
            endHeight = headerElement.getBoundingClientRect().height;

        headerElement.style.height = startHeight + "px";
        headerElement.style.transition = "height 0.3s linear";
        headerElement.style.overflow = "hidden";

        parentElement.style.top = "0";

        setTimeout(() => {
            headerElement.style.height = endHeight + "px";
        }, 5);
        setTimeout(() => {
            headerElement.style.height = headerElement.style.transition = headerElement.style.overflow = "";
        }, 310);
    }

    var prevScrollY = window.scrollY, scrollUpStart = -1, scrollDownStart = -1;

    scrollCallbacks.push(scrollHeader);

    function scrollHeader() {
        const height = parentElement.getBoundingClientRect().height;

        if (headerElement.getAttribute("data-mobile-status") == "1") {
            scrollUpStart = scrollDownStart = -1;
        }
        else if (window.scrollY < prevScrollY) {
            if (scrollUpStart == -1) {
                let scrollUpStartOffset = 0;
                if (scrollDownStart != -1 && window.scrollY - scrollDownStart < height)
                    scrollUpStartOffset = height + (scrollDownStart - window.scrollY);

                scrollUpStart = window.scrollY + scrollUpStartOffset;
            }
            scrollDownStart = -1;

            if (scrollUpStart - window.scrollY < height)
                parentElement.style.top = -height + (scrollUpStart - window.scrollY) + "px";
            else
                parentElement.style.top = "0";
        }
        else {
            if (scrollDownStart == -1) {
                let scrollDownStartOffset = 0;
                if (scrollUpStart != -1 && scrollUpStart - window.scrollY < height)
                    scrollDownStartOffset = -height + (scrollUpStart - window.scrollY);

                scrollDownStart = window.scrollY + scrollDownStartOffset;
            }
            scrollUpStart = -1;

            if (window.scrollY - scrollDownStart < height)
                parentElement.style.top = scrollDownStart - window.scrollY + "px";
            else
                parentElement.style.top = "-100%";
        }

        prevScrollY = window.scrollY;
    }
});