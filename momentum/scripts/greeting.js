const greetingElement = document.querySelector(".greeting");
const nameInput = document.querySelector(".name");


function getTimeOfDay(hours) {
    const timeOfDay = {
        0: 'Спокойной ночи',
        1: 'Доброе утро',
        2: 'Добрый день',
        3: 'Добрый вечер',
    }

    return timeOfDay[Math.floor(hours / 6)];

}

function showGreeting(date) {
    const hours = date.getHours();
    const timeOfDay = getTimeOfDay(hours);
    const greetingText = `${timeOfDay}, `;

    greetingElement.textContent = greetingText;
}

function setLocalStorege() {
    localStorage.setItem('name', nameInput.value);
}

function getLocalStorege() {
    if (localStorage.getItem('name')) {
        nameInput.value = localStorage.getItem('name');
    }
}

window.addEventListener("beforeunload", setLocalStorege);
window.addEventListener("load", getLocalStorege);