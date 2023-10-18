const drawButton = document.getElementById("drawButton");
const cardInner = document.getElementById("cardInner");
const cardBack = document.getElementById("cardBack");
const cardData = []; // Array to store card data

function drawRandomCard() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex];
}

function flipCard(card) {
    cardBack.textContent = card.text;
    cardInner.classList.add("card-flip");
}

fetch("cards.json")
    .then(response => response.json())
    .then(data => {
        cardData.push(...data.cards); // Load card data from JSON
        init();
    })
    .catch(error => console.error("Error loading card data:", error));

function init() {
    drawButton.addEventListener("click", () => {
        cardInner.classList.remove("card-flip");
        setTimeout(() => {
            const randomCard = drawRandomCard();
            flipCard(randomCard);
        }, 500);
    });
}
