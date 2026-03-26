// =======================================faster presser game====================================

const timeoutInput = document.getElementById("timeoutInput");
const gameStartButton = document.getElementById("gameStartButton");
const countS = document.getElementById("countS");
const countL = document.getElementById("countL");
const countdownDisplay = document.getElementById("countdownDisplay");

let gameActive = false;
let countdownInterval = null;

gameStartButton.addEventListener("click", () => {
    const gameTimeSeconds = Number(timeoutInput.value.trim());
    if (isNaN(gameTimeSeconds) || gameTimeSeconds <= 0 || timeoutInput.value.trim() === "") {
        alert("Please enter a valid positive number for game time.");
        return;
    }   

    gameActive = true;

    // Start countdown display
    let timeLeft = gameTimeSeconds;
    countdownDisplay.textContent = timeLeft;
    countdownInterval = setInterval(() => {
        timeLeft--;
        countdownDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);

    setTimeout(() => {
        finishGame();
    }
    , gameTimeSeconds * 1000);

    countSClicks();
    countLClicks();
});


function countSClicks() {
    let sCount = 0;
    document.addEventListener("keydown", (event) => {
        if (gameActive && event.key.toLowerCase() === "s") {
            sCount++;
            countS.textContent = sCount;
        }
    });
}

function countLClicks() {
    let lCount = 0;
    document.addEventListener("keydown", (event) => {
        if (gameActive && event.key.toLowerCase() === "l") {
            lCount++;
            countL.textContent = lCount;
        }
    });
}

function finishGame() {
    gameActive = false;
    
    const sPlayerScore = Number(countS.textContent);
    const lPlayerScore = Number(countL.textContent);
    const pressSContainer = document.getElementById("pressSContainer");
    const pressLContainer = document.getElementById("pressLContainer");
    
    if (sPlayerScore > lPlayerScore) {
        addConfetti(pressSContainer);
        pressSContainer.style.border = "3px solid gold";
    } else if (lPlayerScore > sPlayerScore) {
        addConfetti(pressLContainer);
        pressLContainer.style.border = "3px solid gold";
    } else {
        // Both are winners
        addConfetti(pressSContainer);
        addConfetti(pressLContainer);
        pressSContainer.style.border = "3px solid gold";
        pressLContainer.style.border = "3px solid gold";
    }
}

function addConfetti(container) {
    // Create a canvas inside the container
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);
    
    const myConfetti = confetti.create(canvas, { resize: true });
    
    myConfetti({
        particleCount: 100,
        spread: 70,
        scalar: Math.random() * 1.5 + 0.5,
        origin: { y: 1, x: 0.5 }
    });
}