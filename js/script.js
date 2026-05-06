/* ═══════════════════════════════════════════════════
   DEEP-LINK HASH HANDLER
   index.html#reasons  → skip straight to reasons screen
   (used by multiverse.html "Continue" button)
═══════════════════════════════════════════════════ */

// cursor 
// --- Custom Cursor Logic ---
const dot = document.createElement('div');
const outline = document.createElement('div');
dot.id = 'cursor-dot';
outline.id = 'cursor-outline';
document.body.appendChild(dot);
document.body.appendChild(outline);

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    outline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 400, fill: "forwards" });
});

// Cursor Hover Effects
const interactables = document.querySelectorAll('.btn, .reason-card, .portal-container, input, a');
interactables.forEach(item => {
    item.addEventListener("mouseenter", () => {
        outline.style.transform = "scale(1.6)";
        outline.style.backgroundColor = "rgba(229, 9, 20, 0.1)";
        outline.style.borderColor = "var(--red)";
    });
    item.addEventListener("mouseleave", () => {
        outline.style.transform = "scale(1)";
        outline.style.backgroundColor = "transparent";
        outline.style.borderColor = "rgba(255, 255, 255, 0.4)";
    });
});



window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    if (hash === '#reasons') {
        // Remove hash from URL cleanly
        history.replaceState(null, '', window.location.pathname);
        // Show the reasons screen directly, skip lock
        showScreen('reasons');
        // Fade in smoothly
        const ov = document.getElementById('transition-overlay');
        ov.style.opacity = '1';
        setTimeout(() => {
            ov.style.transition = 'opacity 0.6s ease';
            ov.style.opacity    = '0';
        }, 100);
    }
});

/* ═══════════════════════════════════════════════════
   STARFIELD CANVAS
═══════════════════════════════════════════════════ */
(function () {
    const canvas = document.getElementById('stars-canvas');
    const ctx    = canvas.getContext('2d');

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 200 }, () => ({
        x:            Math.random(),
        y:            Math.random(),
        r:            Math.random() * 1.6 + 0.2,
        twinkleSpeed: Math.random() * 0.018 + 0.004,
        phase:        Math.random() * Math.PI * 2,
        color:        Math.random() > 0.92 ? 'rgba(245,197,24,' : 'rgba(255,255,255,'
    }));

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.phase += s.twinkleSpeed;
            const alpha = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(s.phase));
            ctx.beginPath();
            ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
            ctx.fillStyle = s.color + alpha + ')';
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

/* ═══════════════════════════════════════════════════
   FLOATING HEARTS / PARTICLES
═══════════════════════════════════════════════════ */
(function () {
    const layer   = document.getElementById('hearts-layer');
    const symbols = ['❤️', '🌸', '✨', '💕' ,'🌷', '🕷️'];
    for (let i = 0; i < 22; i++) {
        const el = document.createElement('div');
        el.className = 'heart-particle';
        el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        el.style.left              = Math.random() * 100 + 'vw';
        el.style.animationDuration = (10 + Math.random() * 20) + 's';
        el.style.animationDelay    = (Math.random() * 24) + 's';
        el.style.fontSize          = (0.7 + Math.random() * 1.1) + 'rem';
        layer.appendChild(el);
    }
})();

