import playList from './playList.js';

const audio = new Audio();
const buttonPlay = document.querySelector(".play");
const buttonPlayPrev = document.querySelector(".play-prev");
const buttonPlayNext = document.querySelector(".play-next");
const playListContainer = document.querySelector(".play-list");
const audioName = document.querySelector(".palyer__name");
const audioDuration = document.querySelector(".palyer__length");
const audioCurrentTime = document.querySelector(".palyer__current");
const volumeSlider = document.querySelector(".volume__slider");
const volumeIcon = document.querySelector(".volume-icon");
const timeline = document.querySelector(".palyer__timeline");
const progressBar = document.querySelector(".palyer__progress");

let isPlay = false;
let playNum = 0;

function playAudio() {
    if (isPlay) {
        audio.pause();
        buttonPlay.style.backgroundImage = 'url("../assets/svg/play.svg")';
        isPlay = false;
    } else {
        audio.play();
        buttonPlay.style.backgroundImage = 'url("../assets/svg/pause.svg")';
        isPlay = true;
    }
}

function setAudio() {
    audioName.textContent = playList[playNum].title;
    audioDuration.textContent = playList[playNum].duration;
    playItems.forEach(item => item.classList.remove("item-active"));
    playItems[playNum].classList.add("item-active");
    audio.src = playList[playNum].src;
    isPlay = false;
}

function playNext() {
    if (playNum < playList.length - 1) {
        playNum += 1;
    } else {
        playNum = 0;
    }
    setAudio();
    playAudio();
}

function playPrev() {
    if (playNum > 0) {
        playNum -= 1;
    } else {
        playNum = playList.length - 1;
    }
    setAudio();
    playAudio();
}

function setVolume(newVolume) {
    audio.volume = newVolume;
    volumeSlider.querySelector(".volume__percentage").style.width = newVolume * 100 + '%';
}

function updateTimelineValue(e) {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
}

function showCurrentTimeAudio() {
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    audioCurrentTime.textContent = getTimeCodeFromNum(audio.currentTime);
    setTimeout(showCurrentTimeAudio, 500);
}

playList.forEach(item => {
    const playItem = document.createElement('li');
    playItem.classList.add("play-item");
    playItem.textContent = item.title;
    playListContainer.append(playItem);
});
buttonPlay.addEventListener("click", playAudio);
buttonPlayPrev.addEventListener("click", playPrev);
buttonPlayNext.addEventListener("click", playNext);
audio.addEventListener("ended", playNext);

const playItems = document.querySelectorAll(".play-item");
showCurrentTimeAudio();
setAudio();
setVolume(0.7);

volumeSlider.addEventListener('click', (e) => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    setVolume(newVolume);
});

volumeIcon.addEventListener("click", () => {
    if (volumeIcon.classList.contains("_off")) {
        setVolume(0.7);
    } else {
        setVolume(0);
    }
    volumeIcon.classList.toggle("_off");
});

timeline.addEventListener("click", (e) => {
    updateTimelineValue(e);
});