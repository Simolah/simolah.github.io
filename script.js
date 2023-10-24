const drawButton = document.getElementById("drawButton");
const cardInner = document.getElementById("cardInner");
const cardBack = document.getElementById("cardBack");
const cardData = []; // Array to store card data
let previousCardIndex = -1; // Initialize with an invalid index
let consecutiveDraws = 0; // Counter for consecutive draws
const maxConsecutiveDraws = 3; // Number of consecutive draws to achieve
const imageUrlsToPreload = [
    'category-a-image.jpg',
    'category-b-image.jpg',
    'category-c-image.jpg',
    'category-d-image.jpg',
];

function preloadImages(imageUrls) {
    const preloadedImages = [];
    imageUrls.forEach((imageUrl) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            preloadedImages.push(img);
            // Check if all images are preloaded, then you can proceed.
            if (preloadedImages.length === imageUrls.length) {
                // All images are preloaded, you can enable the "Draw a Card!" button or initiate your card drawing logic here.
                drawButton.disabled = false; // Enable the button, for example.
            }
        };
    });
}

// Preload the images when the page loads.
window.addEventListener('load', () => {
    preloadImages(imageUrlsToPreload);
});

// Array to store the indices of the drawn cards in the current set
let drawnCardIndices = [];

function drawRandomCard() {
    let randomIndex;
	let validCategories = ["A", "B", "C"];

    do {
        randomIndex = Math.floor(Math.random() * cardData.length);
    } while (
	drawnCardIndices.includes(randomIndex)
	!validCategories.includes(cardData[randomIndex].category)
	); // Keep randomizing until a different card is drawn

    if (consecutiveDraws >= maxConsecutiveDraws) {
        // Reset the tracking if the required consecutive draws are reached
        consecutiveDraws = 0;
        drawnCardIndices = [];
    }

    drawnCardIndices.push(randomIndex); // Add the drawn card index to the array
    consecutiveDraws++;

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