/* ═══════════════════════════════════════════════════
   WEB CANVAS (multiverse gate spider-web bg)
═══════════════════════════════════════════════════ */
function initWebCanvas() {
    const canvas = document.getElementById('web-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const spokes = 12;
    const rings  = 7;
    const maxR   = Math.max(canvas.width, canvas.height) * 0.6;

    ctx.strokeStyle = 'rgba(229,9,20,0.6)';
    ctx.lineWidth   = 0.5;

    for (let i = 0; i < spokes; i++) {
        const angle = (i / spokes) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
        ctx.stroke();
    }

    for (let r = 1; r <= rings; r++) {
        const radius = (r / rings) * maxR;
        ctx.beginPath();
        for (let i = 0; i <= spokes; i++) {
            const angle  = (i / spokes) * Math.PI * 2;
            const jitter = 1 + (Math.random() - 0.5) * 0.1;
            const x = cx + Math.cos(angle) * radius * jitter;
            const y = cy + Math.sin(angle) * radius * jitter;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }
}

/* ═══════════════════════════════════════════════════
   CONFETTI (birthday screen)
═══════════════════════════════════════════════════ */
function spawnConfetti() {
    const layer  = document.getElementById('confetti-layer');
    if (!layer) return;
    layer.innerHTML = '';
    const colors = ['#e50914','#f5c518','#fff','#ff6b81','#a8edea','#ff9ff3'];
    for (let i = 0; i < 90; i++) {
        const el = document.createElement('div');
        el.className = 'confetti-piece';
        el.style.left              = Math.random() * 100 + '%';
        el.style.top               = '-10px';
        el.style.background        = colors[Math.floor(Math.random() * colors.length)];
        el.style.animationDuration = (2 + Math.random() * 2.5) + 's';
        el.style.animationDelay    = (Math.random() * 1.8) + 's';
        el.style.width             = (5 + Math.random() * 8) + 'px';
        el.style.height            = (5 + Math.random() * 8) + 'px';
        el.style.borderRadius      = Math.random() > 0.5 ? '50%' : '2px';
        layer.appendChild(el);
    }
}

/* ═══════════════════════════════════════════════════
   RIPPLE ON BUTTONS
═══════════════════════════════════════════════════ */
document.addEventListener('click', e => {
    const btn = e.target.closest('.btn');
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

/* ═══════════════════════════════════════════════════
   SPARKLE BURST ON CLICK
═══════════════════════════════════════════════════ */
document.addEventListener('click', e => {
    if (!e.target.closest('.btn') && !e.target.closest('.portal-container')) return;
    const glyphs = ['❤️', '🌸', '✨', '💕' ,'🌷', '🕷️'];
    for (let i = 0; i < 6; i++) {
        const sp = document.createElement('div');
        sp.className = 'sparkle';
        sp.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
        sp.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
        sp.style.left = (e.clientX + (Math.random() - 0.5) * 80) + 'px';
        sp.style.top  = (e.clientY + (Math.random() - 0.5) * 80) + 'px';
        document.body.appendChild(sp);
        setTimeout(() => sp.remove(), 950);
    }
});

/* ═══════════════════════════════════════════════════
   OPEN MULTIVERSE PAGE
═══════════════════════════════════════════════════ */
function openMultiverse() {
  window.location.href = "multiverse.html";
}


/* ═══════════════════════════════════════════════════
   PASSWORD CHECK
═══════════════════════════════════════════════════ */
function checkPass() {
    const input = document.getElementById('password').value;
    if (input.toLowerCase() === 'ghelisha') {
        showScreen('preload');
        setTimeout(() => showScreen('landing'), 1700);
    } else {
        const wrap = document.querySelector('.input-wrap');
        wrap.classList.remove('shake');
        void wrap.offsetWidth;
        wrap.classList.add('shake');
        document.getElementById('wrong-msg').textContent =
            'Try again… (maybe it is the nickname that ur mamma gave u .... 🙈)';
        setTimeout(() => {
            document.getElementById('wrong-msg').textContent = '';
        }, 3200);
    }
}

/* ═══════════════════════════════════════════════════
   CHOICE INTERACTION
═══════════════════════════════════════════════════ */
function pickChoice(option) {
    const hint = document.getElementById('choice-hint');
    if (option === 'spider') {
        hint.textContent = '…really? 🤨';
        setTimeout(() => nextScreen('choice', 'result'), 1000);
        document.getElementById('result-heading').textContent = "I'd still choose you.";
        document.getElementById('result-sub').textContent     = 'Every. Single. Time.';
    } else {
        hint.textContent = '✨ I knew it.';
        setTimeout(() => nextScreen('choice', 'result'), 900);
        document.getElementById('result-heading').textContent = 'Of course I chose you.';
        document.getElementById('result-sub').textContent     = 'There was never a doubt.';
    }
}

/* ═══════════════════════════════════════════════════
   SCREEN SWITCHING
═══════════════════════════════════════════════════ */
const overlay = document.getElementById('transition-overlay');

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    if (id === 'birthday')        spawnConfetti();
    if (id === 'multiverse-gate') setTimeout(initWebCanvas, 300);
}

function nextScreen(current, next) {
    overlay.style.transition = 'opacity 0.32s ease';
    overlay.style.opacity    = '1';
    setTimeout(() => {
        showScreen(next);
        overlay.style.transition = 'opacity 0.48s ease';
        overlay.style.opacity    = '0';
    }, 330);
}