const drawButton = document.getElementById("drawButton");
const cardInner = document.getElementById("cardInner");
const cardBack = document.getElementById("cardBack");

let cardText = []; // Array to store custom card text

function drawRandomCard() {
    const randomIndex = Math.floor(Math.random() * cardText.length);
    return cardText[randomIndex];
}

function flipCard() {
    const randomCard = drawRandomCard();
    cardBack.textContent = randomCard;
    cardInner.classList.add("card-flip");
}

// Fetch the JSON data from the external file
fetch("cards.json")
    .then(response => response.json())
    .then(data => {
        cardText = data.cards; // Assign the custom text to the cardText array
        init(); // Call the init function once the data is loaded
    })
    .catch(error => console.error("Error loading card data:", error));

function init() {
    drawButton.addEventListener("click", () => {
        cardInner.classList.remove("card-flip");
        setTimeout(() => {
            flipCard();
        }, 500); // 500ms matches the CSS transition duration
    });
}
