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
    // Remove any existing category classes
    cardBack.classList.remove("category-A", "category-B", "category-C");
    // Add the category class based on the card's category
    cardBack.classList.add("category-" + card.category);
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
        }, 600);
    });
}

const sidebarLinks = document.querySelectorAll('.sidebar p');

// Function to flip and show a card
function flipAndShowCard(card) {
    cardBack.textContent = card.text;
    cardBack.classList.remove("category-D");
    cardBack.classList.add("category-" + card.category);
    cardInner.classList.add("card-flip");
}

sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        const cardData = JSON.parse(link.getAttribute('data-card'));
		cardInner.classList.remove("card-flip");
        setTimeout(() => {
            flipAndShowCard(cardData);
        }, 600);
    });
});

