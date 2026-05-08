// music 
const music = document.getElementById("bgMusic");

/* autoplay fix for browsers */
window.addEventListener("click", () => {
    music.play();
}, { once: true });


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
    "Well that wasn't expected 😑",
    "Pakka ? 🤨 I mean itna sab hone ke baad bhi ?",
    "Are you sure ? I won't ask again... 😤",
    "After everything we've been through... still no? 😭",
    "You're really gonna break Spider-Man's heart like this?",
    "One last chance… be mine? 🥺",
    "Okay 😤 Confirm ur ans (If u can) 😏"
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

let activeComicPops = 0;
const maxComicPops = 7;

document.addEventListener("mousemove", (e) => {

    if (!dodgeMode) return;

    const rect = noBtn.getBoundingClientRect();

    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    // Distance between cursor and button center
    const distance =
        Math.hypot(e.clientX - btnX, e.clientY - btnY);

    // Dodge if cursor gets close
    if (distance < 200) {
        dodgeNo(noBtn);
    }
});

/* =========================================
BUTTON DODGE LOGIC
========================================= */

function dodgeNo(btn) {

    // Move button outside overflow containers
    if (btn.parentNode !== document.body) {

        document.body.appendChild(btn);

        btn.style.position = "fixed";
        btn.style.zIndex = "99999";
    }

    const padding = 50;

    const maxX =
        window.innerWidth - btn.offsetWidth - padding;

    const maxY =
        window.innerHeight - btn.offsetHeight - padding;

    // Better random placement
    const newX =
        Math.max(padding, Math.random() * maxX);

    const newY =
        Math.max(padding, Math.random() * maxY);

    // Fast movement
    btn.style.left = newX + "px";
    btn.style.top = newY + "px";

    btn.style.transition =
        "0.22s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    btn.style.transform =
        `rotate(${Math.random() * 30 - 15}deg) scale(1.08)`;

    // Create popup
    showComicPop(newX, newY);
}

/* =========================================
COMIC POPUP EFFECT
========================================= */

function showComicPop(x, y, customText = null) {

    // Never exceed 7 visible pops
    if (activeComicPops >= maxComicPops) return;

    // Random chance to generate popup
    // Makes popups feel natural instead of constant
    const shouldSpawn =
        Math.random() > 0.45;

    if (!shouldSpawn) return;

    activeComicPops++;

    const pop = document.createElement("div");

    pop.className = "comic-pop";

    const msgs = [
        "Nope! 👎",
        "Too Slow 🦥",
        "Missed 😉",
        "Hehehe 😂",
        "Spidey Sense 😁",
        "Nahi 😏",
        "Try Try 🙃 "
    ];

    pop.textContent =
        customText ||
        msgs[Math.floor(Math.random() * msgs.length)];

    pop.setAttribute("data-text", pop.textContent);

    pop.style.left =
        (x - 30 + Math.random() * 40) + "px";

    pop.style.top =
        (y - 80 + Math.random() * 30) + "px";

    pop.style.transform =
        `rotate(${Math.random() * 20 - 10}deg)`;

    document.body.appendChild(pop);

    setTimeout(() => {

        pop.remove();

        activeComicPops--;

    }, 2000);
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
                <h1 class="question" data-text="Awwwwww 💕" style="margin-bottom: 20px;">
                Awwwwww 💕
                </h1>
                <p>
                    So officially... you're mine now. ❤️
                    <br><br>
                    I knew it before 😊<br>
                    I was doing perfectly fine before you became my favorite notification. 
                    <br >HBD MJ ❣️
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