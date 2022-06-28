window.addEventListener("load", () => {
    const header = document.querySelector("#header"),
        headerStaticHeightCopy = document.createElement("div");

    header.parentElement.insertBefore(headerStaticHeightCopy, header);
    headerResize();

    resizeCallbacks.push(headerResize);
    function headerResize() {
        headerStaticHeightCopy.style = "width: 100%; height: " + header.getBoundingClientRect().height + "px;";
    }

    const contact = document.querySelector("#contact"),
        contactBtn = document.querySelector("#contact-btn"),
        email = document.querySelector("#email"),
        emailBtn = document.querySelector("#email-btn"),
        emailCopyNotification = document.querySelector("#email-copy-notification");

    var contactBorderTimeout = null;

    contactBtn.addEventListener("click", () => {
        clearTimeout(contactBorderTimeout);

        if (email.classList.contains("active")) {
            contactBtn.classList.remove("active");
            email.classList.remove("active");
            contactBorderTimeout = setTimeout(() => contact.classList.add("round-border-right"), 400);
        }
        else {
            contactBtn.classList.add("active");
            email.classList.add("active");
            contact.classList.remove("round-border-right");
        }
    });

    document.body.addEventListener("touchend", () => emailCopyNotification.classList.add("touch"));

    var emailCopyNotificationTimeout = null;

    emailBtn.addEventListener("click", async () => {
        await navigator.clipboard.writeText(emailBtn.getAttribute("data-email"));

        clearTimeout(emailCopyNotificationTimeout);

        emailCopyNotification.classList.add("active");
        emailCopyNotification.textContent = "Email adress copied to clipboard!";

        emailCopyNotificationTimeout = setTimeout(() => {
            emailCopyNotification.classList.remove("active");
            emailCopyNotification.textContent = "Click to copy email adress!";
        }, 2000);
    });
    emailCopyNotification.addEventListener("click", () => emailBtn.click());

    const headerNavToggle = document.querySelector("#nav-toggle"),
        headerNavToggleIcons = headerNavToggle.querySelectorAll(".fas");

    headerNavToggle.addEventListener("click", () => {
        if (header.classList.contains("nav-active")) {
            header.classList.remove("nav-active");
            headerNavToggleIcons[0].classList.add("visible");
            headerNavToggleIcons[1].classList.remove("visible");
            document.body.style.overflow = "";
        }
        else {
            header.classList.add("nav-active");
            headerNavToggleIcons[1].classList.add("visible");
            headerNavToggleIcons[0].classList.remove("visible");
            document.body.style.overflow = "hidden";
        }
    });
});