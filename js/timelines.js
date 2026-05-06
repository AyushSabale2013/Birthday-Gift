// ================= SCROLL PROGRESS + REVEAL =================

document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("myBar");
    const reveals = document.querySelectorAll(".reveal");

    let ticking = false;

    // Handle Scroll Event
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateProgress();
                reveal();
                ticking = false;
            });
            ticking = true;
        }
    });

    // PROGRESS BAR LOGIC
    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        if (progressBar) {
            progressBar.style.width = scrollPercent + "%";
        }
    }

    // REVEAL ANIMATION LOGIC
    function reveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        reveals.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add("active");
            }
        });
    }

    // Run once on load
    updateProgress();
    reveal();
});