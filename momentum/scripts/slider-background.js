const max = 20;
const min = 1;
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");

let randomNum;
function getRandomNum() {
    randomNum = Math.floor(Math.random() * (max - min) + min);
}

function setBackgroundImage() {
    const date = new Date();
    const hours = date.getHours();
    const timeOfDay = getTimeOfDay(hours);
    let numberBackgroundImage = randomNum;
    numberBackgroundImage = numberBackgroundImage > 9 ? numberBackgroundImage : "0" + numberBackgroundImage;
    const urlBackgroundImage = `https://raw.githubusercontent.com/gorobchenko-k/momentum-images/main/${timeOfDay}/${numberBackgroundImage}.webp`;
    const img = new Image();
    img.src = urlBackgroundImage;
    img.addEventListener('load', () => {
        document.body.style.backgroundImage = `url('${urlBackgroundImage}')`;
    });
}

function getSlideNext() {
    if (randomNum < 20) {
        randomNum += 1;
    } else {
        randomNum = 1;
    }
    setBackgroundImage();
}

function getSlidePrev() {
    if (randomNum > 1) {
        randomNum -= 1;
    } else {
        randomNum = 20;
    }
    setBackgroundImage();
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

getRandomNum();
setBackgroundImage();