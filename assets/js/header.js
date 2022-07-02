window.addEventListener("load", () => {
    const header = document.querySelector("#header"),
        headerStaticHeightCopy = document.createElement("div");

    header.parentElement.insertBefore(headerStaticHeightCopy, header);

    const contact = document.querySelector("#contact"),
        contactBtn = document.querySelector("#contact-btn"),
        email = document.querySelector("#email"),
        emailBtn = document.querySelector("#email-btn"),
        emailCopyNotification = document.querySelector("#email-copy-notification");

    var contactBorderTimeout = null, emailHideTimeout = null;

    contactBtn.addEventListener("click", () => {
        clearTimeout(contactBorderTimeout);
        clearTimeout(emailHideTimeout);

        if (email.classList.contains("active")) {
            contactBtn.classList.remove("active");
            email.classList.remove("active");
            emailBtn.setAttribute("tabindex", "-1");

            contactBorderTimeout = setTimeout(() => contact.classList.add("round-border-right"), 400);
            emailHideTimeout = setTimeout(() => email.classList.add("hidden"), 500);
        }
        else {
            contactBtn.classList.add("active");
            email.classList.remove("hidden");
            contact.classList.remove("round-border-right");
            emailBtn.setAttribute("tabindex", "0");

            setTimeout(() => email.classList.add("active"), 10);
        }
    });

    document.body.addEventListener("touchend", () => emailCopyNotification.classList.add("active-touch"));
    emailBtn.addEventListener("focus", () => emailCopyNotification.classList.add("active-tab"));
    emailBtn.addEventListener("blur", () => emailCopyNotification.classList.remove("active-tab"));

    var emailCopyNotificationTimeout = null;

    emailCopyNotification.addEventListener("click", () => emailBtn.click());
    emailBtn.addEventListener("click", async () => {
        await navigator.clipboard.writeText(emailBtn.getAttribute("data-email"));

        clearTimeout(emailCopyNotificationTimeout);

        emailCopyNotification.classList.add("active");
        emailCopyNotification.innerHTML = "Email adress copied to clipboard!";

        emailCopyNotificationTimeout = setTimeout(() => {
            emailCopyNotification.classList.remove("active");
            emailCopyNotification.innerHTML = "Click to copy email adress!<i class=\"fas fa-arrow-up padding-left\"></i>";
        }, 2000);
    });

    const headerNavToggle = document.querySelector("#nav-toggle"),
        headerNavToggleIcons = headerNavToggle.querySelectorAll(".fas");

    headerNavToggle.addEventListener("click", () => {
        if (header.classList.contains("nav-active")) {
            header.classList.add("transition");
            header.classList.remove("nav-active");
            headerNavToggleIcons[0].classList.add("visible");
            headerNavToggleIcons[1].classList.remove("visible");
            document.body.style.overflow = "";

            setTimeout(() => header.classList.remove("transition"), 500);
        }
        else {
            header.classList.add("nav-active");
            headerNavToggleIcons[1].classList.add("visible");
            headerNavToggleIcons[0].classList.remove("visible");
            document.body.style.overflow = "hidden";
        }
    });

    var mobileViewTransition = false;
    var navHeight;

    resizeCallbacks.push(headerResize);

    function headerResize() {
        var headerHeight = header.getBoundingClientRect().height;

        if (navHeight != 0) {
            headerHeight = navHeight + parseInt(window.getComputedStyle(header).paddingBottom);

            if (email.classList.contains("active")) {
                contactBtn.classList.remove("active");
                email.classList.remove("active");
                contact.classList.add("round-border-right");
            }
            emailBtn.setAttribute("tabindex", "0");
        }
        else if (header.classList.contains("nav-active")) {
            header.classList.remove("nav-active");
            headerNavToggleIcons[0].classList.add("visible");
            headerNavToggleIcons[1].classList.remove("visible");
            document.body.style.overflow = "";
        }

        headerStaticHeightCopy.style = "width: 100%; height: " + headerHeight + "px;";
    }

    instantResizeCallbacks.push(headerResizeInstant);

    function headerResizeInstant() {
        navHeight = headerNavToggle.getBoundingClientRect().height

        if (navHeight != 0) {
            mobileViewTransition = true;
        }
        else if (mobileViewTransition) {
            mobileViewTransition = false;
            email.style.transition = emailCopyNotification.style.transition = "none";
            setTimeout(() => email.style.transition = emailCopyNotification.style.transition = "", 10);
        }
    }

    window.addEventListener("scroll", headerScroll);
    var prevScrollY = window.scrollY, prevScrollUp = false;

    function headerScroll() {
        if (window.scrollY >= document.querySelector("section").getBoundingClientRect().top) {
            if (window.scrollY < prevScrollY && (window.scrollY < prevScrollY - 40 || prevScrollUp)) {
                header.classList.remove("hidden");
                prevScrollUp = true;
            }
            else {
                header.classList.add("hidden");
                prevScrollUp = false;
            }
        }
        else {
            header.classList.remove("hidden");
            prevScrollUp = false;
        }

        prevScrollY = window.scrollY;
    }

    headerResizeInstant();
    headerResize();
    headerScroll();
});