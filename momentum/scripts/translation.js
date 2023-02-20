const translation = [

];
const langEN = document.querySelector(".lang-en");
const langRU = document.querySelector(".lang-ru");

let currentLang = localStorage.getItem('lang') ? localStorage.getItem('lang') : "en";

function changeLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', currentLang);
    nameInput.placeholder = currentLang === 'en' ? "[Enter name]" : "[Введите имя]";
    showTime();
    getWeather();
    getQuotes();
}

if (currentLang === "en") {
    langEN.classList.add("_active");
} else {
    langRU.classList.add("_active");
}

langEN.addEventListener("click", () => {
    changeLang('en');
    langRU.classList.remove("_active");
    langEN.classList.add("_active");
});
langRU.addEventListener("click", () => {
    changeLang('ru')
    langEN.classList.remove("_active");
    langRU.classList.add("_active");
});
