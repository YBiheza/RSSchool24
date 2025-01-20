function SelfCheck() {
    console.log ("Верстка страницы валидная +4 \n логотип в хедере состоит из текстовых элементов +1 \n страница содержит ровно один элемент <h1> +1 \n добавлен favicon +1 \n Вёрстка соответствует макету +35 \n для позиционирования элементов блока Help использована сеточная верстка (flexbox или grid) +2 \n при уменьшении масштаба страницы браузера или увеличении ширины страницы (>1280px) вёрстка размещается по центру +2 \n фоновый цвет тянется на всю ширину страницы +2 \n элемент About the Shelter в навигации подсвечен и неинтерактивен, остальные элементы навигации интерактивны +2 \n каждая карточка с питомцем в блоке Our Friends интерактивна при наведении на любую область этой карточки +2 \n плавная прокрутка по якорям +2 (!!!пожалуйста, если у вас не сработает этот пункт, проверьте свои настройки, чтобы он у меня заработал, мне пришлось изменить свои, он работает :) \n выполняются все ссылочные связи согласно Перечню ссылочных связей для страницы Main +2 выполнена интерактивность ссылок и кнопок. Интерактивность заключается не только в изменении внешнего вида курсора, например, при помощи свойства cursor: pointer, но и в использовании и других визуальных эффектов, например, изменение цвета фона или цвета шрифта, согласно стайлгайду в макете. +2 \n обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике, не влияющее на соседние элементы +2 (Время анимации не влияет на оценку, однако обычно значение длительности анимации находится в пределах от 0.2s до 0.5s)");
}

SelfCheck();

function Checking () {
    return console.log ('100/100 \n Вёрстка страницы Main соответствует макету при ширине экрана 1280px: +14\n Вёрстка страницы Main соответствует макету при ширине экрана 768px: +14 \n Вёрстка страницы Main соответствует макету при ширине экрана 320px: +14 \n Вёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6 \n Вёрстка страницы Pets соответствует макету при ширине экрана 768px: +6 \n Вёрстка страницы Pets соответствует макету при ширине экрана 320px: +6 \n Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20 \n Верстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции +8 \n При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4 \n Верстка обеих страниц валидная +8');
}

Checking();

(function () { //бургер
    const burgerMenu = document.querySelector('.burger-menu');
    const menu = document.querySelector('.nav');
    const body = document.body;
    const overlay = document.querySelector('.overlay');
    const menuPoints = document.querySelectorAll('.nav-item');

    burgerMenu.addEventListener('click', () => {
        menu.classList.toggle('nav-active');
        burgerMenu.classList.toggle('burger-menu-active');
        body.classList.toggle('no-scroll'); 
        overlay.classList.toggle('overlay-active');

    });

    overlay.addEventListener('click', () => {
        menu.classList.remove('nav-active');
        burgerMenu.classList.remove('burger-menu-active');
        body.classList.remove('no-scroll');
        overlay.classList.remove('overlay-active');
        
    });

    menuPoints.forEach((menuPoint) => {
        menuPoint.addEventListener('click', () => {
            menu.classList.remove('nav-active');
            burgerMenu.classList.remove('burger-menu-active');
            body.classList.remove('no-scroll');
            overlay.classList.remove('overlay-active');
        });
    });

}());


//popup
const cards = document.querySelectorAll('.pets-cards-personal');
const popupWindow = document.querySelector('.popup');
const overlay = document.querySelector('.overlay');
const body = document.body;
const cross = document.querySelector('.cross');

function PopUpFunction () {
    document.querySelectorAll('.pets-cards-personal').forEach(card => {
        card.addEventListener('click', function() {
            const animalId = this.getAttribute('data-id');
            fetch('../pets.json')
                .then(response => response.json())
                .then(data => {
                    const animal = data.find(item => item.name == animalId);
                    if (animal) {
                        showPopup(animal);
                        popupWindow.classList.add('popup-active');
                        /*body.classList.add('no-scroll');*/
                        overlay.classList.add('overlay-active');
                        document.body.style.overflow = 'hidden';
                        cross.classList.add('cross-active')
                    }
                });
        });
    });
};

