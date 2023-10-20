const drawButton = document.getElementById("drawButton");
const cardInner = document.getElementById("cardInner");
const cardBack = document.getElementById("cardBack");
const cardData = []; // Array to store card data
let previousCardIndex = -1; // Initialize with an invalid index

function drawRandomCard() {
	let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * cardData.length);
    } while (randomIndex === previousCardIndex); // Keep randomizing until a different card is drawn

    previousCardIndex = randomIndex; // Update the previous card index
    return cardData[randomIndex];
}

function flipCard(card) {
	const cardText = `<h2>${card.headline}</h2><p>${card.text}</p>`;
    cardBack.innerHTML = cardText;
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
		resetCard();
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
    cardBack.innerHTML = card.text;
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

function resetCard() {
    cardInner.classList.remove("card-flip");
    setTimeout(() => {
    cardBack.classList.remove("category-A", "category-B", "category-C", "category-D"); // Add more categories as needed
	}, 600);
}
const homeLink = document.getElementById("homeLink");

homeLink.addEventListener("click", () => {
    resetCard();
});



