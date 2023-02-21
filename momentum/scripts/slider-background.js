const max = 20;
const min = 1;
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
let photoSource = "unsplash"; //unsplash gitHub flickr 

let randomNum;
function getRandomNum(min, max) {
    randomNum = Math.floor(Math.random() * (max - min) + min);
}

function setBackgroundImage() {
    const date = new Date();
    const hours = date.getHours();
    const timeOfDay = getTimeOfDay(hours);
    switch (photoSource) {
        case "gitHub":
            getLinkToImageGitHub(timeOfDay);
            break;
        case "unsplash":
            getLinkToImageUnsplash(timeOfDay);
            break;
        case "flickr":
            getLinkToImageFlickr(timeOfDay);
            break;
        default:
            break;
    }
}

function getLinkToImageGitHub(timeOfDay) {
    let numberBackgroundImage = randomNum;
    numberBackgroundImage = numberBackgroundImage > 9 ? numberBackgroundImage : "0" + numberBackgroundImage;
    const urlBackgroundImage = `https://raw.githubusercontent.com/gorobchenko-k/momentum-images/main/${timeOfDay}/${numberBackgroundImage}.webp`;
    const img = new Image();
    img.src = urlBackgroundImage;
    img.addEventListener('load', () => {
        document.body.style.backgroundImage = `url('${urlBackgroundImage}')`;
    });
}

async function getLinkToImageUnsplash(timeOfDay) {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=0UO_pALeJCFuKBIj8IpJEuypsLFSVG-YaIoKYSJQHIg`;
    const res = await fetch(url);
    const data = await res.json();
    const urlBackgroundImage = data.urls.regular;
    const img = new Image();
    img.src = urlBackgroundImage;
    img.addEventListener('load', () => {
        document.body.style.backgroundImage = `url('${urlBackgroundImage}')`;
    });
}

async function getLinkToImageFlickr(timeOfDay) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e57f2613daf7544590197cc2c8ac5f8d&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    const urlBackgroundImage = data.photos.photo[randomNum].url_l;
    const img = new Image();
    img.src = urlBackgroundImage;
    img.addEventListener('load', () => {
        document.body.style.backgroundImage = `url('${urlBackgroundImage}')`;
    });

    return urlBackgroundImage;
}

function getSlideNext() {
    if (randomNum < max) {
        randomNum += 1;
    } else {
        randomNum = min;
    }
    setBackgroundImage();
}

function getSlidePrev() {
    if (randomNum > min) {
        randomNum -= 1;
    } else {
        randomNum = max;
    }
    setBackgroundImage();
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

getRandomNum(min, max);
setBackgroundImage();