function showPopup(animal) {

    const kindabreed = `${animal.type} - ${animal.breed}`;
    const age = `<strong>Age:</strong> ${animal.age}`;
    const inoculations = `<strong>Inoculations:</strong> ${animal.inoculations}`;
    const diseases = `<strong>Diseases:</strong> ${animal.diseases}`;
    const parasites = `<strong>Parasites:</strong> ${animal.parasites}`;


    const popup = document.querySelector('.pets-cards-popup');
    popup.querySelector('.popup-image').src = `./assets/images/${animal.name}.png`;
    popup.querySelector('.popup-name').textContent = animal.name;
    popup.querySelector('.popup-breed').innerHTML = kindabreed;
    popup.querySelector('.popup-description').innerHTML = animal.description;
    popup.querySelector('.popup-age').innerHTML = age;
    popup.querySelector('.popup-inoculations').innerHTML = inoculations;
    popup.querySelector('.popup-diseases').innerHTML = diseases;
    popup.querySelector('.popup-parasites').innerHTML = parasites;
}

overlay.addEventListener('click', () => {
    popupWindow.classList.remove('popup-active');
    body.classList.remove('no-scroll');
    overlay.classList.remove('overlay-active');
    document.body.style.overflow = '';
    
});

document.querySelector('.cross').addEventListener('click', function() {
    popupWindow.classList.remove('popup-active');
    body.classList.remove('no-scroll');
    overlay.classList.remove('overlay-active');
    document.body.style.overflow = '';
});









//слайдер

const track = document.querySelector('.pets-cards');
const slides = Array.from(track.children);

let petsData = []; 
fetch('../pets.json')
  .then(response => response.json())
  .then(data => {
    petsData = data;
    initializeSlider();
  });

let currentCards = [];
let numVisibleCards = 3;
let previousCards = [];
let nextCards = []; 
let previousCardsStack = [];
let nextCardsStack = [];
let prevSlideCards = [];
let previousCardsStackLeft = [];
let previousCardsStackRight = [];

function updateNumVisibleCards() {
  const width = window.innerWidth;
  if (width >= 1280) {
    numVisibleCards = 3;
  } else if (width >= 768) {
    numVisibleCards = 2;
  } else {
    numVisibleCards = 1;
  }
}

window.addEventListener('resize', updateNumVisibleCards);
updateNumVisibleCards();

function shuffle(array) {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}
  
function getNextSlide() {
    const newCards = [];
    let availablePets = petsData.filter(pet => !currentCards.includes(pet));
  
    availablePets = shuffle(availablePets);

    for (let i = 0; i < numVisibleCards; i++) {
      newCards.push(availablePets[i]);
    }
  
    prevSlideCards = currentCards;
    return newCards;
}
  
function initializeSlider() {
    currentCards = getNextSlide();
    renderSlider(currentCards);
}

const petsCardsContainer = document.querySelector('.pets-cards');

function renderSlider(cards) {
  petsCardsContainer.innerHTML = ''; 

  cards.forEach(pet => {
    const cardHTML = `
      <div class="pets-cards-personal pets-cards-${pet.name}" data-id="${pet.name}">
        <img src="./assets/images/${pet.name}.png" alt="${pet.name}'s photo" class="pets-cards-image">
        <p class="pets-cards-name">${pet.name}</p>
        <button class="pets-cards-button">Learn more</button>
      </div>
    `;
    petsCardsContainer.innerHTML += cardHTML;
  });

  PopUpFunction();
}

const leftArrow = document.querySelector('.left-arrow-block');
const rightArrow = document.querySelector('.right-arrow-block');
/*


rightArrow.addEventListener('click', () => {
    currentCards = getNextSlide();
    renderSlider(currentCards);
    // Add animation effect here if desired
  });
  
  // Move to the previous slide
  leftArrow.addEventListener('click', () => {
    currentCards = getNextSlide(); // You can implement previous slide logic too
    renderSlider(currentCards);
    // Add animation effect here if desired
  });
*/

