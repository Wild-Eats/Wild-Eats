// Stickers Slider Feature
// -----------------------

const leftSticker = document.getElementById("leftSticker");
const rightSticker = document.getElementById("rightSticker");

const antilopeSticker = document.getElementById("antilopeSticker");
const casaSticker = document.getElementById("casaSticker");
const nonabatSticker = document.getElementById("nonabatSticker");
const kingSticker = document.getElementById("kingSticker");
const greenSticker = document.getElementById("greenSticker");
const schnellSticker = document.getElementById("schnellSticker");
const jackpotSticker = document.getElementById("jackpotSticker");
const courseSticker = document.getElementById("courseSticker");
const lotusSticker = document.getElementById("lotusSticker");
const bamacoSticker = document.getElementById("bamacoSticker");

const stickerResults = [
  antilopeSticker,
  casaSticker,
  nonabatSticker,
  kingSticker,
  greenSticker,
  schnellSticker,
  jackpotSticker,
  courseSticker,
  lotusSticker,
  bamacoSticker,
];

const results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function stickerSlide(direction) {
  for (let stick of stickerResults) {
    stick.classList.remove(
      "slot1",
      "slot2",
      "slot3",
      "slot4",
      "slot5",
      "slot6",
      "slot7",
      "slot8",
      "slot9",
      "slot10"
    );
  }

  results[0] = results[0] + direction;
  if (results[0] < 1) results[0] = 10;
  if (results[0] > 10) results[0] = 1;
  for (let i = 1; i < 10; i++) {
    results[i] = results[i - 1] + 1;
    if (results[i] > 10) results[i] = 1;
  }

  for (let i = 0; i < stickerResults.length; i++) {
    stickerResults[i].classList.add("slot" + results[i]);
  }
}

leftSticker.addEventListener("click", () => {
  stickerSlide(1);
});

rightSticker.addEventListener("click", () => {
  stickerSlide(-1);
});

// Mobile Search Filter Bar Feature
// --------------------------------

const catchphrase = document.getElementById("catchphrase");
const mobileFilterBar = document.getElementById("mobileFilterBar");
const filterForm = document.getElementById("filterForm");
const stickersSlider = document.getElementById("stickersSlider");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
  catchphrase.classList.add("hiddenMobile");
  filterForm.classList.add("hiddenMobile");
  mobileFilterBar.classList.remove("hiddenMobile");
  stickersSlider.classList.remove("hiddenMobile");
});

mobileFilterBar.addEventListener("click", () => {
  catchphrase.classList.remove("hiddenMobile");
  filterForm.classList.remove("hiddenMobile");
  mobileFilterBar.classList.add("hiddenMobile");
  stickersSlider.classList.add("hiddenMobile");
});

// Restaurant Presentation Article Feature
// ---------------------------------------

const body = document.querySelector("body");

const antilopeArticle = document.getElementById("antilopeArticle");
const casaArticle = document.getElementById("casaArticle");
const nonabatArticle = document.getElementById("nonabatArticle");
const kingArticle = document.getElementById("kingArticle");
const greenArticle = document.getElementById("greenArticle");
const schnellArticle = document.getElementById("schnellArticle");
const jackpotArticle = document.getElementById("jackpotArticle");
const courseArticle = document.getElementById("courseArticle");
const lotusArticle = document.getElementById("lotusArticle");
const bamacoArticle = document.getElementById("bamacoArticle");

const presentationWindow = document.createElement("div");
presentationWindow.setAttribute("id", "presentationWindow");
const returnButtons = document.querySelectorAll(".returnButton");

antilopeSticker.addEventListener("click", () => {
  body.appendChild(presentationWindow);
  presentationWindow.appendChild(antilopeArticle);
});

for (let returnButton of returnButtons) {
  returnButton.addEventListener("click", () => {
    while (presentationWindow.firstChild) {
      presentationWindow.removeChild(presentationWindow.firstChild);
    }
    body.removeChild(presentationWindow);
  });
}