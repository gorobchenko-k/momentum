const settingsButton = document.querySelector(".settings-icon");
const settingsBar = document.querySelector(".settings__bar");
const blocksCheckboxs = document.querySelectorAll(".blocks__checkbox");

let settings = {
    photoTag: null,
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

function hideBlocks(e) {
    const blockName = e.target.value;
    const blockElem = document.querySelector(`.${blockName}`);

    if (settings.blocks[blockName]) {
        blockElem.classList.remove("_hidden");
    } else {
        blockElem.classList.add("_hidden");
    }
}

settingsButton.addEventListener("click", showSettingsBar);
settings.language = localStorage.getItem('lang') ? localStorage.getItem('lang') : "en";
settings.photoSource = localStorage.getItem('photoSource') ? localStorage.getItem('photoSource') : "gitHub";

for (const block in settings.blocks) {
    const blockElem = document.querySelector(`#${block}`);
    if (settings.blocks[block]) {
        blockElem.checked = true;
    }
}

blocksCheckboxs.forEach(item => item.addEventListener('change', function (e) {
    settings.blocks[e.target.value] = e.target.checked;
    hideBlocks(e);
}));