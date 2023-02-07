let gameBoard = document.querySelector(".cards");
let cardImages = ["hiro.png", "red_bog.png", "tadashi.png", "yellow_bog.png"];
let shuffledDeck = [];

function shuffleCards() {
    while (shuffledDeck.length < 12) {
        // calculate the frequency of each elements
        let frequencyMap = shuffledDeck.reduce((prev, cur) => {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
        }, {});
        let randomImage = cardImages[Math.floor(Math.random() * 4)];
        // / Add the image to the shuffledDeck array, ensuring that each image is used no more than 3 times
        if (!frequencyMap[randomImage] || frequencyMap[randomImage] < 3) {
            shuffledDeck.push(randomImage);
        }
    }

    // Generate the HTML for each card
    for (let i = 0; i < 12; i++) {
        gameBoard.innerHTML += `
      <div class="card">
        <img src="./assets/logo.png" alt="" class="card-front">
        <img src="./assets/${shuffledDeck[i]}" alt="" class="card-back">
        </div>
        `;
    }
}

// Call the shuffleCards function when the page loads
window.onload = shuffleCards();
window.onload = initializeGame();

var confettiElement = document.querySelector("#my-canvas");
        var confettiSettings = { target: confettiElement };
        var confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

let scores = document.querySelector('.score')
let clicks = document.querySelector('.clicks')
let timer = document.querySelector('.timer')
var tim;

function setinterval(){
    tim = setInterval(()=>(timer.textContent = Number(timer.textContent)+1), 1000)
}

function initializeGame() {
    let startTime, endTime, totalClicks = 0;

    let clickCount = 0; // Counter to keep track of the number of cards clicked
    let allCards = document.querySelectorAll(".card"); // Select all the card elements
    let imageSources = []; // Array to store the sources of the clicked cards
    let flippedCards = []; // Array to store the clicked card elements
    
    // Function to handle the card click events
    allCards.forEach((card) => {
        // Add an event listener for clicking on each card
        card.addEventListener("click", () => {
            // Start the timer on the first card click
            if (totalClicks === 0) {
                startTime = Date.now();
                setinterval()
            }
            totalClicks +=1;
            // Rotate the card by 180 degrees on click
            card.style.transform = `rotateY(180deg)`;
            // Increment the click count
            clickCount += 1;
            // Add the source of the clicked card's image to the `imageSources` array
            imageSources.push(card.children[1].src);
            // Add the clicked card to the `flippedCards` array
            flippedCards.push(card);
            // If three cards have been clicked
            if (clickCount >= 3) {
                // Check if all three image sources are the same
                if ((imageSources.every((val) => val === imageSources[0]))) {
                    // Clear the `imageSources` and `flippedCards` arrays and reset the click count
                    imageSources = [];
                    flippedCards = [];
                    clickCount = 0;
                } else {
                    // Wait for 900ms and rotate the cards back to their original position
                    setTimeout(() => (flippedCards.forEach((card) => card.style.transform = `rotateY(0deg)`)), 900);
                    // Clear the `imageSources` array and reset the click count
                    clickCount = 0;
                    imageSources = [];
                }
            }

            let score=0;
            endTime = new Date();
            let timeTaken = (endTime - startTime) / 1000; // in seconds
            score =( 100 - (totalClicks + timeTaken)).toFixed(0);
            
            scores.textContent=score
            clicks.textContent=totalClicks
           
            if((Array.from(allCards)).every((x) => x.style.transform  == `rotateY(180deg)`)){
               setTimeout(()=>(confettiElement.style.display = `block`),500)
               clearInterval(tim)
            }
        });
    });
    
}

function resetGame() {
    confettiElement.style.display = `none`
    scores.innerHTML = 100;
    clicks.innerHTML = 0;
    timer.innerHTML = 0;
    clearInterval(tim)
    document.querySelector('.timer').innerHTML = 0;
    gameBoard.innerHTML = ``;
    shuffledDeck = [];
    shuffleCards();
    initializeGame();
}



