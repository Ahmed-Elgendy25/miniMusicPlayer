let progress = document.querySelector("#progress");
let song = document.querySelector("#song");
let ctrlIcon = document.querySelector("#ctrlIcon");
let durationDiv = document.createElement('div');
let p = document.createElement('p');
const img = document.querySelector(".duotone-img");


const  prefrences = document.querySelector('.pref')






/* eventlistener for like, and add in playlist */ 
prefrences.addEventListener('click', function () {
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


  
})








p.textContent = "0:00"; 

durationDiv.appendChild(p);
progress.parentNode.appendChild(durationDiv);
const refresh = song.onloadedmetadata = function() {
  progress.max = song.duration;
  progress.value = song.currentTime;




  
};




const updateSongTime = () => {

  progress.value = song.currentTime;
  p.textContent = formatTime(song.currentTime) + " / " + formatTime(song.duration);
  }

  /* when you click on play button -> it plays 
    also when you click on pause button -> it pause
  */
  ctrlIcon.addEventListener('click',function (e) {
  e.preventDefault();
  if(ctrlIcon.classList.contains("bi-pause-circle-fill")) {
    song.pause();
    
    ctrlIcon.classList.remove("bi-pause-circle-fill");
    ctrlIcon.classList.add("bi-play-circle");

  } else {
    playTrack();
    

    ctrlIcon.classList.add("bi-pause-circle-fill");
    ctrlIcon.classList.remove("bi-play-circle");
  }

  updateSongTime();
});

/* to make progress circle move in bar of slider*/
setInterval(() => {
  progress.value = song.currentTime;
  updateSongTime();
}, 500);

progress.onchange = () => {
  playTrack();
  

  song.currentTime = progress.value;
  updateSongTime();
  ctrlIcon.classList.add("bi-pause-circle-fill");
  ctrlIcon.classList.remove("bi-play-circle");




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
    name:'Marwan Pablo',
    tracks: [
      {
        name:'Free',
        src:'free.mp3',
        playList: null,
      },
      
       {
        name:'Ghaba',
        src:'ghaba.mp3',
        playList: null,
       }
    ]
  }
,

{
  name:'DizzyTooSkinny',
  tracks: [
    {
      name:'STR3',
      src:'STR3.mp3',
      playList: null,
    },
    
     {
      name:'Restart',
      src:'Restart.mp3',
      playList: null,
     }
  ]
}

];


const forwardBtn = document.querySelector('#forward');
const backwardBtn = document.querySelector('#backward');

let currentArtistIndex = 0;
let currentTrackIndex = 0;

// Play the current track
const artistName=document.querySelector('#artist-name');
const  albumName = document.querySelector('#album-name');

function playTrack() {

  const currentArtist = artists[currentArtistIndex];
  const currentTrack = currentArtist.tracks[currentTrackIndex];
  song.src = currentTrack.src;
  song.play();


  albumName.textContent=currentTrack.name;
  artistName.textContent=currentArtist.name;


}

// Go to the next track
function nextTrack() {
  const currentArtist = artists[currentArtistIndex];
  if (currentTrackIndex < currentArtist.tracks.length - 1) {
    // If there are more tracks in the current artist's tracks array, go to the next track
    currentTrackIndex++;
  } else if (currentArtistIndex < artists.length - 1) {
    // If this is the last track of the current artist and there are more artists, go to the next artist's first track
    currentArtistIndex++;
    currentTrackIndex = 0;
  } else {
    // If this is the last track of the last artist, loop back to the first artist's first track
    currentArtistIndex = 0;
    currentTrackIndex = 0;
  }

  listedOrNot();
  playTrack();
}





// Go to the previous track
function prevTrack() {
  const currentArtist = artists[currentArtistIndex];
  if (currentTrackIndex > 0) {
    // If there are previous tracks in the current artist's tracks array, go to the previous track
    currentTrackIndex--;
  } else if (currentArtistIndex > 0) {
    // If this is the first track of the current artist and there are previous artists, go to the previous artist's last track
    currentArtistIndex--;
    currentTrackIndex = artists[currentArtistIndex].tracks.length - 1;
  } else {
    // If this is the first track of the first artist, loop back to the last artist's last track
    currentArtistIndex = artists.length - 1;
    currentTrackIndex = artists[currentArtistIndex].tracks.length - 1;
  }
  playTrack();
}
forwardBtn.addEventListener('click',nextTrack);
backwardBtn.addEventListener('click', prevTrack);




// Auto switch music when it finishes//
song.addEventListener('ended', () => {
  // Switch to the next track
  nextTrack();
});

//Playlist//

const playlistColumn = document.getElementById("playlist-column");
const playlistIcon = document.getElementById("playlist-icon");
const gridContainer3 = document.querySelector('.col-md-1');
const gridContainer2 = document.querySelector('.col-md-8');

playlistIcon.addEventListener('click', function() {
  if (gridContainer3.classList.contains('col-md-1')) {
    gridContainer3.classList.toggle('d-none');
    playlistColumn.classList.toggle('d-none');
    gridContainer2.classList.remove('col-md-8');
    gridContainer2.classList.add('col-md-6');
  } 
});



//Exit from playlist //
const exit = document.querySelector('#exit');

exit.addEventListener('click',function () {
  gridContainer3.classList.toggle('d-none');
  playlistColumn.classList.toggle('d-none');
  gridContainer2.classList.remove('col-md-6');
  gridContainer2.classList.add('col-md-8');
});



//Interaction with playlist//


const addToList = document.querySelector('#pref-list');
const addToListPlus = document.querySelector('#pref-list i');
const playlistDiv = document.querySelector('#playlist-div');



addToList.addEventListener('click',function () {


listedOrNot();
 
 

  }
); 

function listedOrNot() {

  const currentArtist = artists[currentArtistIndex];
  const currentTrack = currentArtist.tracks[currentTrackIndex];

  const p = document.createElement('p');
  p.textContent = `${artistName.textContent} - ${albumName.textContent}`;
  
  if(currentTrack.playList===null) { //style the button then add to object that the track is listed on playlist


    
      currentTrack.playList='listed';
      addToListPlus.classList.remove('bi-plus-circle');
      addToListPlus.classList.add('bi-plus-circle-fill');
      addToList.setAttribute('style','background-color: #202020; color:#ffff;');
      
      playlistDiv.append(p);
      
   
  }
  else {
    currentTrack.playList=null;
    addToListPlus.classList.remove('bi-plus-circle-fill');
    addToListPlus.classList.add('bi-plus-circle');
    addToList.removeAttribute("style");
    
   playlistDiv.lastElementChild.remove();
  }
}






// فى حاجة بص
// أبص فين ؟ 
/*
const artists = [

 {
    name:'Marwan Pablo',
    tracks: [
      {
        name:'Free',
        src:'free.mp3',
        playList: null,
      },
      
       {
        name:'Ghaba',
        src:'ghaba.mp3',
        playList: null,
       }
    ]
  }
,

{
  name:'DizzyTooSkinny',
  tracks: [
    {
      name:'STR3',
      src:'STR3.mp3',
      playList: null,
    },
    
     {
      name:'Restart',
      src:'Restart.mp3',
      playList: null,
     }
  ]
}

];

*/