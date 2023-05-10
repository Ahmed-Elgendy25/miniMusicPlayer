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







//i need function to iterate over every artist's track when i press forward button//






const artists = [

 {
    name:'Marwan Pablo',
    tracks: [
      {
        name:'Free',
        src:'free.mp3',
        img:'marwanPablo.jpg',
        playList: null,
        countListened: 0,
      },
      
       {
        name:'Ghaba',
        src:'ghaba.mp3',
        img:'ghaba.jpg',
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
      img:'dizzy3.jpg',
      playList: null,
      countListened: 0,
    },
    
     {
      name:'Restart',
      src:'Restart.mp3',
      img:'Restart.jpg',
      playList: null,
      countListened: 0,
     }
  ]
},

{
  name:'Marwan Moussa',
  tracks: [
    {
      name:'VIP',
      src:'VIP.mp3',
      img:'marwanMoussa5.jpg',
      playList: null,
      countListened: 0,
    },
    
     {
      name:'Rio ft.Stormy',
      src:'RIO.mp3',
      img:'marwanMoussa3.jpg',
      playList: null,
      countListened: 0,
     },

     {
      name:'1/4 Qarn ft.R3',
      src:'ROB3 Qarn.mp3',
      img:'marwanMoussa2.jpg',
      playList: null,
      countListened: 0,
     },


     {
      name:'Shokran',
      src:'Shokran.mp3',
      img:'marwanMoussa4.jpg',
      playList: null,
      countListened: 0,
     },
  ]
}
,



];


const forwardBtn = document.querySelector('#forward');
const backwardBtn = document.querySelector('#backward');
// currentArtistIndex & currentTrackIndex used to itrate over array of objects//
let currentArtistIndex = 0;
let currentTrackIndex = 0;

let generalTrackIndex = 0;
let lastTrackIndex ;
//let lastTrackIndex;
//let generalTrackIndex = 0; // track1# track2# track3#
// Play the current track
const artistName=document.querySelector('#artist-name');
const  albumName = document.querySelector('#album-name');

function playTrack() {

  let currentArtist = artists[currentArtistIndex];
  let currentTrack = currentArtist.tracks[currentTrackIndex];
  song.src = currentTrack.src;
  song.play();


  albumName.textContent=currentTrack.name;
  artistName.textContent=currentArtist.name;


}

// Go to the next track


function playNextTrack() {
  let currentArtist = artists[currentArtistIndex];

  
  // Play the current track...
  

  
  // Move to the next track or artist
  if (currentTrackIndex < currentArtist.tracks.length - 1) {
    currentTrackIndex++;
    generalTrackIndex++;
  } else if (currentArtistIndex < artists.length - 1) {
        // If this is the last track of the current artist and there are more artists
        //, go to the next artist's first track//
    currentArtistIndex++;
    currentTrackIndex = 0;
    generalTrackIndex++;
  } else {
    // We've reached the end of the last artist's last track, so start over from the beginning
    currentArtistIndex = 0;
    currentTrackIndex = 0;
    lastTrackIndex=generalTrackIndex;
    generalTrackIndex = 0;
  }

  playTrack();
}






// Go to the previous track
function prevTrack() { // bug here.
  if (currentTrackIndex > 0) {
    // If there are previous tracks in the current artist's tracks array, go to the previous track
    currentTrackIndex--;
    generalTrackIndex--;
  } else if (currentArtistIndex > 0) {
    // If this is the first track of the current artist and there are previous artists, go to the previous artist's last track
    currentArtistIndex--;
    currentTrackIndex = artists[currentArtistIndex].tracks.length - 1;
    generalTrackIndex--;
    
  } else {
    // If this is the first track of the first artist, loop back to the last artist's last track
    currentArtistIndex = artists.length - 1;//go to last artist
    currentTrackIndex = artists[currentArtistIndex].tracks.length - 1;// go to last track of last artist
    generalTrackIndex=lastTrackIndex;
  }

  playTrack();
}


