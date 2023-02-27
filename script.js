const musicsData = [
  { title: "Solar", artist: "Betical", id: 1 },
  { title: "Electric-Feel", artist: "TEEMID", id: 2 },
  { title: "Aurora", artist: "SLUMB", id: 3 },
  { title: "Lost-Colours", artist: "Fakear", id: 4 },
];
const musicTitle = document.querySelector(".music-title");
const musicArtist = document.querySelector(".artist-name");
const musicID = document.querySelector(".current-index");
const thumbnail = document.querySelector(".thumbnail");
const playPauseBtn = document.querySelector(".play-btn");
const music = document.querySelector("audio");
playPauseBtn.addEventListener("click", handlePlayPause);

const logoCD = document.querySelector(".disque img");

let currentMusicIndex = 1;

function populateUI({ title, artist }) {
  musicArtist.textContent = artist;
  musicTitle.textContent = title;
  musicID.textContent = `${currentMusicIndex}/${musicsData.length}`;
  thumbnail.src = `./ressources/thumbs/${title}.png`;
  music.src = `./ressources/music/${title}.mp3`;
}
populateUI(musicsData[currentMusicIndex - 1]);

let lockBtnPlayPause = true;
function handlePlayPause() {
  if (music.paused) {
    playPauseBtn.querySelector("img").src = "./ressources/icons/pause-icon.svg";
    music.play();
    handleTimeUpdate();
    logoCD.classList.add("active");
  } else {
    playPauseBtn.querySelector("img").src = "./ressources/icons/play-icon.svg";
    music.pause();
    logoCD.classList.remove("active");
  }
}

const nextMusicButton = document.querySelector(".next-btn");
const prevMusicButton = document.querySelector(".prev-btn");

nextMusicButton.addEventListener("click", handleNextSong);
prevMusicButton.addEventListener("click", handlePrevSong);
let lockShuffle = true;

function handleNextSong() {
  if (!lockShuffle) {
    shuffleOn();
    return;
  }
  if (currentMusicIndex > 0 && currentMusicIndex < 4) {
    currentMusicIndex++;
    populateUI(musicsData[currentMusicIndex - 1]);
    handlePlayPause();
  } else if (currentMusicIndex > 3) {
    currentMusicIndex = 1;
    populateUI(musicsData[currentMusicIndex - 1]);
    handlePlayPause();
  }
}
function handlePrevSong() {
  if (!lockShuffle) {
    shuffleOn();
    return; // return est important ici et je sais pas pourquoi....
  }
  if (currentMusicIndex > 1) {
    currentMusicIndex--;
    populateUI(musicsData[currentMusicIndex - 1]);
    handlePlayPause();
  } else if ((currentMusicIndex = 1)) {
    currentMusicIndex = 4;
    populateUI(musicsData[currentMusicIndex - 1]);
    handlePlayPause();
  }
}

const shuffleButton = document.querySelector(".shuffle");

shuffleButton.addEventListener("click", toggleShuffle);

music.addEventListener("ended", handleNextSong);

function toggleShuffle() {
  if (lockShuffle) {
    shuffleButton.classList.add("active");
    lockShuffle = false;
  } else {
    shuffleButton.classList.remove("active");
    lockShuffle = true;
  }
}

let current;
let totalTime;

function shuffleOn() {
  const randomIndex = Math.floor(Math.random() * 4) + 1;

  if (!lockShuffle && randomIndex != currentMusicIndex) {
    currentMusicIndex = randomIndex;
    populateUI(musicsData[currentMusicIndex - 1]);
    music.play();
  } else shuffleOn();
}

const displayCurrentTime = document.querySelector(".current-time");
const displayDurationTime = document.querySelector(".duration-time");

music.addEventListener("loadeddata", durationVariables);

function durationVariables(e) {
  current = music.currentTime;
  totalTime = music.duration;

  formatValue(current, displayCurrentTime);
  formatValue(totalTime, displayDurationTime);
}

function formatValue(val, element) {
  const currentMin = Math.trunc(val / 60);
  let currentSec = Math.trunc(val % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }

  element.textContent = `${currentMin}:${currentSec}`;
  if (current === totalTime) {
    shuffleOn();
  }
}

const progressBar = document.querySelector(".progress-bar");
let rect = progressBar.getBoundingClientRect();
let long = rect.width;
window.addEventListener("resize", handleResize);
function handleResize() {
  rect = progressBar.getBoundingClientRect();
  long = rect.width;
}
progressBar.addEventListener("click", handleProgressBar);
function handleProgressBar(e) {
  const x =
    e.clientX -
    rect.left; /* calcul pour savoir a quel niveau de la progress bar on a cliqué*/
  const widthPercent = x / long;
  music.currentTime = music.duration * widthPercent;
}
const progress = document.querySelector(".progress");
music.addEventListener("timeupdate", handleTimeUpdate);
function handleTimeUpdate() {
  current = music.currentTime;
  formatValue(current, displayCurrentTime);
  const progressPosition = current / totalTime;
  progress.style.transform = `scaleX(${progressPosition})`;
}

console.log(Math.floor(Math.random() * 100 + 1));
