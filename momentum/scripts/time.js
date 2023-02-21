const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

function showDate(date) {
    const lang = settings.language === 'en' ? 'en-US' : 'ru-RU';
    const currentDate = date.toLocaleDateString(lang, { weekday: 'long', month: 'long', day: 'numeric' }); //'ru-RU' en-US
    dateElement.textContent = currentDate;
}

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    timeElement.textContent = currentTime;
    showDate(date);
    showGreeting(date);
    setTimeout(showTime, 1000);
}

showTime();