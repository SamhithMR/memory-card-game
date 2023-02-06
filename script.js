// const cardHTML = `
//   <div class="card">
//     <img src="./assets/logo.png" alt="" class="card-front">
//     <img src="./assets/red_bog.png" alt="" class="card-back">
//   </div>
// `;

let cards = document.querySelector(".cards");
let source = ["hiro.png", "red_bog.png", "tadashi.png", "yellow_bog.png"]
let arr = []

// we need 12 cards so loop 12 times
while (arr.length < 12) {
    // calculate frequency of the perticular image
    var map = arr.reduce((prev, cur) => {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});

    let element = source[Math.floor(Math.random() * 4)];
    
    // push the images into arr array, where each type of image must not be more that 3 times
    if (!map[element] || map[element] < 3) {
        arr.push(element);
    }
}

// create 12 cards with random images
for (let i = 0; i < 12; i++) {
    cards.innerHTML += `
  <div class="card">
    <img src="./assets/logo.png" alt="" class="card-front">
    <img src="./assets/${arr[i]}" alt="" class="card-back">
    </div>
    `;
}

let card = document.querySelector(".card");
let count = 0;
let cardsList = document.querySelectorAll(".card")
let arr2 = []

// add event listner to all the cards

cardsList.forEach((x) => x.addEventListener("click",
    () => {
        // on clicking the card rotate the card
        x.style.transform = `rotateY(180deg)`

        // keep a timer to keep track of the number of cards clicked
        count += 1;

        // append the sources of image(name of the card) into array "arr2"
        arr2.push(x.children[1].src)
        console.log(arr2);

        if (count >= 3) {

            // check if the array hav same elements
            if ((arr2.every((val, i, arr) => val === arr[0]))) {
                arr2 = []
                count = 0 
            } 
            else {
                arr2 = []
                count = 0;
                setTimeout(() => (cardsList.forEach((x) => x.style.transform = `rotateY(0deg)`)), 1000)
            }


        }

    }))