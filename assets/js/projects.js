window.addEventListener("load", () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)"),
        prevFilter = sessionStorage.getItem("project-filter"),
        projectFilterElement = document.querySelector("#project-filter"),
        headerElement = document.querySelector("#header"),
        headerContainer = document.querySelector("#header-container");

    var projectFilterElementFixed = null;
    const projectFilterButtons = document.querySelectorAll(".js-project-filter-button");
    var projectFilterFixedButtons = null;

    projectFilterButtons.forEach(btn => {
        btn.addEventListener("click", () => projectFilterChange(btn, true))

        if (btn.getAttribute("data-project-filter") === prevFilter)
            projectFilterChange(btn, false);
    });

    scrollCallbacks.push(projectFilterScroll);

    function projectFilterChange(activeBtn, scroll) {
        projectFilterButtons.forEach(btn => {
            const dataProjectFilter = btn.getAttribute("data-project-filter");
            if (dataProjectFilter != activeBtn.getAttribute("data-project-filter")) {
                btn.classList.remove("active");
                document.querySelectorAll(`.${dataProjectFilter}`).forEach(e => e.classList.add("hidden-absolute"));
            }
            else {
                btn.classList.add("active");
                document.querySelectorAll(`.${dataProjectFilter}`).forEach(e => e.classList.remove("hidden-absolute"));
            }
        });

        if (projectFilterFixedButtons)
            projectFilterFixedButtons.forEach(btn => {
                const dataProjectFilter = btn.getAttribute("data-project-filter");
                if (dataProjectFilter != activeBtn.getAttribute("data-project-filter")) {
                    btn.classList.remove("active");
                    document.querySelectorAll(`.${dataProjectFilter}`).forEach(e => e.classList.add("hidden-absolute"));
                }
                else {
                    btn.classList.add("active");
                    document.querySelectorAll(`.${dataProjectFilter}`).forEach(e => e.classList.remove("hidden-absolute"));
                }
            });

        if (scroll)
            window.scrollTo({ top: activeBtn.getBoundingClientRect().y + window.scrollY, behavior: reducedMotion.matches ? "auto" : "smooth" });

        sessionStorage.setItem("project-filter", activeBtn.getAttribute("data-project-filter"));
    }

    function projectFilterScroll() {
        if (projectFilterElement.getBoundingClientRect().bottom < 0) {
            if (!projectFilterElementFixed) {
                projectFilterElementFixed = document.createElement("div");
                document.body.appendChild(projectFilterElementFixed);
                projectFilterElementFixed.innerHTML = projectFilterElement.innerHTML;
                projectFilterElementFixed.className = projectFilterElement.className;
                projectFilterElementFixed.id = "project-filter-fixed";

                projectFilterFixedButtons = projectFilterElementFixed.querySelectorAll(".js-project-filter-button");
                projectFilterFixedButtons.forEach(btn => btn.addEventListener("click", () => projectFilterChange(btn, false)));
                projectFilterFixedButtons.forEach(btn => btn.addEventListener("mousedown", () => btn.style.outline = "none"));
                document.body.addEventListener("mouseup", () => projectFilterFixedButtons.forEach(btn => {
                    btn.style.outline = "";
                    btn.blur();
                }));
            }
            const headerBottom = headerContainer.getBoundingClientRect().bottom;
            if (headerBottom > 0 && headerElement.getAttribute("data-mobile-status") != "1")
                projectFilterElementFixed.style.top = headerBottom + "px";
        }
        else if (projectFilterElementFixed) {
            document.body.removeChild(projectFilterElementFixed);
            projectFilterElementFixed = null;
            projectFilterFixedButtons = null;
        }
    }
});