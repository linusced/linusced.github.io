window.addEventListener("load", () => {
    const contact = document.querySelector("#contact"),
        contactBtn = document.querySelector("#contact-btn"),
        mail = document.querySelector("#mail"),
        mailBtn = document.querySelector("#mail-btn"),
        mailCopyNotification = document.querySelector("#mail-copy-notification");


    mail.style.transform = "translateX(" + (window.innerWidth - contact.getBoundingClientRect().right) + "px)";

    contactBtn.addEventListener("click", () => {
        if (contactBtn.classList.contains("active")) {
            contactBtn.classList.remove("active");
            contact.classList.add("round-border-right");
            mail.classList.add("behind-moon");
            mail.style.transform = "translateX(" + (window.innerWidth - contact.getBoundingClientRect().right) + "px)";

            setTimeout(() => mail.classList.add("hidden"), 500);
        }
        else {
            contactBtn.classList.add("active");
            contact.classList.remove("round-border-right");
            mail.classList.remove("hidden");

            setTimeout(() => mail.style.transform = "", 1);
            setTimeout(() => mail.classList.remove("behind-moon"), 500);
        }
    });

    resizeCallbacks.push(mailResize);

    function mailResize() {
        if (!contactBtn.classList.contains("active"))
            mail.style.transform = "translateX(" + (window.innerWidth - contact.getBoundingClientRect().right) + "px)";
    }

    mailBtn.addEventListener("click", async () => {
        await navigator.clipboard.writeText(mailBtn.getAttribute("data-mail"));

        mailCopyNotification.classList.add("active");
        mailCopyNotification.textContent = "Mail adress copied to clipboard!";

        setTimeout(() => {
            mailCopyNotification.classList.remove("active");
            mailCopyNotification.textContent = "Click to copy mail adress!";
        }, 2000);
    });


    mailCopyNotification.addEventListener("click", () => mailBtn.click());
});