/**
 * GLOBAL CURSOR ENGINE
 * Handles movement and interactive scaling
 */
document.addEventListener('DOMContentLoaded', () => {
    // Create elements if they don't exist
    if (!document.getElementById('cursor-dot')) {
        const dot = document.createElement('div');
        const outline = document.createElement('div');
        dot.id = 'cursor-dot';
        outline.id = 'cursor-outline';
        document.body.appendChild(dot);
        document.body.appendChild(outline);
    }

    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');

    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Handle hovering over interactive elements
    const handleHover = () => {
        const targets = document.querySelectorAll('a, button, .btn, .timeline-text, img, input');
        
        targets.forEach(target => {
            target.addEventListener("mouseenter", () => {
                outline.style.transform = "translate(-50%, -50%) scale(1.6)";
                outline.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                outline.style.borderColor = "#fff";
            });
            target.addEventListener("mouseleave", () => {
                outline.style.transform = "translate(-50%, -50%) scale(1)";
                outline.style.backgroundColor = "transparent";
                outline.style.borderColor = "rgba(255, 255, 255, 0.4)";
            });
        });
    };

    handleHover();
    
    // Re-run hover check if content changes (for dynamic timelines)
    const observer = new MutationObserver(handleHover);
    observer.observe(document.body, { childList: true, subtree: true });
});