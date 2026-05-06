/* ═══════════════════════════════════════════════════
   musicforindex.js
   Handles happy.mp3 on index.html only.
═══════════════════════════════════════════════════ */

const BDAY_VOLUME  = 0.15;
const BDAY_FADE_MS = 2000;

function _bdayFadeIn(audio) {
    audio.volume = 0;
    audio.play().catch(() => {});
    const steps   = 30;
    const stepMs  = BDAY_FADE_MS / steps;
    const volStep = BDAY_VOLUME / steps;
    let v = 0;
    const t = setInterval(() => {
        v += volStep;
        if (v >= BDAY_VOLUME) { audio.volume = BDAY_VOLUME; clearInterval(t); }
        else                  { audio.volume = v; }
    }, stepMs);
}

/* Start birthday music on very first click anywhere */
window.addEventListener('click', () => {
    const music = document.getElementById('bday-music');
    if (music && music.paused) _bdayFadeIn(music);
}, { once: true });

function openMultiverse() {
    const bday = document.getElementById('bday-music');
    if (bday) { bday.pause(); bday.currentTime = 0; }

    localStorage.removeItem('mv_active');
    localStorage.removeItem('mv_music_time');

    const ov = document.getElementById('transition-overlay');
    if (ov) {
        ov.style.transition = 'opacity 0.4s ease';
        ov.style.opacity    = '1';
        setTimeout(() => { window.location.href = 'multiverse.html'; }, 420);
    } else {
        window.location.href = 'multiverse.html';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('mv_active');
    localStorage.removeItem('mv_music_time');
});