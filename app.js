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
        countListened: 0,
      },
      
       {
        name:'Ghaba',
        src:'ghaba.mp3',
        playList: null,
        countListened: 0,
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
      countListened: 0,
    },
    
     {
      name:'Restart',
      src:'Restart.mp3',
      playList: null,
      countListened: 0,
     }
  ]
}

];


const forwardBtn = document.querySelector('#forward');
const backwardBtn = document.querySelector('#backward');
// currentArtistIndex & currentTrackIndex used to itrate over array of objects//
let currentArtistIndex = 0;
let currentTrackIndex = 0;

let generalTrackIndex = 0; // track1# track2# track3#
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
    generalTrackIndex++;
  } else if (currentArtistIndex < artists.length - 1) {
    // If this is the last track of the current artist and there are more artists, go to the next artist's first track
    currentArtistIndex++;
    generalTrackIndex++;
    currentTrackIndex = 0;
  } else {
    // If this is the last track of the last artist, loop back to the first artist's first track
    currentArtistIndex = 0;
    currentTrackIndex = 0;
  }

  
  playTrack();
}





// Go to the previous track
function prevTrack() {
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


forwardBtn.addEventListener('click',function() {
//




  nextTrack();

  if(!listedOrNot()) {
    addToListPlus.classList.remove('bi-plus-circle-fill');
    addToListPlus.classList.add('bi-plus-circle');
    addToList.removeAttribute("style");
  }

  else {
    addToListPlus.classList.remove('bi-plus-circle');
    addToListPlus.classList.add('bi-plus-circle-fill');
    addToList.setAttribute('style','background-color: #202020; color:#ffff;');
  }

});
backwardBtn.addEventListener('click', function () {

  prevTrack();

  if(listedOrNot()) {
    addToListPlus.classList.remove('bi-plus-circle');
    addToListPlus.classList.add('bi-plus-circle-fill');
    addToList.setAttribute('style','background-color: #202020; color:#ffff;');
  }
  else {
    addToListPlus.classList.remove('bi-plus-circle-fill');
    addToListPlus.classList.add('bi-plus-circle');
    addToList.removeAttribute("style");
  }
});




// Auto switch music when it finishes//
song.addEventListener('ended', () => {
 
  const currentArtist = artists[currentArtistIndex];
  const currentTrack = currentArtist.tracks[currentTrackIndex];
  //every-time the track finish it increases the counter of countListened in object//
  const td = document.querySelector('.track .count');
  ++currentTrack.countListened;
  td.innerHTML= `<td>${currentTrack.countListened}</td>`


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


// toggle with playlist -> add or delete from playlist//


addToList.addEventListener('click',function () {
 const currentArtist = artists[currentArtistIndex];
  const currentTrack = currentArtist.tracks[currentTrackIndex];
const tableContainer= document.querySelector('tbody');
  const tr = document.createElement('tr');

  tr.classList.add("track");
 
  tr.innerHTML = `
  
                        <th scope="row">${generalTrackIndex+1}</th>
                        <td> <h6>${currentArtist.name} - ${currentTrack.name}</h6></td>
                        <td class="count">${currentTrack.countListened}</td>
  
  `;
  


  
  //add in play-list//
  if(addToListPlus.classList.contains('bi-plus-circle')) {
   
    currentTrack.playList='listed';
    addToListPlus.classList.remove('bi-plus-circle');
    addToListPlus.classList.add('bi-plus-circle-fill');
 
    addToList.setAttribute('style','background-color: #202020; color:#ffff;');
  

    tableContainer.append(tr);
 
   
  }
//remove from play-list//
  else if(addToListPlus.classList.contains('bi-plus-circle-fill')) {
    currentTrack.playList=null;
    addToListPlus.classList.remove('bi-plus-circle-fill');
    addToListPlus.classList.add('bi-plus-circle');
    addToList.removeAttribute("style");
    


   
   

   
  }
  
}); 

function listedOrNot() {
  const currentArtist = artists[currentArtistIndex];
  const currentTrack = currentArtist.tracks[currentTrackIndex];
  if(currentTrack.playList===null) {
    return false;
  }
  else {
    return true;
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

/*
function sortByMostListened(playlist) {
  for (let i = 0; i < playlist.length - 1; i++) {
    let maxIndex = i;
    for (let j = i + 1; j < playlist.length; j++) {
      if (playlist[j].timesListened > playlist[maxIndex].timesListened) {
        maxIndex = j;
      }
    }
    //swap
    if (maxIndex !== i) {
      [playlist[maxIndex], playlist[i]] = [playlist[i], playlist[maxIndex]];
    }
  }
  return playlist;
}
const playlist = [
  { title: "Song A", timesListened: 10 },
  { title: "Song B", timesListened: 5 },
  { title: "Song C", timesListened: 20 },
  { title: "Song D", timesListened: 15 },
];

const sortedPlaylist = sortByMostListened(playlist);
console.log(sortedPlaylist);
[
  { title: "Song C", timesListened: 20 },
  { title: "Song D", timesListened: 15 },
  { title: "Song A", timesListened: 10 },
  { title: "Song B", timesListened: 5 },
]
*/