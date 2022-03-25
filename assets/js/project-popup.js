window.addEventListener("load", () => {
    const projectPopup = document.querySelector("#project-popup"),
        projectPopupClose = document.querySelector("#project-popup-close"),
        projectPopupOpenButtons = document.querySelectorAll(".js-project-popup-open"),
        projectPopupTitle = document.querySelector("#project-popup-title"),
        projectPopupImages = document.querySelector("#project-popup-images"),
        buttons = document.querySelectorAll("button, a");

    projectPopupClose.addEventListener("click", closePopup);
    document.addEventListener("keydown", e => {
        if (e.keyCode === 27 && !projectPopup.classList.contains("hidden"))
            closePopup();
    });
    projectPopup.addEventListener("click", e => {
        if (e.target.id === "project-popup")
            closePopup();
    });

    projectPopupOpenButtons.forEach(btn => btn.addEventListener("click", () => openPopup(btn)));

    function closePopup() {
        projectPopup.classList.add("hidden")
        projectPopupImages.innerHTML = projectPopupTitle.innerHTML = "";
        document.documentElement.style.overflowY = "";
        buttons.forEach(btn => {
            btn.tabIndex = 0;
        });
    }

    function openPopup(btn) {
        projectPopupTitle.textContent = btn.getAttribute("data-title");

        const imagesStr = btn.getAttribute("data-images");
        if (imagesStr) {
            const imageUrls = imagesStr.split(' ');
            for (let i = 0; i < imageUrls.length; i++) {
                const img = document.createElement("img");
                img.src = imageUrls[i];
                img.className = "project-popup-image";
                projectPopupImages.appendChild(img);
            }
        }

        projectPopup.classList.remove("hidden");
        document.documentElement.style.overflowY = "hidden";

        if (btn === document.activeElement)
            projectPopupClose.focus();

        buttons.forEach(_button => {
            if (_button != projectPopupClose)
                _button.tabIndex = -1;
        });
    }
});