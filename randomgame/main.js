let field = document.querySelector('gamefield');
let popup = document.querySelector('popup');
let bttn = document.querySelector('newgame');


const cardsIcons = ['🐒','🦊','🦝','🦁','🐯','🦄','🐽','🐫','🐭',];

let num  = 18;

let currentCards = [];

bttn.addEventListener('click', StartGame);

function StartGame() {
    field.innerHTML = '';
};

function RandomCards (arr, num) {
    const randomArray = [];
    const counts = [];

    for (let item of arr) {
        counts[item] = 0;
    }

    while (randomArray.length < num) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        const randomEl = arr[randomIndex];

        if(counts[randomEl] < 2) {
            randomArray.push(randomElement);
            counts[randomEl]++;
        }
    }

return randomArray;
}

function CreateCard () {

}

function CardClick () {

}