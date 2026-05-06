// ================= SCROLL PROGRESS + REVEAL =================

// Cache elements (avoid querying repeatedly)
const progressBar = document.getElementById("myBar");
const reveals = document.querySelectorAll(".reveal");

// Throttle scroll using requestAnimationFrame
let ticking = false;

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateProgress();
            reveal();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener("scroll", onScroll);

// ================= PROGRESS BAR =================
function updateProgress() {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / height) * 100;

    progressBar.style.width = scrolled + "%";
}

// ================= REVEAL ANIMATION =================
function reveal() {
    const windowHeight = window.innerHeight;

    reveals.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add("active");
        }
    });
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
    updateProgress();
    reveal();
});