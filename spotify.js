const songCards = document.querySelector(".songCards");
const artistDetails = document.querySelector(".artistDetails");

// Create Button aur uski SVG ko select kiya
const createBtn = document.querySelector(".createBtn");
const createSvg = document.querySelector(".createBtn svg");

// Search Bar input
const search = document.getElementById("songSearch");

// Pop-up Container
const popUpOverlay = document.getElementById("popUpOverlay");
const playBtnTrigger = document.querySelectorAll(".playBtnTrigger")

const api = [
  {
    id: 0,
    songTitle: "Alfaaz",
    SongCover: "imges/songs/Alfaaz Hamza Malik x Zain Zohaib.png",
    song: "songs/Alfaaz Hamza Malik x Zain Zohaib Official Visualiser.mp3",
    artist: "Alfaaz Hamza",
    artistImg: "imges/artists/hamza malik.jpeg",
  },
  {
    id: 1,
    songTitle: "Banger",
    SongCover: "imges/songs/Banger.png",
    song: "songs/BANGER (Official Music Video) Badshah x Sharvi x Hiten ft Aveera Singh _ #desihiphop [sY45iA7PFS8].mp3",
    artist: "Badshah",
    artistImg: "imges/artists/badshah.jpeg",
  },
  {
    id: 2,
    songTitle: "Bari",
    SongCover: "imges/songs/bari Nijjar and jazz.png",
    song: "songs/NIJJAR & Jazz Dee - Bari.mp4",
    artist: "Nijjar",
    artistImg: "imges/songs/bari Nijjar and jazz.png",
  },
  {
    id: 3,
    songTitle: "Sammi Meri",
    SongCover: "imges/songs/coke studio season 8 sammi meri.png",
    song: "songs/Rathinamo (feat. Tanisha Gnanavel) (Female Version) [SmXnQZ0Hvjw].mp3",
    artist: "Umair Jaiswal",
    artistImg: "imges/artists/umari jaiswal.jpeg",
  },
  {
    id: 4,
    songTitle: "Rathinamo",
    SongCover: "imges/songs/rathinamo.png",
    song: "songs/Rathinamo (feat. Tanisha Gnanavel) (Female Version) [SmXnQZ0Hvjw].mp3",
    artist: "Tanisha Gnanavel",
    artistImg: "imges/artists/tanisha gnanavel.jpeg",
  },
];

// Cards Making Loop
songCards.innerHTML = "";
artistDetails.innerHTML = "";

for (let i = 0; i < api.length; i++) {
  const item = api[i];

  // Song Card
  songCards.innerHTML += `
    <div class="cards">
      <div class="songImg">
        <img src="${item.SongCover}" alt="${item.songTitle}">
        <div class="playBtn playBtnTrigger">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/>
          </svg>
        </div>
      </div>
      <h4 class="songName underLine">${item.songTitle}</h4>
      <p class="artist scaleAndWhiteText underLine">${item.artist}</p>
    </div>
  `;

  // Artist Card
  artistDetails.innerHTML += `
    <div class="cards">
      <div class="artistImg">
        <img src="${item.artistImg}" alt="${item.artist}">
        <div class="playBtn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/>
          </svg>
        </div>
      </div>
      <h4 class="artistName underLine">${item.artist}</h4>
      <p class="title scaleAndWhiteText underLine">Artist</p>
    </div>
  `;
}

// 45deg Rotate Event Listener
createBtn.addEventListener("click", () => {
  createLibraryPopUp.classList.toggle("show");
  createSvg.classList.toggle("rotate45");
});

// Seraching items by Song/singer/arties
search.addEventListener("input", () => {
  const searchValue = search.value.toLowerCase().trim();
  
  // Selecting all cards from screen
  const allCards = document.querySelectorAll(".cards");
  allCards.forEach((card) => {
    const cardText = card.textContent.toLowerCase();
    
    if (cardText.includes(searchValue)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});


// api.forEach((item)=>{
//     // console.log(item)
//     songdata.src = item.SongCover
// })


// PopUp items Listing

let cardsHTML = "";
api.forEach((item, index) => {
  cardsHTML += `
                <div class="songModalCard">
                <button class="closeModalBtn" id="closeModalBtn">&times;</button>
                <div class="modalSongImg">
                  <img id="modalImg" src="" alt="Song Cover">
                </div>
                <h3 class="modalSongName" id="modalTitle"></h3>
                <p class="modalArtistName" id="modalArtist"></p>
              </div>
            `;
});

// Open popUp window
const playButtons = document.querySelectorAll(".playBtnTrigger")
playButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    popUpOverlay.classList.add("show");
  });
});

// Close PopUp
popUpOverlay.addEventListener("click", () => {
  popUpOverlay.classList.remove("show");
});


let newdata = document.querySelectorAll(".modalSongImg img");

api.forEach((item)=>{
  console.log(item.SongCover)
  newdata.forEach((data )=>{
    // console.log(data)
    data.src = item.SongCover
  })
})




