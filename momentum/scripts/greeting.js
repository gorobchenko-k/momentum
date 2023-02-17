const greetingElement = document.querySelector(".greeting");
const nameInput = document.querySelector(".name");


function getTimeOfDay(hours) {
    const timeOfDay = {
        0: 'night',
        1: 'morning',
        2: 'afternoon',
        3: 'evening',
    }

    return timeOfDay[Math.floor(hours / 6)];
}

function getGreetingText(hours) {
    const greetingTextOfTime = {
        'night': 'Good night',
        'morning': 'Good morning',
        'afternoon': 'Good afternoon',
        'evening': 'Good evening',
    }

    return greetingTextOfTime[getTimeOfDay(hours)];
}

function showGreeting(date) {
    const hours = date.getHours();
    const greetingText = `${getGreetingText(hours)}, `;

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