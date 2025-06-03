const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const songTitle = document.querySelector(".song-title");
const albumCover = document.getElementById("album-cover");
const timeDisplay = document.getElementById("time");
const volumeSlider = document.getElementById("volume-slider");

let currentSongIndex = 0;
let isPlaying = false;

// 🎵 Your songs list
const songs = [
  {
    title: "The Beauty of Existence Lofi(slowed and Reverb) Muhammad Al Muqit",
    src: "songs/song1.mp3",
    cover: "images/cover1.jpg"
  },
  {
    title: "Kun Anta Humood (slowed + reverb)",
    src: "songs/song2.mp3",
    cover: "images/cover2.jpg"
  }
];

// 🔄 Load song data
function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  songTitle.textContent = song.title;
  albumCover.src = song.cover;
}

// ▶️ Play song
function playSong() {
  audio.play();
  isPlaying = true;
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// ⏸ Pause song
function pauseSong() {
  audio.pause();
  isPlaying = false;
  playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
}

// ⏩ Next song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

// ⏪ Previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

// 🔁 Update progress bar and time
function updateProgress() {
  const duration = audio.duration;
  const currentTime = audio.currentTime;
  if (!isNaN(duration)) {
    const percent = (currentTime / duration) * 100;
    progress.style.width = `${percent}%`;
    timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
  }
}

// 🕒 Format time
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// 📍 Seek on click
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  if (!isNaN(duration)) {
    audio.currentTime = (clickX / width) * duration;
  }
});

// 🔊 Volume control
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;
});

// 🔄 Event listeners
playPauseBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);

// 🚀 Initialize
loadSong(currentSongIndex);
