function SelfCheck () {
    console.log ("Верстка страницы валидная  +4 \n логотип в хедере состоит из текстовых элементов +1 \n страница содержит ровно один элемент <h1> +1 \n добавлен favicon +1 \n Вёрстка соответствует макету +15 \n при уменьшении масштаба страницы браузера или увеличении ширины страницы (>1280px) вёрстка размещается по центру, а не сдвигается в сторону и не растягивается по всей ширине +2 \n фоновый цвет тянется на всю ширину страницы +2 \n элемент Our pets в навигации подсвечен и неинтерактивен, остальные элементы навигации интерактивны +2 \n доступные кнопки пагинации (вправо) активны, недоступные (влево) - неактивны (disabled) +2 \n каждая карточка с питомцем в блоке Our Friends интерактивна при наведении на любую область этой карточки +2 \n плавная прокрутка по якорям +2 (!!!пожалуйста, если у вас не сработает этот пункт, проверьте свои настройки, чтобы он у меня заработал, мне пришлось изменить свои, он работает :) \n выполняются все ссылочные связи согласно Перечню ссылочных связей для страницы Pets +2 \n выполнена интерактивность ссылок и кнопок. Интерактивность заключается не только в изменении внешнего вида курсора, например, при помощи свойства cursor: pointer, но и в использовании и других визуальных эффектов, например, изменение цвета фона или цвета шрифта, согласно стайлгайду в макете. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета +2 \n обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике, не влияющее на соседние элементы +2 (Время анимации не влияет на оценку, однако обычно значение длительности анимации находится в пределах от 0.2s до 0.5s)");
};

SelfCheck();


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


const cards = document.querySelectorAll('.pets-cards-personal'); //попапчик
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
                    console.log('hbvlh');
                    overlay.classList.add('overlay-active');
                    document.body.style.overflow = 'hidden';
                    cross.classList.add('cross-active')
                }
            });
    });
});
}

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







//пагинация
let petsArray = [];
let currentScreenWidth = window.innerWidth;
let itemsPerPage = 8;
let currentPage = 1;

/*function createPetsArray() {
    let petsTempArray = [...petsData, ...petsData, ...petsData, ...petsData, ...petsData, ...petsData]; // 6 повторений
    petsTempArray = shuffle(petsTempArray); // Перемешивание
    petsArray = petsTempArray;
  }*/

function updateItemsPerPage() {
    currentScreenWidth = window.innerWidth; // Обновляем текущую ширину экрана

    if (currentScreenWidth >= 1280) {
      itemsPerPage = 8;
    } else if (currentScreenWidth >= 768) {
      itemsPerPage = 6;
    } else {
      itemsPerPage = 3;
    }
  }

