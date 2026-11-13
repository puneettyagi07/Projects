const songCards = document.querySelector(".songCards");
const artistDetails = document.querySelector(".artistDetails");

const createBtn = document.querySelector(".createBtn");
const createSvg = document.querySelector(".createBtn svg");
const createLibraryPopUp = document.getElementById("createLibraryPopUp");

const search = document.getElementById("songSearch");

// Modal Elements
const popUpOverlay = document.getElementById("popUpOverlay");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalArtist = document.getElementById("modalArtist");

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

// Render Song & Artist Cards
let songsHTML = "";
let artistsHTML = "";

api.forEach((item) => {
  songsHTML += `
    <div class="cards" data-id="${item.id}">
      <div class="songImg">
        <img src="${item.SongCover}" alt="${item.songTitle}">
        <div class="playBtn playBtnTrigger" data-id="${item.id}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/>
          </svg>
        </div>
      </div>
      <h4 class="songName underLine">${item.songTitle}</h4>
      <p class="artist scaleAndWhiteText underLine">${item.artist}</p>
    </div>
  `;

  artistsHTML += `
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
});

songCards.innerHTML = songsHTML;
artistDetails.innerHTML = artistsHTML;

// Create Library Popup Toggle
createBtn.addEventListener("click", () => {
  createLibraryPopUp.classList.toggle("show");
  createSvg.classList.toggle("rotate45");
});

// Search Filter
search.addEventListener("input", () => {
  const searchValue = search.value.toLowerCase().trim();
  const allCards = document.querySelectorAll(".cards");

  allCards.forEach((card) => {
    const cardText = card.textContent.toLowerCase();
    card.style.display = cardText.includes(searchValue) ? "flex" : "none";
  });
});

// PopUp Cards Creating
  // api.forEach((item) => {
  //           con.innerHTML += `
  //               <div class="song-card" data-id="${item.id}">
  //                   <div class="song-img"><img src="${item.img}" alt="${item.title}"></div>
  //                   <div class="song-title">${item.title}</div>
  //                   <div class="song-artist">${item.artist}</div>
  //               </div>
  //           `;
  //       });

  
  //  let songCard = document.querySelectorAll(".song-card");

  //       songCard.forEach((card)=>{
  //          card.addEventListener("click",()=>{
  //               let cardId = card.getAttribute("data-id");
  //               let songId = songs.find(song => song.id == cardId);
  //               // console.log(songId)
  //               popupImg.src = songId.img;
  //               popupArtist.textContent = songId.artist;
  //               popupTitle.textContent= songId.title;

  //           popupOverlay.classList.add("active")


  //          })
  //       })

  //       closeBtn.addEventListener("click",()=>{
  //           popupOverlay.classList.remove("active")
  //       })


// Open Song Popup on Play Button Click
const playButtons = document.querySelectorAll(".playBtnTrigger");

playButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const cardId = btn.getAttribute("data-id");
    const selectedSong = api.find((song) => song.id == cardId);

    if (selectedSong) {
      modalImg.src = selectedSong.SongCover;
      modalTitle.textContent = selectedSong.songTitle;
      modalArtist.textContent = selectedSong.artist;
      popUpOverlay.classList.add("show");
    }
  });
});

// Close Popup via Close Button or Backdrop Click
closeModalBtn.addEventListener("click", () => {
  popUpOverlay.classList.remove("show");
});

popUpOverlay.addEventListener("click", (e) => {
  if (e.target === popUpOverlay) {
    popUpOverlay.classList.remove("show");
  }
});