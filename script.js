
/* =========================================
   PROJECT LILY — COMPLETE script.js
   ========================================= */

// Letter tiles
const letters = [...document.querySelectorAll(".letter")];

// Opening screen elements
const statusText = document.getElementById("status");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

// YES reaction screen
const nextScreen = document.getElementById("nextScreen");
const backBtn = document.getElementById("backBtn");

// NO reaction screen
const noReaction = document.getElementById("noReaction");
const dragVideo = document.getElementById("dragVideo");
const decideAgainBtn = document.getElementById("decideAgainBtn");


/* =========================================
   1. ANIMATE THE LETTERS: "Hi Lily!"
   ========================================= */

function startLetterAnimation() {
  // H, i, space, L, i, l, y, !
  // The space is index 2, so it is skipped.
  const sequence = [0, 1, 3, 4, 5, 6, 7];

  // Reset every tile
  letters.forEach(letter => {
    letter.classList.remove("show");
    letter.style.opacity = "0";
  });

  // Reveal the letters one by one
  sequence.forEach((index, step) => {
    setTimeout(() => {
      if (letters[index]) {
        letters[index].classList.add("show");
      }
    }, step * 300);
  });

  // Show a small message after the animation
  setTimeout(() => {
    if (statusText) {
      statusText.textContent =
        "There is a little surprise waiting for you! My lady💗";
    }
  }, sequence.length * 300 + 300);
}

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(startLetterAnimation, 400);
});


/* =========================================
   2. NO BUTTON — SHOW THE DRAGGING VIDEO
   ========================================= */


noBtn.addEventListener("click", () => {
  window.location.href = "video.html";
});



/* =========================================
   3. RETURN TO THE OPENING SCREEN
   ========================================= */

decideAgainBtn.addEventListener("click", () => {
  // Stop and reset the video
  dragVideo.pause();
  dragVideo.currentTime = 0;

  // Hide the NO reaction screen
  noReaction.hidden = true;
});


/* =========================================
   4. YES BUTTON — OPEN THE SURPRISE SCREEN
   ========================================= */


let yesAttempts = 0;
let yesSurrendered = false;

function moveYesButton() {
  if (yesSurrendered) return;

  yesAttempts++;

  if (yesAttempts >= 5) {
    yesSurrendered = true;

    yesBtn.style.position = "relative";
    yesBtn.style.left = "";
    yesBtn.style.top = "";
    yesBtn.style.zIndex = "";

    yesBtn.textContent = "♥ YES, YOU WIN! ♥";

    if (statusText) {
      statusText.textContent = "Hehe, okay Lily! You caught me! 💗";
    }
    return;
  }

  const rect = yesBtn.getBoundingClientRect();
  const margin = 12;

  const maxX = Math.max(margin, window.innerWidth - rect.width - margin);
  const maxY = Math.max(margin, window.innerHeight - rect.height - margin);

  yesBtn.style.position = "fixed";
  yesBtn.style.left = (margin + Math.random() * (maxX - margin)) + "px";
  yesBtn.style.top = (margin + Math.random() * (maxY - margin)) + "px";
  yesBtn.style.zIndex = "9999";

  if (statusText) {
    statusText.textContent = [
      "Hehe, catch me if you can! 💕",
      "Too slow, Lily! 🤭",
      "Almost got me! 🧸",
      "You really want to see it, huh? 💗"
    ][Math.min(yesAttempts - 1, 3)];
  }
}

yesBtn.addEventListener("pointerenter", moveYesButton);

yesBtn.addEventListener("click", () => {
  if (!yesSurrendered) {
    moveYesButton();
    return;
  }

  nextScreen.hidden = false;
});

yesBtn.addEventListener("touchstart", (event) => {
  if (!yesSurrendered) {
    event.preventDefault();
    moveYesButton();
  }
}, { passive: false });



/* =========================================
   5. RETURN FROM THE YES SCREEN
   ========================================= */

backBtn.addEventListener("click", () => {
  // Return to the opening screen
  nextScreen.hidden = true;

  // Update the status message
  if (statusText) {
    statusText.textContent =
      "There is a little surprise waiting for you! My lady💗";
  }
});
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href = "game.html";
  });
}
