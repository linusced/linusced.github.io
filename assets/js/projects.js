window.addEventListener("load", () => {
    const projectFilterButtons = document.querySelectorAll(".js-project-filter-button"),
        reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)"),
        prevFilter = sessionStorage.getItem("project-filter"),
        projectFilterElement = document.querySelector("#project-filter"),
        headerContainer = document.querySelector("#header-container");

    projectFilterButtons.forEach(btn => {
        btn.addEventListener("click", () => projectFilterChange(btn, true))

        if (btn.getAttribute("data-project-filter") === prevFilter)
            projectFilterChange(btn, false);
    });

    scrollCallbacks.push(projectFilterScroll);

    function projectFilterChange(activeBtn, scroll) {
        projectFilterButtons.forEach(btn => {
            if (btn != activeBtn) {
                btn.classList.remove("active");
                document.querySelectorAll(`.${btn.getAttribute("data-project-filter")}`).forEach(e => e.classList.add("hidden-absolute"));
            }
            else {
                btn.classList.add("active");
                document.querySelectorAll(`.${btn.getAttribute("data-project-filter")}`).forEach(e => e.classList.remove("hidden-absolute"));
            }
        });

        if (scroll)
            window.scrollTo({ top: activeBtn.getBoundingClientRect().y + window.scrollY, behavior: reducedMotion.matches ? "auto" : "smooth" });

        sessionStorage.setItem("project-filter", activeBtn.getAttribute("data-project-filter"));
    }

    function projectFilterScroll() {
        projectFilterElement.classList.remove("project-filter-fixed");
        projectFilterElement.style.top = "";

        if (projectFilterElement.getBoundingClientRect().bottom < 0) {
            projectFilterElement.classList.add("project-filter-fixed");

            const headerBottom = headerContainer.getBoundingClientRect().bottom;
            if (headerBottom > 0)
                projectFilterElement.style.top = headerBottom + "px";
        }
    }
});