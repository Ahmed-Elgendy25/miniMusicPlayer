let progress = document.querySelector("#progress");
let song = document.querySelector("#song");
let ctrlIcon = document.querySelector("#play-btn");
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
 let iconPlay=  document.querySelector("#ctrlIcon");
  ctrlIcon.addEventListener('click',function (e) {
  e.preventDefault();
  if(iconPlay.classList.contains("bi-pause-circle-fill")) {
    song.pause();
    
    iconPlay.classList.remove("bi-pause-circle-fill");
    iconPlay.classList.add("bi-play-circle");

  } else {
    playTrack();
    

    iconPlay.classList.add("bi-pause-circle-fill");
    iconPlay.classList.remove("bi-play-circle");
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
    icon:'Photos/marwanPablo3.jpg',
    tracks: [
      {
        name:'Free',
        src:'Music/free.mp3',
        img:'Photos/marwanPablo.jpg',
        playList: null,
        countListened: 0,
      },
      
       {
        name:'Ghaba',
        src:'Music/ghaba.mp3',
        img:'Photos/ghaba.jpg',
        playList: null,
        countListened: 0,
       }
    ]
  }
,

{
  name:'Dizzy Too Skinny',
  icon:'Photos/dizzy.jpg',
  tracks: [
    {
      name:'STR3',
      src:'Music/STR3.mp3',
      img:'Photos/dizzy4.jpg',
      playList: null,
      countListened: 0,
    },
    
     {
      name:'Restart',
      src:'Music/Restart.mp3',
      img:'Photos/Restart.jpg',
      playList: null,
      countListened: 0,
     }
  ]
},

{
  name:'Marwan Moussa',
  icon:'Photos/marwanMoussa.jpg',
  tracks: [
    {
      name:'VIP',
      src:'Music/VIP.mp3',
      img:'Photos/marwanMoussa5.jpg',
      playList: null,
      countListened: 0,
    },
    
     {
      name:'Rio ft.Stormy',
      src:'Music/RIO.mp3',
      img:'Photos/marwanMoussa3.jpg',
      playList: null,
      countListened: 0,
     },

     {
      name:'1/4 Qarn ft.R3',
      src:'Music/ROB3 Qarn.mp3',
      img:'Photos/marwanMoussa2.jpg',
      playList: null,
      countListened: 0,
     },


     {
      name:'Shokran',
      src:'Music/Shokran.mp3',
      img:'Photos/marwanMoussa4.jpg',
      playList: null,
      countListened: 0,
     },
  ]
},


{
  name:'Ahmed Santa',
  icon:'Photos/ahmedSanta2.jpg',
  tracks: [
    {
      name:'Ahmed Santa',
      src:'Music/ahmedSanta.mp3',
      img:'Photos/ahmedSanta.jpg',
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
  
 //CHANGE IMAGE & ICON UPON EACH TRACK//
 let img = document.querySelector('#artist-img');
 let icon = document.querySelector('#artist-img2');
 img.src = currentTrack.img;
 icon.src = currentArtist.icon;


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
function prevTrack() { 
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


forwardBtn.addEventListener('click', function () {
    

    playNextTrack();

    let currentArtist = artists[currentArtistIndex];
    let currentTrack = currentArtist.tracks[currentTrackIndex];

    //CHANGE IMAGE & ICON UPON EACH TRACK//
    let img = document.querySelector('#artist-img');
    let icon = document.querySelector('#artist-img2');
    img.src = currentTrack.img;
    icon.src = currentArtist.icon;

    if (!listedOrNot()) {
        addToListPlus
            .classList
            .remove('bi-plus-circle-fill');
        addToListPlus
            .classList
            .add('bi-plus-circle');
        addToList.removeAttribute("style");
    } else {
        addToListPlus
            .classList
            .remove('bi-plus-circle');
        addToListPlus
            .classList
            .add('bi-plus-circle-fill');
        addToList.setAttribute('style', 'background-color: #202020; color:#ffff;');
    }

});
backwardBtn.addEventListener('click', function () {

    prevTrack();
    let currentArtist = artists[currentArtistIndex];
    let currentTrack = currentArtist.tracks[currentTrackIndex];

    //CHANGE IMAGE & ICON UPON EACH TRACK//
    let img = document.querySelector('#artist-img');
    let icon = document.querySelector('#artist-img2');
    img.src = currentTrack.img;
    icon.src = currentArtist.icon;
    if (listedOrNot()) {
        addToListPlus
            .classList
            .remove('bi-plus-circle');
        addToListPlus
            .classList
            .add('bi-plus-circle-fill');
        addToList.setAttribute('style', 'background-color: #202020; color:#ffff;');
    } else {
        addToListPlus
            .classList
            .remove('bi-plus-circle-fill');
        addToListPlus
            .classList
            .add('bi-plus-circle');
        addToList.removeAttribute("style");
    }
});




// Auto switch music when it finishes//
 song.addEventListener('ended', () => {
  const currentArtist = artists[currentArtistIndex];
  const currentTrack = currentArtist.tracks[currentTrackIndex];

  // increment the countListened of the current track
  currentTrack.countListened++;
  


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
        currentTrack.countListened = 0;
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




// فى حاجة بص
// أبص فين ؟ 
/*


*/












// Function to sort the playlist tracks based on most listened
function sortPlaylistByMostListened() {
  const playlistContainer = document.querySelector('tbody');
  const playlistTracks = Array.from(playlistContainer.querySelectorAll('.track'));

  playlistTracks.sort((a, b) => {
    const countA = parseInt(a.querySelector('.count').textContent);
    const countB = parseInt(b.querySelector('.count').textContent);
    return countB - countA;
  });

  // Update the indices of the sorted tracks
  playlistTracks.forEach((track, index) => {
    track.querySelector('th').textContent = index + 1;
  });

  // Re-append the sorted tracks to the playlist container
  playlistTracks.forEach(track => playlistContainer.appendChild(track));
}

// Function to handle the end of a track
function handleTrackEnd() {
  // Update the countListened for the current track

  // Sort the playlist after the track ends
  sortPlaylistByMostListened();
}

// toggle with playlist -> add or delete from playlist//
addToList.addEventListener('click', function() {
  // ...

  // add to play-list
  if (addToListPlus.classList.contains('bi-plus-circle')) {
    // ...

    tableContainer.append(tr);
  }
  // remove from play-list
  else {
    // ...

    // Remove the track from the playlist table

    sortPlaylistByMostListened(); // Sort the playlist after removing the track
  }
});

// Example code to simulate track end
// Call this function wherever you handle the end of a track
function simulateTrackEnd() {
  handleTrackEnd();
}

// Example usage: Simulate track end every 5 seconds
setInterval(simulateTrackEnd, 5000);




















