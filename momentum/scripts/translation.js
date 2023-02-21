const settingsText = {
    'en': {
        'settings': 'Settings',
        'language': 'Language',
        'photoSource': 'Photo Source',
        'tag': 'Tag',
        'blocks': 'Blocks',
        'blocksName': ['Time', 'Date', 'Greeting', 'Quote', 'Weather', 'Player']
    },
    'ru': {
        'settings': 'Настройки',
        'language': 'Язык',
        'photoSource': 'Источник фото',
        'tag': 'Тег',
        'blocks': 'Блоки',
        'blocksName': ['Время', 'Дата', 'Приветствие', 'Цитата', 'Погода', 'Аудиоплеер']
    }
};

const langEN = document.querySelector(".lang-en");
const langRU = document.querySelector(".lang-ru");

function changeLang(lang) {
    settings.language = lang;
    nameInput.placeholder = settings.language === 'en' ? "[Enter name]" : "[Введите имя]";
    showTime();
    getWeather();
    getQuotes();
    setSettingsTranslation();
}

function setSettingsTranslation() {
    const lang = settings.language;
    const settingsTitle = document.querySelector(".settings__title");
    const settingsLanguage = document.querySelector(".switchLang>.settings__sub-title");
    const settingsPhotoSource = document.querySelector(".photoSourse>.settings__sub-title");
    const settingsTag = document.querySelector(".settings__tag");
    const settingsBlock = document.querySelector(".blocks>.settings__sub-title");
    const settingsBlocks = document.querySelectorAll(".blocks__label>span");

    settingsTitle.textContent = settingsText[lang].settings;
    settingsLanguage.textContent = settingsText[lang].language + ": ";
    settingsPhotoSource.textContent = settingsText[lang].photoSource + ": ";
    settingsTag.textContent = settingsText[lang].tag + ": ";
    settingsBlock.textContent = settingsText[lang].blocks + ": ";
    settingsBlocks.forEach((item, index) => item.textContent = settingsText[lang].blocksName[index]);
}

if (settings.language === "en") {
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

setSettingsTranslation();