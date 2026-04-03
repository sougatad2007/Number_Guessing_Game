const guessBtn = document.getElementById("guess-btn");
const guessInput = document.getElementById("guess-input");
const messageEl = document.querySelector(".message");
const resetBtn = document.getElementById("reset-btn");
const gameBox = document.getElementById("game-box");

// Listen for the "Enter" key on the input field
guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevents default form submission behavior
    guessBtn.click();       // Triggers the guess button
  }
});

guessBtn.addEventListener("click", async () => {
  const guess = guessInput.value;
  
  if (!guess) {
      messageEl.textContent = "⚠️ Enter a number first!";
      return;
  }

  const response = await fetch("/guess", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ guess }),
  });
  
  const data = await response.json();
  
  // Update message
  messageEl.textContent = data.message;
  
  // Clear the input so it's ready for the next guess
  guessInput.value = "";
  guessInput.focus();

  // Add a fun little animation punch to the game box
  gameBox.classList.remove("pop");
  void gameBox.offsetWidth; // Trigger reflow to restart animation
  gameBox.classList.add("pop");
});

resetBtn.addEventListener("click", () => {
  location.reload();
});