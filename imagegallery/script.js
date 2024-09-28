let str = document.querySelector('input');
let galleryWrapper = document.querySelector('.gallery');
const button = document.querySelector('h1');


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
    const query = str.value.trim(); // Получаем значение из input
    if (query) {
        fetchHandler(query); // Выполняем запрос с пользовательским вводом
    } else {
        console.log('Please enter a search term');
        galleryWrapper.innerHTML = '<p>Please enter a search term</p>'; // Сообщение, если ввод пуст
    }
});