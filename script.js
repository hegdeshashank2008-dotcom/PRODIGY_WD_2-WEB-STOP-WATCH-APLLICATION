let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let display = document.getElementById("display");
let interval = null;
let lapsContainer = document.getElementById("laps");
let beep = document.getElementById("beep-sound");
const backToTop = document.getElementById("backToTop");

// 🕒 Update Time Display
function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 10 ? "0" + milliseconds : milliseconds;
  display.innerText = `${h}:${m}:${s}.${ms}`;
}

// 🔁 Main Stopwatch Logic
function stopwatch() {
  milliseconds += 1;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
  }
  updateDisplay();
}

// ▶️ Start
function start() {
  if (interval !== null) return;
  interval = setInterval(stopwatch, 10);
}

// ⏸ Pause
function pause() {
  clearInterval(interval);
  interval = null;
}

// 🔄 Reset
function reset() {
  clearInterval(interval);
  interval = null;
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  updateDisplay();
  lapsContainer.innerHTML = '';
}

// 📌 Add Lap
function lap() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 10 ? "0" + milliseconds : milliseconds;

  const li = document.createElement("li");
  li.innerText = `Lap: ${h}:${m}:${s}.${ms}`;
  li.classList.add("fade-in-left"); // Optional animation
  lapsContainer.appendChild(li);

  beep.currentTime = 0;
  beep.play();
}

// 🔝 Back to Top Button Logic
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
