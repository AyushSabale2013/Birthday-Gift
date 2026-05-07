/* =========================================
      THE "SPIDER-VERSE" CHAOS SCRIPT
=========================================
*/

const question = document.getElementById("question");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const proposalBox = document.getElementById("proposalBox");

/* Stages of grief for the person clicking NO
*/
const stages = [
    "Wait... that wasn't part of the canon event.",
    "Pakka ? I mean itna sab hone ke baad bhi ?",
    "Are you sure ? I won't ask again...",
    "After everything we've been through... still no? 😭",
    "You're really gonna break Spider-Man's heart like this?",
    "One last chance before this universe collapses..",
    "please think again and confirm ur ans (if u can)"
];

let currentStage = 0;
let dodgeMode = false;

/* NO CLICK LOGIC
   Handles the stages before the button activates Spider-Sense (dodge) mode
*/
noBtn.addEventListener("click", () => {
    if (currentStage < stages.length) {
        updateQuestion(stages[currentStage]);
        shakeBox(); // Shake the whole box for more impact
        currentStage++;

        /* Activate Dodge Mode on final stage */
        if (currentStage === stages.length) {
            activateSpiderSense();
        }
    }
});

/* Update Question text smoothly with glitch data attribute */
function updateQuestion(text) {
    question.style.opacity = 0;

    setTimeout(() => {
        question.innerText = text;
        // REQUIRED FOR CSS GLITCH EFFECT
        question.setAttribute("data-text", text);
        question.style.opacity = 1;
    }, 180);
}

/* Shake the whole proposal box */
function shakeBox() {
    proposalBox.classList.add("shake");
    setTimeout(() => {
        proposalBox.classList.remove("shake");
    }, 300);
}

/* Triggered when NO button starts running away */
function activateSpiderSense() {
    dodgeMode = true;

    // Spawn extreme comic pops to scare them
    showComicPop(window.innerWidth / 2, window.innerHeight / 2, "⚠️DANGER⚠️");
    setTimeout(() => showComicPop(window.innerWidth / 2 - 100, window.innerHeight / 2 + 50, "SPIDEY SENSE"), 200);
}

/* Dodge Mode Logic
   Continuously teleports the button when mouse gets near
*/
document.addEventListener("mousemove", (e) => {
    if (!dodgeMode) return;

    const rect = noBtn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    // Calculate distance between mouse and center of NO button
    const distance = Math.hypot(e.clientX - btnX, e.clientY - btnY);

    // If mouse gets within proximity (200px), run away
    if (distance < 200) {
        dodgeNo(noBtn);
    }
});

/* Teleports the button to a random visible spot on the body context */
function dodgeNo(btn) {
    // Break the button out of the box context so it remains visible 
    // over 'overflow:hidden' parents
    if (btn.parentNode !== document.body) {
        document.body.appendChild(btn);
        btn.style.position = "fixed";
        btn.style.zIndex = "99999"; // Sit on absolute top
    }

    const padding = 50; // Keep away from extreme screen edges
    const maxX = window.innerWidth - btn.offsetWidth - padding;
    const maxY = window.innerHeight - btn.offsetHeight - padding;

    // Generate random coordinates
    const newX = Math.max(padding, Math.random() * maxX);
    const newY = Math.max(padding, Math.random() * maxY);

    // Apply new position and comic rotation
    btn.style.left = newX + "px";
    btn.style.top = newY + "px";
    btn.style.transition = "0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"; // Snappy move
    btn.style.transform = `rotate(${Math.random() * 40 - 20}deg) scale(1.1)`;

    // Spawn comic action word at new location
    showComicPop(newX, newY);
}

/* Spawns comic action words ("THWIP!", "BAM!") */
function showComicPop(x, y, customText = null) {
    const pop = document.createElement("div");
    pop.className = "comic-pop";

    const msgs = ["NOPE!", "TOO SLOW!", "MISS!", "🕷️", "WHOOSH!", "CANON EVENT", "THWIP!"];

    pop.textContent = customText || msgs[Math.floor(Math.random() * msgs.length)];
    // Ensure "data-text" is set for future-proofing glitch effects on pops
    pop.setAttribute("data-text", pop.textContent);

    // Position adjustments so the word pops up nicely
    pop.style.left = (x - 20) + "px";
    pop.style.top = (y - 70) + "px";

    // Random tilt for every pop
    pop.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;

    document.body.appendChild(pop);

    // Remove from DOM after animation completes
    setTimeout(() => {
        pop.remove();
    }, 500);
}

/* YES CLICK - WIN STATE
*/
yesBtn.addEventListener("click", () => {
    // Destroy the NO button immediately
    if (noBtn.parentNode) {
        noBtn.parentNode.removeChild(noBtn);
    }

    dodgeMode = false; // Stop listening to mousemove dodge logic

    // Replace box contents with the final message
    // NOTICE: 'data-text="YAYYYYY ❤️"' is added here to trigger the new glitch CSS
    proposalBox.innerHTML = `
        <div class="final-message">
            <h1 class="question" data-text="YAYYYYY ❤️" style="margin-bottom: 20px;">
                YAYYYYY ❤️
            </h1>
            <p>
                So officially... you're mine now. ❤️
                <br><br>
                From all the chaos, deep conversations, emotional moments, and multiverse memories... this became my favorite story.
                <br><br>
                And trust me — I'd choose you in every universe. 🕸️
            </p>
        </div>
    `;

    // Celebration effects - Spam heart pops
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            showComicPop(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight,
                "❤️"
            );
        }, i * 150);
    }
});

const particles =
    document.querySelector(".particles");

for (let i = 0; i < 40; i++) {

    const p =
        document.createElement("span");

    p.style.left =
        Math.random() * 100 + "%";

    p.style.animationDuration =
        (4 + Math.random() * 8) + "s";

    p.style.animationDelay =
        Math.random() * 5 + "s";

    particles.appendChild(p);
}