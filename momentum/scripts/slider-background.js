const max = 20;
const min = 1;
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
const photoSourseRadioButtons = document.querySelectorAll(".photoSourse__radio");
const tagInput = document.querySelector("#tag");

let checkedRadioButton = document.querySelector(`#${settings.photoSource}`);
let randomNum;

function getRandomNum(min, max) {
    randomNum = Math.floor(Math.random() * (max - min) + min);
}

function setBackgroundImage() {
    const date = new Date();
    const hours = date.getHours();
    const timeOfDay = getTimeOfDay(hours);
    switch (settings.photoSource) {
        case "github":
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
    getRandomNum(min, max);
    let numberBackgroundImage = randomNum;
    numberBackgroundImage = numberBackgroundImage > 9 ? numberBackgroundImage : "0" + numberBackgroundImage;
    const urlBackgroundImage = `https://raw.githubusercontent.com/gorobchenko-k/momentum-images/main/${timeOfDay}/${numberBackgroundImage}.webp`;
    const img = new Image();
    img.src = urlBackgroundImage;
    img.addEventListener('load', () => {
        document.body.style.backgroundImage = `url('${urlBackgroundImage}')`;
    });
    tagInput.value = timeOfDay;
}

async function getLinkToImageUnsplash(timeOfDay) {
    const tag = settings.photoTag ? settings.photoTag : timeOfDay;
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=0UO_pALeJCFuKBIj8IpJEuypsLFSVG-YaIoKYSJQHIg`;
    const res = await fetch(url);
    const data = await res.json();
    const urlBackgroundImage = data.urls.regular;
    const img = new Image();
    img.src = urlBackgroundImage;
    img.addEventListener('load', () => {
        document.body.style.backgroundImage = `url('${urlBackgroundImage}')`;
    });
    tagInput.value = tag;
}

async function getLinkToImageFlickr(timeOfDay) {
    const tag = settings.photoTag ? settings.photoTag : timeOfDay;
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e57f2613daf7544590197cc2c8ac5f8d&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    const urlBackgroundImage = data.photos.photo[randomNum].url_l;
    const img = new Image();
    img.src = urlBackgroundImage;
    img.addEventListener('load', () => {
        document.body.style.backgroundImage = `url('${urlBackgroundImage}')`;
    });
    tagInput.value = tag;
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

function disabledInput(elem) {
    tagInput.disabled = elem.value === 'github';
}

function setPhotoTag(event) {
    if (event.code === 'Enter') {
        settings.photoTag = tagInput.value !== '' ? tagInput.value : null;
        setBackgroundImage();
        tagInput.blur();
    }
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

checkedRadioButton.checked = true;
disabledInput(checkedRadioButton);

photoSourseRadioButtons.forEach(item => item.addEventListener('change', function (e) {
    settings.photoSource = e.target.value;
    setBackgroundImage();
    disabledInput(e.target);
}));

tagInput.addEventListener("keypress", setPhotoTag);
getRandomNum(min, max);
setBackgroundImage();