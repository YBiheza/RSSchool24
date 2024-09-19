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

LoadSong(songs[0]);

play.addEventListener('click', () => {
    audio.play();
})

/*pause.addEventListener('click', () => {
    audio.pause();
})*/