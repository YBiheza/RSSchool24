let str = document.querySelector('input');
console.log(str.value);
let images = document.querySelector('.image')
const button = document.querySelector('h1');

/*async function fetchHandler () {
    try {
        const response = await fetch(url);
        const data = await response.json();  
        //console.log(response);

        images.src = data.file;
    } catch (error) {
        console.log('error:(');
    }
}*/

async function fetchHandler() {
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log('error:(');
    }
  }
  getData();

button.addEventListener('click', () => {
    console.log(str.value);
} )