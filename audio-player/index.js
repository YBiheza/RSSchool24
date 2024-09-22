let cover = document.querySelector('.album-cover');
let author = document.querySelector('.author');
let songName = document.querySelector('.song-name');
let audio = document.querySelector('.audio');
let play = document.querySelector('.play');
let pause = document.querySelector('.pause');
let next = document.querySelector('.forward');
let prev = document.querySelector('.back');
let playerLine = document.querySelector('.player-line')
let progress = document.querySelector('.progress')
let cTime = document.querySelector('.currentTime')
let body = document.querySelector('.body')



let songs = ['dontstartnow', 'beyonce'];
let authors = ['Dua Lipa', 'Beyonce'];
let songsNames = ["Don't Start Now", 'Lemonade'];
let pics = ['dontstartnow', 'lemonade'];

let num = 0;

function LoadSong(song) {
     songName.innerHTML = `${songsNames[num]}`
     author.innerHTML = `${authors[num]}`
     audio.src = `./assets/audio/${song}.mp3`
     cover.src = `./assets/img/${pics[num]}.png`
     body.style.backgroundImage = `url('./assets/img/${pics[num]}.png')`;}

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
        play.src = `./assets/svg/pause.png`; 
        cover.classList.add('playing'); 
        cover.animate(zoom, zoomTime);
    } else {
        audio.pause();
        play.src = `./assets/svg/play.png`; 
        cover.classList.remove('playing'); 
        cover.animate(inzoom, zoomTime);
    }
});

function Next () {
    if (num === songs.length-1) {
        num = 0;
    } else {
        num++;
    }
    if (!audio.paused) {
        audio.pause();
        play.src = `./assets/svg/play.png`; 
        cover.classList.remove('playing'); 
        //cover.animate(inzoom, zoomTime);
    }
    LoadSong(songs[num]);
    audio.play();
    play.src = `./assets/svg/pause.png`; 
    cover.classList.add('playing'); 
}

next.addEventListener('click', () => {
    Next()
})

function Prev () {
    if (num === 0) {
        num = songs.length-1;
    } else {
        num--;
    }
    if (!audio.paused) {
        audio.pause();
        play.src = `./assets/svg/play.png`;
        cover.classList.remove('playing'); 
        //cover.animate(inzoom, zoomTime);
    }
    LoadSong(songs[num]);
    audio.play();
    play.src = `./assets/svg/pause.png`;
    cover.classList.add('playing');
}

prev.addEventListener('click', () => {
    Prev()
})

let duration = 0;
audio.addEventListener('loadedmetadata', () => {
    duration = audio.duration; // Длительность в секундах
    //console.log(`Длительность аудио: ${duration} секунд`);
});

let currentTime = 0;
audio.addEventListener('timeupdate', () => {
    currentTime = audio.currentTime; // Текущее время в секундах
    //console.log(`Текущее время: ${currentTime} секунд`);
    cTime.innerHTML = `${Math.floor(currentTime/1000)}:${currentTime.toFixed(0)}`
});

function Progress(e) {
    //let duration = audio.duration;
    //let currentTime = audio.currentTime;
    let progressPercent = 100 * currentTime / duration
    progress.style.width = `${progressPercent}%`
    //console.log( progress.style.width);
}

audio.addEventListener('timeupdate', Progress)

function SetProgress(e) {
    let w = this.clientWidth
    let x = e.offsetX
    console.log(duration);
    audio.currentTime = (x / w) * duration;
}

playerLine.addEventListener('click', SetProgress)