/*rightArrow.addEventListener('click', () => {
    if (nextCards.length > 0) {
      // If moving back from previous, restore the nextCards
      previousCards = [...currentCards];
      currentCards = [...nextCards];
      nextCards = []; // Clear nextCards after restoring
    } else {
      // Normal forward slide
      previousCards = [...currentCards]; // Save current as previous
      currentCards = getNextSlide(); // Generate new cards
    }
    renderSlider(currentCards); // Update the UI with new cards
  });*/

  //let els = getNextSlide();

  /*rightArrow.addEventListener('click', () => {
    if (previousCardsStack.length > 0) { //вторая вправо
        previousCardsStack = [...currentCards];
        for(let i = 0; i < numVisibleCards; i++) {
            els = getNextSlide(); 
                currentCards.push(els[els.length - 1]);
            els.pop();
        } 
        Array.prototype.push.apply(els, previousCardsStack); 
    } else { 
        previousCardsStack = [...currentCards];
        for(let i = 0; i < numVisibleCards; i++) {
            els = getNextSlide(); 
                currentCards.push(els[els.length - 1]);
            els.pop();
        } 
        Array.prototype.push.apply(els, previousCardsStack); 
        }
        renderSlider(currentCards); // Update the UI with new cards
    });*/


    function getPreviousSlide() {
        const previousCards = [];
        let newCards = [];

        newCards = getNextSlide();
        
        // Выбираем карточки, которых нет на экране сейчас и не входят в следующий слайд
        let availablePets = petsData.filter(pet => 
            !currentCards.includes(pet) /*&& !newCards.includes(pet)*/
        );
      
        availablePets = shuffle(availablePets); // Перемешиваем доступные карточки
    
        for (let i = 0; i < numVisibleCards; i++) {
            previousCards.push(availablePets[i]);
        }
    
        return previousCards;
    }



    let tempArr = [];
    rightArrow.addEventListener('click', () => {
        document.querySelector('.pets-cards').classList.add('pets-cards-active');
        if (previousCardsStackRight.length > 0) {
            previousCardsStackLeft = [...currentCards];
            currentCards = [...previousCardsStackRight];
            previousCardsStackRight = [];
            renderSlider(currentCards);
        } else {
        previousCardsStackLeft = [...currentCards];
        currentCards = getNextSlide();
        renderSlider(currentCards);
        }
    });

    leftArrow.addEventListener('click', () => {
        document.querySelector('.pets-cards').classList.add('pets-cards-active');
        if (previousCardsStackLeft.length === 0) {
            previousCardsStackRight = [...currentCards];
            currentCards = getNextSlide();
            renderSlider(currentCards);
        } else {
        previousCardsStackRight = [...currentCards];
        currentCards = [...previousCardsStackLeft];
        previousCardsStackLeft = [];
        renderSlider(currentCards);
        }
    })




  // Move to the previous slide
  /*leftArrow.addEventListener('click', () => {
    if (previousCards.length > 0) {
      nextCards = [...currentCards]; // Save current as next state
      currentCards = [...previousCards]; // Restore previous cards
      previousCards = []; // Clear previousCards after restoring
      renderSlider(currentCards); // Update the UI with previous cards
    } else {
        previousCards = [...currentCards];
        let tempArr = [];
        for (let i = 0; i < numVisibleCards; i++) {
            tempArr.unshift(nextCards[nextCards.length - 1]);
            nextCards = nextCards.pop;
        }
    renderSlider(currentCards); // Update the UI with previous cards

    }
  });*/


/*leftArrow.addEventListener('click', () => {
    if (previousCardsStack.length > 0) {
       let temp = [];
       temp = [...currentCards];
       currentCards = [...previousCardsStack];
       previousCardsStack = [...temp];
       Array.prototype.push.apply(els, previousCardStack); 
   } else {
       previousCardsStack = [...currentCards];
       for(let i = 0; i < numVisibleCards; i++) {
       currentCards.push(els[els.length - 1]);
       els.pop();
   }
       Array.prototype.push.apply(previousCardStack, els,); 
   }
   renderSlider(currentCards); // Update the UI with new cards
})*/
   



window.addEventListener('resize', () => {
    updateNumVisibleCards(); 
    currentCards = getNextSlide();
    renderSlider(currentCards);
  });