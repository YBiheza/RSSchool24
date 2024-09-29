let str = document.querySelector('input');
let galleryWrapper = document.querySelector('.gallery');
const button = document.querySelector('.search-icon');


async function fetchHandler (str) {
    const url = `https://api.unsplash.com/search/photos?query=${str}&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`

    try {
        const response = await fetch(url);
        const data = await response.json();  
        
        if (data.results.length > 0) {
            galleryWrapper.innerHTML = '';
            data.results.forEach(image => ShowData(image));
        } else {
            console.log('No images found');
            galleryWrapper.innerHTML = '<p>No images found</p>';
        }

    } catch (error) {
        console.log('error:(', error);
    }
}
    
function ShowData(image) {
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-block");

    const img = document.createElement("img");
    img.classList.add("image");
    img.src = image.urls.regular;
    img.alt = image.alt_description || 'image';
    imageDiv.appendChild(img);
    galleryWrapper.append(imageDiv);
}
    
button.addEventListener('click', () => {
    galleryWrapper.innerHTML = '';
    const query = str.value.trim();
    if (query) {
        fetchHandler(query);
    } else {
        console.log('Please enter a search term');
        galleryWrapper.innerHTML = '<p>Please enter a search term</p>';
    }
});

str.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        galleryWrapper.innerHTML = '';
        const query = str.value.trim();
        if (query) {
            fetchHandler(query);
        } else {
            console.log('Please enter a search term');
            galleryWrapper.innerHTML = '<p>Please enter a search term</p>';
        }
    }
  });


/*let str = document.querySelector('input'); // Input field
let galleryWrapper = document.querySelector('.gallery'); // Gallery container
const button = document.querySelector('h1'); // Button for triggering the action

async function fetchHandler(query) {
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=9&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.results.length > 0) {
            galleryWrapper.innerHTML = ''; // Очистить галерею перед новым запросом
            data.results.forEach(image => ShowData(image)); // Отобразить каждое изображение
        } else {
            console.log('No images found');
            galleryWrapper.innerHTML = '<p>No images found</p>'; // Показать сообщение, если ничего не найдено
        }
    } catch (error) {
        console.log('Error:', error);
    }
}

function ShowData(image) {
    // Создаем новый div для изображения
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-block"); // Добавляем класс для оформления (можно стилизовать через CSS)

    // Создаем img элемент
    const img = document.createElement("img");
    img.classList.add("image");
    img.src = image.urls.regular; // Используем URL изображения из данных
    img.alt = image.alt_description || 'image'; // Добавляем описание, если есть

    // Добавляем img в созданный div
    imageDiv.appendChild(img);

    // Добавляем div с изображением в контейнер галереи
    galleryWrapper.append(imageDiv);
}

button.addEventListener('click', () => {
    const query = str.value.trim(); // Получаем значение из input
    if (query) {
        fetchHandler(query); // Выполняем запрос с пользовательским вводом
    } else {
        console.log('Please enter a search term');
        galleryWrapper.innerHTML = '<p>Please enter a search term</p>'; // Сообщение, если ввод пуст
    }
});*/