forwardBtn.addEventListener('click',function() {
//



  playNextTrack();

  let currentArtist = artists[currentArtistIndex];
  let currentTrack = currentArtist.tracks[currentTrackIndex];
  
   //CHANGE IMAGE UPON EACH TRACK//
   let img = document.querySelector('#artist-img');
  img.src = currentTrack.img;
  
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
  let currentArtist = artists[currentArtistIndex];
  let currentTrack = currentArtist.tracks[currentTrackIndex];
  
   //CHANGE IMAGE UPON EACH TRACK//
   let img = document.querySelector('#artist-img');
  img.src = currentTrack.img;
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
const ended = song.addEventListener('ended', () => {
  const currentArtist = artists[currentArtistIndex];
  const currentTrack = currentArtist.tracks[currentTrackIndex];

  // increment the countListened of the current track
  currentTrack.countListened++;

  sortByMostListenedTracks(artists);

  /*
  
This code selects all the elements with the CSS class .track which represent the rows in the playlist table. It then loops through each row using the forEach method
, and for each row, it extracts the artist name and track name from the h6 element in that row using the textContent property and the split method. 
It then checks if the extracted artist name and track name match the current artist and track using an if statement.
If the names match, it selects the element with the class .count which represents the count of times the track has been played and 
updates its text content to the new count value using the textContent property.
Essentially, this code updates the count of times a track has been played in the playlist table every time the track finishes playing.
  
  */
  const tracksInPlaylist = document.querySelectorAll('.track');
  tracksInPlaylist.forEach(track => {
      const artistName = track.querySelector('h6').textContent.split(' - ')[0];
      const trackName = track.querySelector('h6').textContent.split(' - ')[1];
      if (artistName === currentArtist.name && trackName === currentTrack.name) {
          const countElem = track.querySelector('.count');
          countElem.textContent = currentTrack.countListened;
      }
  });

  // Switch to the next track

 
  playNextTrack();
  
 
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
addToList.addEventListener('click', function() {
  let currentArtist = artists[currentArtistIndex];
  let currentTrack = currentArtist.tracks[currentTrackIndex];
  const tableContainer = document.querySelector('tbody');
  const tr = document.createElement('tr');
  tr.classList.add("track");
//
  tr.innerHTML = `
  <th scope="row">${generalTrackIndex+1}</th>
    <td><h6>${currentArtist.name} - ${currentTrack.name}</h6></td>
    <td class="count">${currentTrack.countListened}</td>
  `;

  // add to play-list
  if (addToListPlus.classList.contains('bi-plus-circle')) {
    currentTrack.playList = 'listed';
    addToListPlus.classList.remove('bi-plus-circle');
    addToListPlus.classList.add('bi-plus-circle-fill');
    addToList.setAttribute('style','background-color: #202020; color:#ffff;');
    tableContainer.append(tr);
  }
  // remove from play-list
  else {
    currentTrack.playList = null;
    addToListPlus.classList.remove('bi-plus-circle-fill');
    addToListPlus.classList.add('bi-plus-circle');
    addToList.removeAttribute("style");

    // remove the track from the playlist table
    const tracksInPlaylist = document.querySelectorAll('.track');
    tracksInPlaylist.forEach(track => {
      const artistName = track.querySelector('h6').textContent.split(' - ')[0];
      const trackName = track.querySelector('h6').textContent.split(' - ')[1];
      if (artistName === currentArtist.name && trackName === currentTrack.name) {
        track.remove();
      }
    });
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


/*
function updateCountListened() {
  const currentArtist = artists[currentArtistIndex];
  const currentTrack = currentArtist.tracks[currentTrackIndex];
  
  if (currentTrack!==null) {
    currentTrack.countListened++;

  }
  return currentTrack.countListened;
}
*/



// فى حاجة بص
// أبص فين ؟ 
/*


*/



function sortByMostListenedTracks(artists) {
  let artistLength = artists.length;
  let tableContainer = document.querySelector('tbody');
  let rows = Array.from(tableContainer.querySelectorAll('.track'));


  for(let i = 0; i < artistLength; i++) {
    let tracks = artists[i].tracks;
    let m = tracks.length;
    for(let j = 0; j < m; j++) {
      let maxIndex = j;
      for(let k = j+1; k < m; k++) {
        if(tracks[k].countListened > tracks[maxIndex].countListened) {
          maxIndex = k;
        }
      }
      if (maxIndex !== j) {
        [tracks[maxIndex], tracks[j]] = [tracks[j], tracks[maxIndex]];

        [rows[maxIndex], rows[j]] = [rows[j], rows[maxIndex]];
      }
    }
  }

  rows.forEach(row => tableContainer.appendChild(row));
}







/*
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
      countListened: 10,
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
*/


/*
[
  { title: "Song C", timesListened: 20 },
  { title: "Song D", timesListened: 15 },
  { title: "Song A", timesListened: 10 },
  { title: "Song B", timesListened: 5 },
]


*/