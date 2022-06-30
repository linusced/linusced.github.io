window.addEventListener("load", () => {
    const projectImages = document.querySelectorAll(".js-project-images");

    for (let i = 0; i < projectImages.length; i++) {
        let element = projectImages[i].querySelector(".js-project-images-prev");
        element.setAttribute("data-project-index", i);
        element.addEventListener("click", prevImage);

        element = projectImages[i].querySelector(".js-project-images-next");
        element.setAttribute("data-project-index", i);
        element.addEventListener("click", nextImage);

        projectImages[i].querySelector("img").setAttribute("data-index", 0);
    }

    function prevImage(e) {
        let projectIndex = e.target.getAttribute("data-project-index");
        if (!projectIndex) projectIndex = e.target.parentElement.getAttribute("data-project-index");
        projectIndex = parseInt(projectIndex);

        const img = projectImages[projectIndex].querySelector("img"), iframe = projectImages[projectIndex].querySelector("iframe"),
            imgSources = img.getAttribute("data-sources").split(" ");
        let newIndex = parseInt(img.getAttribute("data-index")) - 1;
        if (newIndex < 0)
            newIndex = imgSources.length - 1;

        setImage(img, iframe, imgSources, newIndex);
    }

    function nextImage(e) {
        let projectIndex = e.target.getAttribute("data-project-index");
        if (!projectIndex) projectIndex = e.target.parentElement.getAttribute("data-project-index");
        projectIndex = parseInt(projectIndex);

        const img = projectImages[projectIndex].querySelector("img"), iframe = projectImages[projectIndex].querySelector("iframe"),
            imgSources = img.getAttribute("data-sources").split(" "),
            newIndex = (parseInt(img.getAttribute("data-index")) + 1) % imgSources.length;

        setImage(img, iframe, imgSources, newIndex);
    }

    function setImage(img, iframe, imgSources, newIndex) {
        img.setAttribute("data-index", newIndex);

        var timeout = parseInt(img.getAttribute("data-timeout"));
        clearTimeout(timeout);

        img.classList.add("fade");

        timeout = setTimeout(() => {
            if (imgSources[newIndex].substring(0, 30) == "https://www.youtube.com/embed/") {
                img.classList.add("hidden");
                iframe.src = imgSources[newIndex];
            }
            else {
                img.classList.remove("hidden");
                img.src = imgSources[newIndex];
            }
            img.classList.remove("fade");
        }, 100);

        img.setAttribute("data-timeout", timeout);
    }
});