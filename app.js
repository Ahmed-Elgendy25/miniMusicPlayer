let progress = document.querySelector("#progress");
let song = document.querySelector("#song");
let ctrlIcon = document.querySelector("#ctrlIcon");
let durationDiv = document.createElement('div');
let p = document.createElement('p');
const img = document.querySelector(".duotone-img");


const  prefrences = document.querySelectorAll('.pref')






/* eventlistener for like, and add in playlist */ 
for(let pref of prefrences) {
  pref.addEventListener('click',colorize);
}


function colorize() {
  let child = this.lastChild;

  if(child.classList.contains('bi-heart')) {
    child.classList.remove('bi-heart');
    child.classList.add('bi-heart-fill');
    this.setAttribute('style','background-color: #202020;');
  }

  else if (child.classList.contains('bi-heart-fill')) {
    child.classList.remove('bi-heart-fill');
    this.removeAttribute("style");
    child.classList.add('bi-heart');
  }

  if(child.classList.contains('bi-plus-circle')) {
    child.classList.remove('bi-plus-circle');
    child.classList.add('bi-plus-circle-fill');
    this.setAttribute('style','background-color: #202020; color:#ffff;');
   
  }
  else if(child.classList.contains('bi-plus-circle-fill')) {
    child.classList.remove('bi-plus-circle-fill');
    child.classList.add('bi-plus-circle');
    this.removeAttribute("style");
   
  }

  
}





p.textContent = "0:00"; 
durationDiv.appendChild(p);
progress.parentNode.appendChild(durationDiv);
song.onloadedmetadata = function() {
  progress.max = song.duration;
  progress.value = song.currentTime;

 


  
};

const updateSongTime = () => {
    progress.value = song.currentTime;
    p.textContent = formatTime(song.currentTime) + " / " + formatTime(song.duration);
  }

ctrlIcon.addEventListener('click',function (e) {
  e.preventDefault();
  if(ctrlIcon.classList.contains("bi-pause-circle-fill")) {
    song.pause();
    
    ctrlIcon.classList.remove("bi-pause-circle-fill");
    ctrlIcon.classList.add("bi-play-circle");

  } else {
    song.play();
    

    ctrlIcon.classList.add("bi-pause-circle-fill");
    ctrlIcon.classList.remove("bi-play-circle");
  }

  updateSongTime();
});

setInterval(() => {
  progress.value = song.currentTime;
  updateSongTime();
}, 500);

progress.onchange = () => {
  song.play();
  

  song.currentTime = progress.value;

  ctrlIcon.classList.add("bi-pause-circle-fill");
  ctrlIcon.classList.remove("bi-play-circle");
  updateSongTime();

};

// Helper function to format time in minutes and seconds
function formatTime(timeInSeconds) {
  if (isNaN(timeInSeconds)) {
    return "0:00";
  }
  
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = Math.floor(timeInSeconds % 60);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}




/* For volume slider */


const volumeSlider = document.querySelector('#volume-slider');

volumeSlider.addEventListener('input', function() {
  song.volume = volumeSlider.value / 100;
});

/*Change Icon of volume once you click it! */
const volumeButton = document.querySelector('.volume');
const volumeIcon = document.querySelector('.bi-volume-up');
let flag = false;
volumeButton.addEventListener('click',function() {
 volumeSlider.value=0;
  
  if(!flag) {
    flag=true;
    song.volume=volumeSlider.value;
    volumeIcon.classList.remove('bi-volume-up');
    volumeIcon.classList.add('bi-volume-mute-fill');
  }
  
  else {
    volumeIcon.classList.remove('bi-volume-mute-fill');
    volumeIcon.classList.add('bi-volume-up');
    volumeSlider.value=100;
    song.volume=volumeSlider.value/100;
    flag = false
  }



});



















const artists = [

 {
    name:'Marwan Pablo'
  }
,


  
]