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

// Add a click event listener to each sidebar link
document.querySelectorAll('.sidebar p').forEach(link => {
    link.addEventListener('click', (event) => {
        // Prevent default link behavior (e.g., following href)
        event.preventDefault();

        // Get the data-card-id attribute from the clicked link
        const cardId = event.target.getAttribute('data-card-id');

        // Find the card data by ID
        const card = cardData.find(c => c.id === cardId);

        // Display the card
        flipCard(card);
    });
});
