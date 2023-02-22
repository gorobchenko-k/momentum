const settingsButton = document.querySelector(".settings-icon");
const settingsBar = document.querySelector(".settings__bar");
const blocksCheckboxs = document.querySelectorAll(".blocks__checkbox");

let settings = {
    photoTag: null,
    photoSource: 'github',
    language: 'en',
    blocks: {
        'time': true,
        'date': true,
        'greeting': true,
        'quote': true,
        'weather': true,
        'player': true,
    }
};

function showSettingsBar() {
    settingsBar.classList.toggle("_active");
}

function hideBlocks(elem) {
    const blockName = elem.value;
    const blockElem = document.querySelector(`.${blockName}`);

    if (settings.blocks[blockName]) {
        blockElem.classList.remove("_hidden");
    } else {
        blockElem.classList.add("_hidden");
    }
}

function setSettingsLocalStorege() {
    localStorage.setItem('settings', JSON.stringify(settings));
}

function getSettingsLocalStorege() {
    if (localStorage.getItem('settings')) {
        settings = JSON.parse(localStorage.getItem('settings'));
    }
}
getSettingsLocalStorege();
blocksCheckboxs.forEach(item => {
    hideBlocks(item);
});
settingsButton.addEventListener("click", showSettingsBar);

for (const block in settings.blocks) {
    const blockElem = document.querySelector(`#${block}`);
    if (settings.blocks[block]) {
        blockElem.checked = true;
    }
}

blocksCheckboxs.forEach(item => item.addEventListener('change', function (e) {
    settings.blocks[e.target.value] = e.target.checked;
    hideBlocks(e.target);
}));

window.addEventListener("beforeunload", setSettingsLocalStorege);