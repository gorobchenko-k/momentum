const quoteElement = document.querySelector(".quote-text");
const authorElement = document.querySelector(".author");
const changeQuoteElement = document.querySelector(".change-quote");

function getRandomNum(max) {
    return Math.floor(Math.random() * max);
}

async function getQuotes() {
    const quotes = '../assets/json/quotes.json';
    const res = await fetch(quotes);
    const data = await res.json();
    const max = data[settings.language].length;
    const numberQuotes = getRandomNum(max);
    quoteElement.textContent = data[settings.language][numberQuotes].text;
    authorElement.textContent = data[settings.language][numberQuotes].author;
}

changeQuoteElement.addEventListener("click", getQuotes);
getQuotes();