function shuffle (array) {
    let arr = new Array(array.length);
    //если слот пустой - не пиши туда
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  window.addEventListener('resize', () => {
    updateItemsPerPage(); // Пересчитываем количество карточек на странице
});


function loadPetsData() {
    fetch('../pets.json') // Путь к твоему JSON-файлу
      .then(response => response.json()) // Преобразуем ответ в формат JSON
      .then(data => {
        // Сохранение и обработка данных
        petsArray = [...data, ...data, ...data, ...data, ...data, ...data]; // 6 повторений
        petsArray = shuffle(petsArray); // Перемешивание массива
        updateItemsPerPage();
        updatePetsPage(petsArray);
      })
      .catch(error => console.error('Ошибка загрузки JSON:', error)); // Обработка ошибок
  }

  /*---------------------------------------------*/
window.addEventListener('resize', () => {
    updateItemsPerPage(); // Recalculate items per page
    const totalPages = Math.ceil(petsArray.length / itemsPerPage);

    // Adjust currentPage if it exceeds the number of total pages after resize
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    updatePetsPage(petsArray); // Reload pets with new items per page
});
/*------------------------------------------------*/

    function updatePetsPage(petsArray) {
    let paginationPage = document.querySelector('.pagination-page');
        const petsContainer = document.querySelector('.pets-cards');
        petsContainer.innerHTML = ''; // Очищаем существующие карточки
    
        // Получаем питомцев для текущей страницы
        const startIndex = (currentPage - 1) * itemsPerPage;
        const petsToShow = petsArray.slice(startIndex, startIndex + itemsPerPage);
    
        petsToShow.forEach(pet => {
            const petCard = document.createElement('div');
            petCard.classList.add('pets-cards-personal');
            petCard.dataset.id = pet.name; // Добавляем ID
    
            petCard.innerHTML = `
                <img src="${pet.img}" alt="${pet.name}'s photo" class="pets-cards-image">
                <h4 class="pets-cards-name">${pet.name}</h4>
                <button class="pets-cards-button">Learn more</button>
            `;
    
            petsContainer.appendChild(petCard); // Добавляем карточку в контейнер
        paginationPage.innerHTML = `${currentPage}`;

        });
    
        PopUpFunction ();

        handlePaginationButtons(currentPage); // Обновляем состояние кнопок
    }




function handlePaginationButtons(page) {
    const totalPages = Math.ceil(petsArray.length / itemsPerPage);
    const leftOnce = document.querySelector('.pagination-left-arrow-once-block');
    const leftDouble = document.querySelector('.pagination-left-arrow-double-block');
    const rightOnce = document.querySelector('.pagination-right-arrow-once-block');
    const rightDouble = document.querySelector('.pagination-right-arrow-double-block');
  
    if (page === 1) {  
        document.querySelector('.pagination-left-arrow-once').innerHTML = '<path d="M9.98242 10.7852L0.949219 6.08789V4.98438L9.98242 0.287109V1.625L2.47266 5.53125L9.98242 9.44727V10.7852Z" fill="#CDCDCD"/>';
        document.querySelector('.pagination-left-arrow-double').innerHTML = '<path d="M9.94687 10.7852L0.913671 6.08789V4.98438L9.94687 0.287109V1.625L2.43711 5.53125L9.94687 9.44727V10.7852ZM24.018 10.7852L14.9848 6.08789V4.98438L24.018 0.287109V1.625L16.5082 5.53125L24.018 9.44727V10.7852Z" fill="#CDCDCD"/>';
      leftOnce.classList.add('disabled');
      leftDouble.classList.add('disabled');
    } else {
        document.querySelector('.pagination-left-arrow-once').innerHTML = '<path d="M9.98242 10.7852L0.949219 6.08789V4.98438L9.98242 0.287109V1.625L2.47266 5.53125L9.98242 9.44727V10.7852Z" fill="#292929"/>';
    document.querySelector('.pagination-left-arrow-double').innerHTML = '<path d="M9.94687 10.7852L0.913671 6.08789V4.98438L9.94687 0.287109V1.625L2.43711 5.53125L9.94687 9.44727V10.7852ZM24.018 10.7852L14.9848 6.08789V4.98438L24.018 0.287109V1.625L16.5082 5.53125L24.018 9.44727V10.7852Z" fill="#292929"/>';
      leftOnce.classList.remove('disabled');
      leftDouble.classList.remove('disabled');
    }
  
    if (page === totalPages) {
        document.querySelector('.pagination-right-arrow-once').innerHTML = '<path d="M9.04102 6.08789L0.0078125 10.7852V9.44727L7.51758 5.53125L0.0078125 1.625V0.287109L9.04102 4.98438V6.08789Z" fill="#cdcdcd"/>';
        document.querySelector('.pagination-right-arrow-double').innerHTML = '<path d="M10.0055 6.08789L0.972265 10.7852V9.44727L8.48203 5.53125L0.972265 1.625V0.287109L10.0055 4.98438V6.08789ZM24.0766 6.08789L15.0434 10.7852V9.44727L22.5531 5.53125L15.0434 1.625V0.287109L24.0766 4.98438V6.08789Z" fill="#cdcdcd"/>';
      rightOnce.classList.add('disabled');
      rightDouble.classList.add('disabled');
    } else {
        document.querySelector('.pagination-right-arrow-once').innerHTML = '<path d="M9.04102 6.08789L0.0078125 10.7852V9.44727L7.51758 5.53125L0.0078125 1.625V0.287109L9.04102 4.98438V6.08789Z" fill="#292929"/>';
        document.querySelector('.pagination-right-arrow-double').innerHTML = '<path d="M10.0055 6.08789L0.972265 10.7852V9.44727L8.48203 5.53125L0.972265 1.625V0.287109L10.0055 4.98438V6.08789ZM24.0766 6.08789L15.0434 10.7852V9.44727L22.5531 5.53125L15.0434 1.625V0.287109L24.0766 4.98438V6.08789Z" fill="#292929"/>';
      rightOnce.classList.remove('disabled');
      rightDouble.classList.remove('disabled');
    }
  }
  

  document.querySelector('.pagination-right-arrow-once-block').addEventListener('click', () => {
    const totalPages = Math.ceil(petsArray.length / itemsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        updatePetsPage(petsArray); // Используем petsArray
    }
});

  
  document.querySelector('.pagination-left-arrow-once-block').addEventListener('click', () => {
    
    if (currentPage > 1) {
      currentPage--;
      updatePetsPage(petsArray);
    }
  });
  
  document.querySelector('.pagination-right-arrow-double-block').addEventListener('click', () => {
    const totalPages = Math.ceil(petsArray.length / itemsPerPage);

    currentPage = totalPages;
    updatePetsPage(petsArray);
  });
  
  document.querySelector('.pagination-left-arrow-double-block').addEventListener('click', () => {
    currentPage = 1;
    updatePetsPage(petsArray);
  });
  
 
  loadPetsData();