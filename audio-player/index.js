let cover = document.querySelector('.album-cover');
let author = document.querySelector('.author');
let songName = document.querySelector('.song-name');
let audio = document.querySelector('.audio');

let songs = ['dontstartnow', 'beyonce'];

function LoadSong(song) {
     songName.innerHTML = song;
}