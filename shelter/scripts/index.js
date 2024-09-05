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

function showPopup(animal) {

    const kindabreed = `${animal.type} - ${animal.breed}`;
    const age = `<strong>Age:</strong> ${animal.age}`;
    const inoculations = `<strong>Inoculations:</strong> ${animal.inoculations}`;
    const diseases = `<strong>Diseases:</strong> ${animal.diseases}`;
    const parasites = `<strong>Parasites:</strong> ${animal.parasites}`;


    const popup = document.querySelector('.pets-cards-popup');
    popup.querySelector('.popup-image').src = animal.img;
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













(function () { //слайдер
    const petsCards = document.querySelector('.pets-cards');
    const leftArrow = document.querySelector('.left-arrow-block');
    const rightArrow = document.querySelector('.right-arrow-block');
    const quantity = document.querySelectorAll('.pets-cards-personal').length;
    let currentSlide = 0;

    
    function NewPosition(position) {
        petsCards.style.transform = `translateX(-${position * 100}%)`;
    }

    
    function slideLeft() {
        if (currentSlide === 0) {
            currentSlide = quantity - 1;
        } else {
            currentSlide--;
        }
        NewPosition(currentSlide);
    }

    function slideRight() {
        if (currentSlide === quantity - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        NewPosition(currentSlide);
    }

    leftArrow.addEventListener('click', slideLeft);
    rightArrow.addEventListener('click', slideRight);
}());