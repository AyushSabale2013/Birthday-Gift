/* ═══════════════════════════════════════════════════
   PAGE FADE IN
═══════════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('mv-overlay');
    // Short delay then fade out overlay to reveal page
    setTimeout(() => {
        overlay.style.opacity = '0';
    }, 80);
});

/* ═══════════════════════════════════════════════════
   STARFIELD
═══════════════════════════════════════════════════ */
(function () {
    const canvas = document.getElementById('mv-stars');
    const ctx    = canvas.getContext('2d');

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 220 }, () => ({
        x:            Math.random(),
        y:            Math.random(),
        r:            Math.random() * 1.5 + 0.2,
        twinkleSpeed: Math.random() * 0.016 + 0.004,
        phase:        Math.random() * Math.PI * 2,
        gold:         Math.random() > 0.93
    }));

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.phase += s.twinkleSpeed;
            const alpha = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(s.phase));
            ctx.beginPath();
            ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
            ctx.fillStyle = s.gold
                ? `rgba(245,197,24,${alpha})`
                : `rgba(255,255,255,${alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

/* ═══════════════════════════════════════════════════
   SPIDER WEB CANVAS
═══════════════════════════════════════════════════ */
(function () {
    const canvas = document.getElementById('mv-web');
    const ctx    = canvas.getContext('2d');

    function draw() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const spokes = 16;
        const rings  = 9;
        const maxR   = Math.max(canvas.width, canvas.height) * 0.65;

        ctx.strokeStyle = 'rgba(229,9,20,0.7)';
        ctx.lineWidth   = 0.5;

        // Spokes from centre
        for (let i = 0; i < spokes; i++) {
            const angle = (i / spokes) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
            ctx.stroke();
        }

        // Concentric irregular rings
        for (let r = 1; r <= rings; r++) {
            const radius = (r / rings) * maxR;
            ctx.beginPath();
            for (let i = 0; i <= spokes; i++) {
                const angle  = (i / spokes) * Math.PI * 2;
                const jitter = 1 + (Math.random() - 0.5) * 0.08;
                const x = cx + Math.cos(angle) * radius * jitter;
                const y = cy + Math.sin(angle) * radius * jitter;
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
        }
    }

    draw();
    window.addEventListener('resize', draw);
})();

/* ═══════════════════════════════════════════════════
   TIMELINE SCROLL
═══════════════════════════════════════════════════ */
function scrollTimeline(dir) {
    const el = document.getElementById('timeline-scroll');
    el.scrollBy({ left: dir * 220, behavior: 'smooth' });
}

// Hide/show scroll arrows based on scroll position
const timelineScroll = document.getElementById('timeline-scroll');
const scrollLeft  = document.getElementById('scroll-left');
const scrollRight = document.getElementById('scroll-right');

function updateArrows() {
    const el = timelineScroll;
    scrollLeft.style.opacity  = el.scrollLeft > 10 ? '1' : '0.3';
    scrollRight.style.opacity = el.scrollLeft < el.scrollWidth - el.clientWidth - 10 ? '1' : '0.3';
}
timelineScroll.addEventListener('scroll', updateArrows);
updateArrows();

/* ═══════════════════════════════════════════════════
   RIPPLE & SPARKLE
═══════════════════════════════════════════════════ */
document.addEventListener('click', e => {
    const btn = e.target.closest('.mv-next-btn, .scroll-arrow, .back-btn');
    if (!btn) return;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size / 2}px;
        top:${e.clientY  - rect.top  - size / 2}px;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
});

document.addEventListener('click', e => {
    if (!e.target.closest('.universe-node, .mv-next-btn')) return;
    const glyphs = ['✨','💥','⭐','🌟','🕷️','🌀','💖'];
    for (let i = 0; i < 8; i++) {
        const sp = document.createElement('div');
        sp.className = 'sparkle';
        sp.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
        sp.style.fontSize = (0.8 + Math.random() * 0.9) + 'rem';
        sp.style.left = (e.clientX + (Math.random() - 0.5) * 90) + 'px';
        sp.style.top  = (e.clientY + (Math.random() - 0.5) * 90) + 'px';
        document.body.appendChild(sp);
        setTimeout(() => sp.remove(), 950);
    }
});

/* ═══════════════════════════════════════════════════
   NAVIGATE WITH FADE
═══════════════════════════════════════════════════ */
function fadeOut(e, href) {
    if (e) e.preventDefault();
    const overlay = document.getElementById('mv-overlay');
    overlay.style.opacity = '1';
    setTimeout(() => {
        window.location.href = href;
    }, 420);
}

/* ═══════════════════════════════════════════════════
   ENTER UNIVERSE (open timeline0x.html)
═══════════════════════════════════════════════════ */
function enterUniverse(num) {
    const padded = String(num).padStart(2, '0');
    fadeOut(null, `timeline${padded}.html`);
}

/* ═══════════════════════════════════════════════════
   NEXT BUTTON → back to index.html reasons screen
═══════════════════════════════════════════════════ */
function goNext() {
    fadeOut(null, 'index.html#reasons');
}