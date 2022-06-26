window.addEventListener("load", () => {
    const bgImage = document.querySelector(".bg-image");

    window.addEventListener("scroll", () => {
        if (window.scrollY >= bottom)
            bgImage.classList.add("absolute");
        else
            bgImage.classList.remove("absolute");
    });
});