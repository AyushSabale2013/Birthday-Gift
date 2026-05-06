/* ═══════════════════════════════════════════════════
   musicformultiverse.js
   Works on: multiverse.html + all timeline0x.html

   STORAGE (localStorage only)
   ─────────────────────────────────────────────────
   mv_music_time   → current playback position (seconds)
   mv_active       → "1" while inside multiverse world
                     ABSENT = fresh entry from index

   RULES:
   ─────────────────────────────────────────────────
   mv_active ABSENT  → Fresh entry (came from index)
                       Start from MV_START_OFFSET, fade in
                       Set mv_active = "1"

   mv_active = "1"   → Resume (multiverse ↔ timeline)
                       Seek to mv_music_time, instant play
                       No fade = no glitch

   On site reload    → musicforindex.js wipes both keys
                       so mv_active is always absent = fresh
═══════════════════════════════════════════════════ */

const MV_START_OFFSET = 7;
const MV_VOLUME       = 0.2;
const MV_FADE_MS      = 2000;

let _mvStarted = false;
let _mvTracker = null;

/* ── Smooth fade-in (fresh entry only) ── */
function _mvFadeIn(audio) {
    audio.volume = 0;
    audio.play().catch(() => {});
    const steps   = 40;
    const stepMs  = MV_FADE_MS / steps;
    const volStep = MV_VOLUME / steps;
    let v = 0;
    const t = setInterval(() => {
        v += volStep;
        if (v >= MV_VOLUME) { audio.volume = MV_VOLUME; clearInterval(t); }
        else                { audio.volume = v; }
    }, stepMs);
}

/* ── Save position every 250ms ── */
function _startTracking(audio) {
    if (_mvTracker) return;
    _mvTracker = setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem('mv_music_time', audio.currentTime);
        }
    }, 250);
}

/* ── PAGE ENTRY: fade the overlay OUT so the page
   visually "fades in" every time you arrive ── */
function _runPageFadeIn() {
    const overlay = document.getElementById('mv-overlay')
                 || document.getElementById('transition-overlay');
    if (!overlay) return;

    overlay.style.transition = 'none';
    overlay.style.opacity    = '1';

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            overlay.style.transition = 'opacity 0.45s ease';
            overlay.style.opacity    = '0';
        });
    });
}

/* ── Main startup ── */
function startMvMusic() {
    if (_mvStarted) return;

    const audio = document.getElementById('bg-music');
    if (!audio) return;

    _mvStarted = true;

    function run() {
        const isActive  = localStorage.getItem('mv_active');
        const savedTime = parseFloat(localStorage.getItem('mv_music_time') || '0');

        if (!isActive) {
            /* ── FRESH ENTRY ── */
            audio.currentTime = MV_START_OFFSET;
            localStorage.setItem('mv_music_time', MV_START_OFFSET);
            localStorage.setItem('mv_active', '1');
            _mvFadeIn(audio);
            _startTracking(audio);

        } else {
            /* ── RESUME ── */
            const resumeAt = savedTime > 0 ? savedTime : MV_START_OFFSET;
            const departTs = parseFloat(localStorage.getItem('mv_depart_ts') || '0');

            function playWithCorrection() {
                const elapsed   = departTs ? (Date.now() - departTs) / 1000 : 0;
                const corrected = resumeAt + elapsed + 0.6; /* +0.1s covers seek/play latency */

                audio.currentTime = corrected;
                audio.volume      = MV_VOLUME;

                /* Measure play() latency and nudge forward if significant */
                const beforePlay = Date.now();
                audio.play().then(() => {
                    const playLatency = (Date.now() - beforePlay) / 1000;
                    if (playLatency > 0.05) {
                        audio.currentTime += playLatency;
                    }
                }).catch(() => {});

                localStorage.removeItem('mv_depart_ts');
                _startTracking(audio);
            }

            if (audio.readyState >= 1) {
                playWithCorrection();
            } else {
                audio.addEventListener('loadedmetadata', playWithCorrection, { once: true });
            }
        }
    }

    run();
}

/* ── Auto-start + trigger page fade-in on every load ── */
window.addEventListener('load', () => {
    _runPageFadeIn();
    setTimeout(startMvMusic, 50);
});

/* ══════════════════════════════════════════════════
   NAVIGATION HELPERS
   All page changes inside multiverse world go
   through _navigateMv() so position is saved first
══════════════════════════════════════════════════ */

function _navigateMv(href) {
    const audio = document.getElementById('bg-music');
    if (audio && !audio.paused) {
        localStorage.setItem('mv_music_time', audio.currentTime);
    }

    const overlay = document.getElementById('mv-overlay')
                 || document.getElementById('transition-overlay');
    if (overlay) {
        overlay.style.transition = 'opacity 0.35s ease';
        overlay.style.opacity    = '1';

        setTimeout(() => {
            if (audio && !audio.paused) {
                localStorage.setItem('mv_music_time', audio.currentTime);
            }
            localStorage.setItem('mv_depart_ts', Date.now());
            window.location.href = href;
        }, 360);
    } else {
        localStorage.setItem('mv_depart_ts', Date.now());
        window.location.href = href;
    }
}

/* Click universe portal → timeline0x.html */
function enterUniverse(num) {
    const padded = String(num).padStart(2, '0');
    _navigateMv('timeline' + padded + '.html');
}

/* Back button on timeline → multiverse.html */
function goBackToMultiverse() {
    _navigateMv('multiverse.html');
}

/* Continue Story button → index.html
   Wipe music state so next multiverse visit is fresh */
function goNext() {
    localStorage.removeItem('mv_active');
    localStorage.removeItem('mv_music_time');
    _navigateMv('index.html#reasons');
}

/* Back button on multiverse.html → index.html
   Wipe music state so next multiverse visit is fresh */
function fadeOut(e, href) {
    if (e) e.preventDefault();
    localStorage.removeItem('mv_active');
    localStorage.removeItem('mv_music_time');
    _navigateMv(href);
}