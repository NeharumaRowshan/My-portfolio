/* ================= TYPING ANIMATION ================= */

const typingElement = document.getElementById("typing");

const roles = [
    "Computer Science Student",
    "AI & ML Enthusiast",
    "Cybersecurity Enthusiast",
    "Web Developer",
    "Researcher"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingElement.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingElement.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 60 : 100
    );
}

typeEffect();


/* ================= DARK MODE ================= */

const themeToggle =
    document.getElementById("themeToggle");

const mobileTheme =
    document.getElementById("mobileTheme");


function updateThemeIcon() {

    const isDark =
        document.documentElement.classList.contains("dark");

    const icon =
        isDark ? "sun" : "moon";

    if (themeToggle) {
        themeToggle.innerHTML =
            `<i data-lucide="${icon}"></i>`;
    }

    if (mobileTheme) {
        mobileTheme.innerHTML =
            `<i data-lucide="${icon}"></i>`;
    }

    lucide.createIcons();
}


function toggleTheme() {

    document.documentElement.classList.toggle("dark");

    const isDark =
        document.documentElement.classList.contains("dark");

    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );

    updateThemeIcon();
}


if (themeToggle) {
    themeToggle.addEventListener(
        "click",
        toggleTheme
    );
}

if (mobileTheme) {
    mobileTheme.addEventListener(
        "click",
        toggleTheme
    );
}


/* Load saved theme */

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.documentElement.classList.add("dark");

}

updateThemeIcon();


/* ================= MOBILE MENU ================= */

const menuBtn =
    document.getElementById("menuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");


menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("hidden");

});


/* Close mobile menu after clicking */

const mobileLinks =
    document.querySelectorAll(".mobile-link");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.add("hidden");

    });

});


/* ================= PROJECT FILTER ================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Remove active class */

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        /* Add active class */

        button.classList.add("active");

        const filter =
            button.getAttribute("data-filter");


        projectCards.forEach(card => {

            const category =
                card.getAttribute("data-category");


            if (
                filter === "all" ||
                category === filter
            ) {

                card.style.display = "block";

                setTimeout(() => {
                    card.style.opacity = "1";
                }, 50);

            } else {

                card.style.opacity = "0";

                setTimeout(() => {
                    card.style.display = "none";
                }, 200);

            }

        });

    });

});


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");


function revealOnScroll() {

    const windowHeight =
        window.innerHeight;

    revealElements.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;


        if (elementTop <
            windowHeight - 80) {

            element.classList.add("show");

        }

    });

}


window.addEventListener(
    "scroll",
    revealOnScroll
);

window.addEventListener(
    "load",
    revealOnScroll
);


/* ================= FOOTER YEAR ================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* ================= CONTACT FORM ================= */

/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const sendBtn = document.getElementById("sendBtn");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Change button text
    sendBtn.disabled = true;

    sendBtn.querySelector("span").textContent = "Sending...";

    formMessage.textContent = "";
    formMessage.className = "mt-4 text-center";


    // Send form using EmailJS
    emailjs.sendForm(
        "service_v7m64ij",
        "service_v7m64ij",
        contactForm
    )

    .then(function () {

        // Success
        formMessage.textContent =
            "Message sent successfully! Thank you for contacting me.";

        formMessage.className =
            "mt-4 text-center text-green-600 font-semibold";

        // Clear form
        contactForm.reset();

        // Reset button
        sendBtn.disabled = false;

        sendBtn.querySelector("span").textContent =
            "Send Message";

    })

    .catch(function (error) {

        console.error("EmailJS Error:", error);

        formMessage.textContent =
            "Sorry, something went wrong. Please try again.";

        formMessage.className =
            "mt-4 text-center text-red-600 font-semibold";

        sendBtn.disabled = false;

        sendBtn.querySelector("span").textContent =
            "Send Message";

    });

});

