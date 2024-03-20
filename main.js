// Create restaurant class
// -----------------------
const presentationWindow = document.createElement("div");
presentationWindow.setAttribute("id", "presentationWindow");

class Restaurant {
  constructor(slug) {
    this.slug = slug;
    this.sticker = document.getElementById(`${this.slug}Sticker`);
    this.article = document.getElementById(`${this.slug}Article`);

    this.sticker.addEventListener('click', () => {
      document.body.appendChild(presentationWindow);
      presentationWindow.appendChild(this.article);
    })

    this.rating = this.article.children[1].children[1].textContent.length;
    this.tags = this.article.children[2].children[0].textContent.trim().substring(7).split(", ");
    this.proximity = parseInt(this.article.children[5].children[0].textContent);
    this.price = parseInt(this.article.children[5].children[1].textContent);
    this.vegan = this.idVegan();
    this.service = this.article.children[2].children[4].textContent.trim().substring(10).split(', ');
  }

  idVegan() {
    switch (this.article.children[2].children[6].textContent) {
      case "Pas de plat végétarien":
        return 0;
      case "Propose quelques plats végétariens":
        return 1;
      case "Propose plusieurs menus végétariens et vegans":
        return 2;
      case "Plats et menus vegans uniquement":
        return 3;
      default:
        break;
    }
  }

}

const slugs = [
  "steaks",
  "rapid",
  "fugiyama",
  "sombrero",
  "endive",
  "mario",
  "louis",
  "empereur",
  "club",
  "antilope",
  "casa",
  "nonabat",
  "king",
  "green",
  "schnell",
  "jackpot",
  "course",
  "lotus",
  "bamako",
  "luigi",
  "ffk",
  "grange",
  "pekin",
  "bistrot",
  "criee",
  "kitchen",
  "etoile",
  "salad",
  "kmburger",
  "gourmandise",
  "soixante",
  "latines",
];

const restaurants = [];
for (let slug of slugs) {
  restaurants.push(new Restaurant(slug));
}

// console.log(restaurants);
const stickerResults = []

function topRestaurants() {

  let selection = restaurants.slice()
  const proximity = document.getElementById('proximitySelect').value
  selection = selection.filter((restaurant) => {
    switch (proximity) {
      case "proximity1":
        return restaurant.proximity >= 0
      case "proximity2":
        return restaurant.proximity >= 1
      case "proximity3":
        return restaurant.proximity >= 2
      case "proximity4":
        return restaurant.proximity >= 3
      default:
        return true
      }
  })

  const veggie = document.getElementById('veggieSelect').value
  selection = selection.filter((restaurant) => {
    switch (veggie) {
      case "veggie1":
        return restaurant.vegan >= 0
      case "veggie2":
        return restaurant.vegan >= 1
      case "veggie3":
        return restaurant.vegan >= 2
      case "veggie4":
        return restaurant.vegan >= 3
      default:
        return true
      }
  })

  const budget = document.getElementById('budgetSelect').value
  selection = selection.filter((restaurant) => {
    switch (budget) {
      case "budget1":
        return restaurant.price >= 0
      case "budget2":
        return restaurant.price >= 1
      case "budget3":
        return restaurant.price >= 2
      case "budget4":
        return restaurant.price >= 3
      default:
        return true
      }
  })

  let types = []
  document.querySelectorAll('#restaurantTypes div').forEach((type) => {
    if (type.children[0].checked) {
      types.push(type.children[1].textContent)
    }
  })

  selection = selection.filter((restaurant) => {
    let result = false
    for (let type of types) {
      for (let tag of restaurant.tags) {
        if (type === tag) {
          result = true
        }
      }
    }
    return result
  })

  let services = []
  document.querySelectorAll('#modalities div').forEach((service) => {
    if (service.children[0].checked) {
      services.push(service.children[1].textContent)
    }
  })

  selection = selection.filter((restaurant) => {
    let result = false
    for (let service of services) {
      for (let serve of restaurant.service) {
        if (service === serve) {
          result = true
        }
      }
    }
    return result
  })

  console.log(selection)
  
}

// console.log(document.getElementById('proximitySelect').value)
topRestaurants()

// Stickers Slider Feature
// -----------------------

const leftSticker = document.getElementById("leftSticker");
const rightSticker = document.getElementById("rightSticker");

// const antilopeSticker = document.getElementById("antilopeSticker");
// const casaSticker = document.getElementById("casaSticker");
// const nonabatSticker = document.getElementById("nonabatSticker");
// const kingSticker = document.getElementById("kingSticker");
// const greenSticker = document.getElementById("greenSticker");
// const schnellSticker = document.getElementById("schnellSticker");
// const jackpotSticker = document.getElementById("jackpotSticker");
// const courseSticker = document.getElementById("courseSticker");
// const lotusSticker = document.getElementById("lotusSticker");
// const bamakoSticker = document.getElementById("bamakoSticker");

// const stickerResults = [
//   antilopeSticker,
//   casaSticker,
//   nonabatSticker,
//   kingSticker,
//   greenSticker,
//   schnellSticker,
//   jackpotSticker,
//   courseSticker,
//   lotusSticker,
//   bamakoSticker,
// ];

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

const returnButtons = document.querySelectorAll(".returnButton");

for (let returnButton of returnButtons) {
  returnButton.addEventListener("click", () => {
    while (presentationWindow.firstChild) {
      presentationWindow.removeChild(presentationWindow.firstChild);
    }
    document.body.removeChild(presentationWindow);
  });
}
