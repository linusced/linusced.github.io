window.addEventListener("load", () => {
    const bgImage = document.querySelector(".bg-image");

    window.addEventListener("scroll", () => {
        if (window.scrollY >= window.innerHeight)
            bgImage.classList.add("absolute");
        else
            bgImage.classList.remove("absolute");
    });
});