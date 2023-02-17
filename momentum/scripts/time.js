const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

function showDate(date) {

    const currentDate = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }); //'ru-RU' en-US
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