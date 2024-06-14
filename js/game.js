const dino = document.getElementById("dino");
const rock = document.getElementById("rock");
const score = document.getElementById("score");
const startButton = document.getElementById("startButton");
const game = document.getElementById("game");
const backgroundAudio = new Audio(
    "https://github.com/DavidBloechliger/CL2_David_Ennio_Frowin_Kim/raw/c600093cea403ef5d1e57c50b5bec50cd045974e/sounds/DrumGroove.mp3"
);
const jumpSound = new Audio(
    "https://github.com/DavidBloechliger/CL2_David_Ennio_Frowin_Kim/raw/c600093cea403ef5d1e57c50b5bec50cd045974e/sounds/Jumping-Jump-2.mp3"
);

// Stelle sicher, dass die Hintergrundmusik in einer Dauerschleife abgespielt wird
backgroundAudio.loop = true;

let isGameRunning = false;
let gameLoopInterval = null;

function jump() {
    if (isGameRunning && !dino.classList.contains("jump-animation")) {
        dino.classList.add("jump-animation");
        setTimeout(() => {
            dino.classList.remove("jump-animation");
            jumpSound.currentTime = 0; // Setze den Sprung-Soundeffekt auf den Anfang zurück
            jumpSound.play(); // Spiele den Sprung-Soundeffekt ab
        }, 500);
    }
}

document.addEventListener("keypress", (event) => {
    if (isGameRunning) {
        jump();
    }
});

function startGameLoop() {
    gameLoopInterval = setInterval(() => {
        const dinoRect = dino.getBoundingClientRect();
        const rockRect = rock.getBoundingClientRect();

        score.innerText = parseInt(score.innerText) + 1;

        if (rockRect.left < 0) {
            // Zurücksetzen der Position des Hindernisses weiter links
            rock.style.left = "550px"; // Hier die gewünschte Startposition in Pixeln eintragen
        }

        // Collision detection
        if (
            rockRect.left < dinoRect.right &&
            rockRect.right > dinoRect.left &&
            rockRect.top < dinoRect.bottom &&
            rockRect.bottom > dinoRect.top
        ) {
            stopGame();
        }
    }, 50);
}

function startGame() {
    isGameRunning = true;
    backgroundAudio.currentTime = 0; // Setze die Hintergrundmusik auf den Anfang zurück
    backgroundAudio.play(); // Starte die Hintergrundmusik
    score.innerText = 0;
    rock.style.left = "500px"; // Startposition des Hindernisses beim Start des Spiels
    rock.style.animation = `rock 1.33s infinite linear`;
    game.classList.add("running"); // Add the running class to start background animation
    startGameLoop();
    startButton.disabled = true;
}

function stopGame() {
    isGameRunning = false;
    backgroundAudio.pause(); // Stoppe die Hintergrundmusik
    rock.style.animation = "none";
    game.classList.remove("running"); // Remove the running class to stop background animation
    clearInterval(gameLoopInterval);
    startButton.disabled = false;
}

startButton.addEventListener("click", startGame);

// Initialisieren beim Laden der Seite
document.addEventListener("DOMContentLoaded", function() {
    rock.style.animation = "none";
    game.classList.remove("running");
});