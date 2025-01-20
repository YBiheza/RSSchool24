let field = document.querySelector('.gamefield');
let popup = document.querySelector('.popup');
let bttn = document.querySelector('.newgame');
let restartButton = document.querySelector('.restart')
let popupText = document.querySelector('.result-text')


const cardsIcons = ['🐒','🦊','🦝','🦁','🐯','🦄','🐽','🐫','🐭'];

let num  = 18;

let currentCards = [];

let chosen = [];

bttn.addEventListener('click', StartGame);

let hearts = [];
//console.log(hearts.length);

let timer = document.querySelector('.timer');
let seconds = 0;

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
    seconds = 0;
    hearts = Array.from(document.querySelectorAll('.heart'));
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


//console.log(randomArray);
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
    chosen.push(card);

    const cardsArr = document.querySelectorAll('.card')
    cardsArr.forEach((card) => {
        if (chosen.length == 2) {
            card.style.pointerEvents = 'none';
            card.style.opacity = '0.5';
        }
    });

    setTimeout(() => {
        Logic();
        cardsArr.forEach((card) => {
            card.style.pointerEvents = 'auto'; 
            card.style.opacity = '1';
            chosen = [];

    })}, 1500)
}

let i = 9;
function Logic () {
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
        } else {
            if (currentCards.length % 2 !== 0) {
                currentCards.forEach = ((card) => {
                    card.classList.remove('visible');
                });
            }
        }
    }
    if (hearts.length === 0 && currentCards.length !== num) {
        popup.classList.add('popup-active');
        over.classList.add('overlay-active');
        document.body.style.overflow = 'hidden';
        popupText.innerHTML = 'You lose'
        popup.querySelector('.result-img').src = './711d0b423b26d79f63ad389556c21133 (1).png';
        popup.querySelector('.game-time');
        popupTime.innerHTML = `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' + seconds % 60 : seconds % 60}`;
    } else {
        if (currentCards.length === num && hearts.length >= 0) {
            popup.classList.add('popup-active');
            over.classList.add('overlay-active');
            document.body.style.overflow = 'hidden';
            popupText.innerHTML = 'You win!'
            popup.querySelector('.result-img').src = './kisspng-portable-network-graphics-transparency-clip-art-pi-pixilart-minecraft-heart-by-anonymous-5c9083ba569300.7448202615529747783546 (1).png';

        }
    }
    //chosen = [];
}

let over = document.querySelector('.overlay');




StartGame();

setInterval(function() {
    seconds++; // Увеличиваем счетчик секунд
    let minutes = Math.floor(seconds / 60); // Переводим секунды в минуты
    let remainingSeconds = seconds % 60; // Остаток секунд для отображения
    timer.innerHTML = `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
}, 1000);

bttn.addEventListener('click', () => {
    StartGame();
    popup.classList.remove('popup-active');
    over.classList.remove('overlay-active');
    document.body.style.overflow = 'visible';
    hearts = Array.from(document.querySelectorAll('.heart'));
    hearts.forEach((heart) => {
        heart.style['display'] = 'flex';
    })
    i = 9;
    currentCards = [];
})

restartButton.addEventListener('click', () => {
    StartGame();
    hearts = [];
    i = 9;
    currentCards = [];
    hearts = Array.from(document.querySelectorAll('.heart'));
    hearts.forEach((heart) => {
        heart.style['display'] = 'flex';
    })
})
