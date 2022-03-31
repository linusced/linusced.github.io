window.addEventListener("load", () => {
    const projectPopup = document.querySelector("#project-popup"),
        projectPopupClose = document.querySelector("#project-popup-close"),
        projectPopupOpenButtons = document.querySelectorAll(".js-project-popup-open"),
        projectPopupImages = document.querySelector("#project-popup-images");

    var projectPopupImageElements = [];

    projectPopupClose.addEventListener("click", closePopup);
    document.addEventListener("keydown", e => {
        if (e.keyCode === 27 && !projectPopup.classList.contains("visibility-hidden"))
            closePopup();
    });
    projectPopup.addEventListener("click", e => {
        if (e.target.id === "project-popup")
            closePopup();
    });

    projectPopupOpenButtons.forEach(btn => btn.addEventListener("click", () => openPopup(btn)));

    function closePopup() {
        projectPopup.classList.add("visibility-hidden")
        projectPopupImages.querySelectorAll(".project-popup-image").forEach(img => projectPopupImages.removeChild(img));
        document.documentElement.style.overflowY = "";
        document.querySelectorAll("button, a").forEach(_button => _button.tabIndex = 0);
    }

    function openPopup(btn) {
        projectPopup.querySelector("#project-popup-title").textContent = btn.getAttribute("data-title");

        const imageUrls = btn.getAttribute("data-images").split(' ');
        projectPopupImageElements = [];

        for (let i = 0; i < imageUrls.length; i++) {
            const isIframe = imageUrls[i].includes("youtube");
            const img = document.createElement(isIframe ? "iframe" : "img");
            img.src = imageUrls[i];
            img.className = "project-popup-image";

            if (isIframe)
                img.setAttribute("frameborder", "0");

            if (i != 0)
                img.classList.add("hidden");

            projectPopupImages.appendChild(img);
            projectPopupImageElements.push(img);
        }

        projectPopup.querySelector("#project-popup-tags").textContent = btn.getAttribute("data-tags");

        const description = btn.getAttribute("data-description").split("\\n"),
            descriptionElement = projectPopup.querySelector("#project-popup-description");

        descriptionElement.innerHTML = "";
        for (let i = 0; i < description.length; i++)
            descriptionElement.innerHTML += "<p>" + description[i] + "</p>";

        const linkUrl = btn.getAttribute("data-link"),
            linkElement = projectPopup.querySelector("#project-popup-link");
        if (linkUrl) {
            linkElement.href = linkUrl;
            linkElement.classList.remove("hidden");
        }
        else {
            linkElement.classList.add("hidden");
        }

        projectPopup.classList.remove("visibility-hidden");
        document.documentElement.style.overflowY = "hidden";

        if (btn === document.activeElement)
            projectPopupClose.focus();

        document.querySelectorAll("button, a").forEach(_button => _button.tabIndex = -1);
        projectPopup.querySelectorAll("button, a").forEach(_button => _button.tabIndex = 0);
    }

    document.querySelector("#project-popup-prev-image").addEventListener("click", () => {
        for (let i = 0; i < projectPopupImageElements.length; i++)
            if (!projectPopupImageElements[i].classList.contains("hidden")) {
                projectPopupImageElements[i].classList.add("hidden");

                if (i - 1 >= 0)
                    projectPopupImageElements[i - 1].classList.remove("hidden");
                else
                    projectPopupImageElements[projectPopupImageElements.length - 1].classList.remove("hidden");

                break;
            }
    });

    document.querySelector("#project-popup-next-image").addEventListener("click", () => {
        for (let i = 0; i < projectPopupImageElements.length; i++)
            if (!projectPopupImageElements[i].classList.contains("hidden")) {
                projectPopupImageElements[i].classList.add("hidden");

                if (i + 1 < projectPopupImageElements.length)
                    projectPopupImageElements[i + 1].classList.remove("hidden");
                else
                    projectPopupImageElements[0].classList.remove("hidden");

                break;
            }
    });
});