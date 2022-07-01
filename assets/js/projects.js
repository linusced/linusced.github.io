window.addEventListener("load", () => {
    const projectContentToggle = document.querySelectorAll(".js-project-content-toggle"),
        projectContent = document.querySelectorAll(".js-project-content");

    for (let i = 0; i < projectContentToggle.length; i++) {
        projectContentToggle[i].setAttribute("data-project-index", i);
        projectContentToggle[i].addEventListener("click", toggleContent);
    }

    function toggleContent(e) {
        let projectIndex = e.target.getAttribute("data-project-index");
        if (!projectIndex) projectIndex = e.target.parentElement.getAttribute("data-project-index");
        projectIndex = parseInt(projectIndex);

        projectContentToggle[projectIndex].classList.toggle("active");

        var timeout = parseInt(projectContent[projectIndex].getAttribute("data-timeout"));
        clearTimeout(timeout);

        projectContent[projectIndex].style = "display:flex;height:auto;";
        const height = projectContent[projectIndex].getBoundingClientRect().height;
        projectContent[projectIndex].style = "";

        if (projectContentToggle[projectIndex].classList.contains("active")) {
            projectContent[projectIndex].classList.add("active");
            setTimeout(() => projectContent[projectIndex].style.height = height + "px", 10);
            timeout = setTimeout(() => {
                projectContent[projectIndex].style.height = "auto";
                projectContentToggle[projectIndex].innerHTML = projectContentToggle[projectIndex].innerHTML.replace("View", "Hide");
            }, 510);
        }
        else {
            projectContent[projectIndex].style.height = height + "px";
            setTimeout(() => projectContent[projectIndex].style.height = "", 10);
            timeout = setTimeout(() => {
                projectContent[projectIndex].classList.remove("active");
                projectContentToggle[projectIndex].innerHTML = projectContentToggle[projectIndex].innerHTML.replace("Hide", "View");
            }, 510);
        }

        projectContent[projectIndex].setAttribute("data-timeout", timeout);
    }

    const projectImages = document.querySelectorAll(".js-project-images");

    for (let i = 0; i < projectImages.length; i++) {
        let element = projectImages[i].querySelector(".js-project-images-prev");
        element.setAttribute("data-project-index", i);
        element.addEventListener("click", prevImage);

        element = projectImages[i].querySelector(".js-project-images-next");
        element.setAttribute("data-project-index", i);
        element.addEventListener("click", nextImage);

        element = projectImages[i].querySelector("img");
        element.setAttribute("data-index", 0);
        element.addEventListener("load", e => e.target.classList.remove("fade"));
    }

    function prevImage(e) {
        let projectIndex = e.target.getAttribute("data-project-index");
        if (!projectIndex) projectIndex = e.target.parentElement.getAttribute("data-project-index");
        projectIndex = parseInt(projectIndex);

        const img = projectImages[projectIndex].querySelector("img"),
            imgSources = img.getAttribute("data-sources").split(" ");
        let newIndex = parseInt(img.getAttribute("data-index")) - 1;
        if (newIndex < 0)
            newIndex = imgSources.length - 1;

        setImage(img, imgSources, newIndex);
    }

    function nextImage(e) {
        let projectIndex = e.target.getAttribute("data-project-index");
        if (!projectIndex) projectIndex = e.target.parentElement.getAttribute("data-project-index");
        projectIndex = parseInt(projectIndex);

        const img = projectImages[projectIndex].querySelector("img"),
            imgSources = img.getAttribute("data-sources").split(" "),
            newIndex = (parseInt(img.getAttribute("data-index")) + 1) % imgSources.length;

        setImage(img, imgSources, newIndex);
    }

    function setImage(img, imgSources, newIndex) {
        img.setAttribute("data-index", newIndex);

        var timeout = parseInt(img.getAttribute("data-timeout"));
        clearTimeout(timeout);

        img.classList.add("fade");

        timeout = setTimeout(() => {
            img.classList.remove("hidden");
            img.src = imgSources[newIndex];
        }, 100);

        img.setAttribute("data-timeout", timeout);
    }
});