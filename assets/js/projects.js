window.addEventListener("load", () => {
    const projectFilterButtons = document.querySelectorAll(".js-project-filter-button"),
        reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)"),
        prevFilter = sessionStorage.getItem("project-filter");

    projectFilterButtons.forEach(btn => {
        btn.addEventListener("click", () => projectFilterChange(btn, true))

        if (btn.getAttribute("data-project-filter") === prevFilter)
            projectFilterChange(btn, false);
    });

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
});