let cover = document.querySelector('.album-cover');
let author = document.querySelector('.author');
let songName = document.querySelector('.song-name');
let audio = document.querySelector('.audio');
let play = document.querySelector('.play');
let pause = document.querySelector('.pause');


let songs = ['dontstartnow', 'beyonce'];
let authors = ['Dua Lipa', 'Beyonce'];
let songsNames = ["Don't start now", 'Lemonade'];
let pics = ['dontstartnow', 'lemonade'];

let num = 1;

function LoadSong(song) {
     songName.innerHTML = `${songsNames[num]}`
     author.innerHTML = `${authors[num]}`
     audio.src = `./assets/audio/${song}.mp3`
     cover.src = `./assets/img/${pics[num]}.png`
}

LoadSong(songs[num]);

const zoom = [
    { transform: "scale(1)" },
    { transform: "scale(1.2)" },
  ];
  
  const zoomTime = {
    duration: 2000,
    iterations: 1,
  };

  const inzoom = [
    { transform: "scale(1.2)" },
    { transform: "scale(1)" },
  ];
 
play.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        play.src = `./assets/svg/pause.png`; // Меняем иконку на паузу
        cover.classList.add('playing'); // Добавляем класс playing для состояния воспроизведения
        cover.animate(zoom, zoomTime);
    } else {
        audio.pause();
        play.src = `./assets/svg/play.png`; // Меняем иконку на play
        cover.classList.remove('playing'); // Удаляем класс playing, когда на паузе
        cover.animate(inzoom, zoomTime);
    }
});
