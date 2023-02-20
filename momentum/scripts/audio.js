import playList from './playList.js';

const audio = new Audio();
const buttonPlay = document.querySelector(".play");
const buttonPlayPrev = document.querySelector(".play-prev");
const buttonPlayNext = document.querySelector(".play-next");
const playListContainer = document.querySelector(".play-list");
let isPlay = false;
let playNum = 0;

function playAudio() {
    audio.src = playList[playNum].src;
    playItems.forEach(item => item.classList.remove("item-active"));
    playItems[playNum].classList.add("item-active");
    audio.currentTime = 0;
    audio.play();
}

function playStopAudio() {
    audio.src = playList[playNum].src;
    playItems.forEach(item => item.classList.remove("item-active"));
    playItems[playNum].classList.add("item-active");
    if (isPlay) {
        audio.pause();
        buttonPlay.style.backgroundImage = 'url("../assets/svg/play.svg")';
    } else {
        audio.play();
        buttonPlay.style.backgroundImage = 'url("../assets/svg/pause.svg")';
    }
    isPlay = !isPlay;
}

function playNext() {
    if (playNum < playList.length - 1) {
        playNum += 1;
    } else {
        playNum = 0;
    }
    playAudio();
}

function playPrev() {
    if (playNum > 0) {
        playNum -= 1;
    } else {
        playNum = playList.length - 1;
    }
    playAudio();
}

playList.forEach(item => {
    const playItem = document.createElement('li');
    playItem.classList.add("play-item");
    playItem.textContent = item.title;
    playListContainer.append(playItem);
});
buttonPlay.addEventListener("click", playStopAudio);
buttonPlayPrev.addEventListener("click", playPrev);
buttonPlayNext.addEventListener("click", playNext);
audio.addEventListener("ended", playNext);

const playItems = document.querySelectorAll(".play-item");