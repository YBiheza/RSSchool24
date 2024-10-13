let field = document.querySelector('.gamefield');
let popup = document.querySelector('popup');
let bttn = document.querySelector('.newgame');


const cardsIcons = ['🐒','🦊','🦝','🦁','🐯','🦄','🐽','🐫','🐭'];

let num  = 18;

let currentCards = [];

bttn.addEventListener('click', StartGame);

let hearts = Array.from(document.querySelectorAll('.heart'));
console.log(hearts.length);

function StartGame() {
    field.innerHTML = '';

    const memories = RandomCards(cardsIcons, num);

    console.log(memories);
    memories.forEach((card) => CreateCard(card));
    const cardsArr = document.querySelectorAll('.card')
    setTimeout(() => {
        cardsArr.forEach((card) => card.classList.remove('visible'))
    }, 3000);
    //cardsArr.forEach((card) => card.classList.remove('visible'))

};

function RandomCards (arr, num) {
    const randomArray = [];
    const counts = {};

    for (let item of arr) {
        counts[item] = 0;
    }

    while (randomArray.length < num) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        const randomEl = arr[randomIndex];

        if(counts[randomEl] < 2) {
            randomArray.push(randomEl);
            counts[randomEl]++;
        }
    }


console.log(randomArray);
return randomArray;
}

function CreateCard (icon) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('visible');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    cardFront.textContent = '';
    cardBack.textContent = icon;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener('click', () => {
        CardClick(card);
    });

    field.appendChild(card);
    
}

function CardClick (card) {
    card.classList.add('visible');
    currentCards.push(card);
    setTimeout(() => {
        Logic();
      }, 3000)

}

let i = 9;
function Logic () {
    console.log(currentCards, hearts);
    if (currentCards.length % 2 === 0 && currentCards[currentCards.length - 1].textContent!==currentCards[currentCards.length - 2].textContent) {
        currentCards[currentCards.length - 1].classList.remove('visible');
        currentCards[currentCards.length - 2].classList.remove('visible');
        //currentCards.length = 0;
        hearts[i].style['display'] = 'none';
        i--;
        // hearts.length = hearts.length - 1;
        hearts.pop();
        currentCards.pop();
        currentCards.pop();
        console.log(hearts.length);
    } else {
        if (currentCards.length % 2 == 0 && currentCards[currentCards.length - 1].textContent == currentCards[currentCards.length - 2].textContent) {
           // currentCards.length = 0;
        }
    }
}

StartGame();

let timer = document.querySelector('.timer');
let seconds = 0; // Начальное значение

setInterval(function() {
    seconds++; // Увеличиваем счетчик секунд
    let minutes = Math.floor(seconds / 60); // Переводим секунды в минуты
    let remainingSeconds = seconds % 60; // Остаток секунд для отображения
    timer.innerHTML = `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
}, 1000);