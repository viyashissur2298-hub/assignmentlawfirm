

/* ========================================
   DARK MODE / LIGHT MODE
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const themeButton = document.querySelector("#theme-toggle");
    const html = document.documentElement;

    // Load the saved theme, or use light mode by default
    const savedTheme = localStorage.getItem("theme") || "light";

    html.setAttribute("data-theme", savedTheme);

    // Update the button text
    function updateThemeButton() {
        if (!themeButton) return;

        if (html.getAttribute("data-theme") === "dark") {
            themeButton.textContent = "☀️ Light mode";
        } else {
            themeButton.textContent = "🌙 Dark mode";
        }
    }

    updateThemeButton();

    // Switch between light mode and dark mode
    if (themeButton) {
        themeButton.addEventListener("click", function () {

            const currentTheme = html.getAttribute("data-theme");

            const newTheme =
                currentTheme === "dark" ? "light" : "dark";

            html.setAttribute("data-theme", newTheme);

            // Remember the selected theme
            localStorage.setItem("theme", newTheme);

            updateThemeButton();
        });
    }

});

/* MOBILE NAVIGATION */
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");

        menuButton.textContent = isOpen ? "✕" : "☰";
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuButton.textContent = "☰";
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}

/* HIGHLIGHT CURRENT PAGE */
const currentPage = location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a").forEach(function (link) {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
});

/* AUTOMATIC COPYRIGHT YEAR */
document.querySelectorAll(".year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
});

/* SCROLL REVEAL ANIMATION */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(function (element) {
        observer.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}

/* CONTACT FORM VALIDATION */
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const practice = document.getElementById("practice").value;
        const message = document.getElementById("message").value.trim();
        const consent = document.getElementById("consent").checked;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phoneDigits = phone.replace(/\D/g, "");

        if (!name || !email || !phone || !practice || !message) {
            formMessage.textContent =
                "Please complete all required fields.";
            return;
        }

        if (!emailPattern.test(email)) {
            formMessage.textContent =
                "Please enter a valid email address.";
            return;
        }

        if (phoneDigits.length < 7 || phoneDigits.length > 15) {
            formMessage.textContent =
                "Please enter a valid phone number.";
            return;
        }

        if (message.length < 10) {
            formMessage.textContent =
                "Please enter a message of at least 10 characters.";
            return;
        }

        if (!consent) {
            formMessage.textContent =
                "Please agree to the consent statement.";
            return;
        }

        formMessage.textContent =
            "Thank you, " + name +
            ". The form has passed validation. We will contact you shortly.";

        contactForm.reset();
    });
}
