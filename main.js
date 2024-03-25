// Create restaurant class
// -----------------------
const presentationWindow = document.createElement("div");
presentationWindow.setAttribute("id", "presentationWindow");

class Restaurant {
  constructor(slug) {
    this.slug = slug;
    this.sticker = document.getElementById(`${this.slug}Sticker`);
    this.article = document.getElementById(`${this.slug}Article`);

    this.sticker.addEventListener("click", () => {
      document.body.appendChild(presentationWindow);
      presentationWindow.appendChild(this.article);
    });

    this.rating = this.article.children[1].children[1].textContent.length;
    this.tags = this.article.children[2].children[0].textContent
      .trim()
      .substring(7)
      .split(", ");
    this.proximity = parseInt(this.article.children[5].children[0].textContent);
    this.price = parseInt(this.article.children[5].children[1].textContent);
    this.vegan = this.idVegan();
    this.service = this.article.children[2].children[4].textContent
      .trim()
      .substring(10)
      .split(", ");
    this.upButton = this.article.children[4].children[0].children[0];
    this.downButton = this.article.children[4].children[1].children[0];
    this.pictures = [
      this.article.children[4].children[2].children[0],
      this.article.children[4].children[2].children[1],
      this.article.children[4].children[2].children[2],
    ];
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

const stickers = document.getElementById("stickersGrid");

let stickerResults = [];

let selection = restaurants.slice();

selection.sort((a, b) => b.rating - a.rating);

while (selection.length > 10) {
  selection.pop();
}

for (let select of selection) {
  stickerResults.push(select.sticker);
}

for (let i = 0; i < stickerResults.length; i++) {
  stickerResults[i].classList.add(`slot${i + 1}`);
  stickers.appendChild(stickerResults[i]);
}

function topRestaurants() {
  stickerResults = [];

  while (stickers.firstChild) {
    stickers.removeChild(stickers.firstChild);
  }

  selection = restaurants.slice();
  const proximity = document.getElementById("proximitySelect").value;
  selection = selection.filter((restaurant) => {
    switch (proximity) {
      case "proximity1":
        return restaurant.proximity >= 0;
      case "proximity2":
        return restaurant.proximity >= 1;
      case "proximity3":
        return restaurant.proximity >= 2;
      case "proximity4":
        return restaurant.proximity >= 3;
      default:
        return true;
    }
  });

  const veggie = document.getElementById("veggieSelect").value;
  selection = selection.filter((restaurant) => {
    switch (veggie) {
      case "veggie1":
        return restaurant.vegan >= 0;
      case "veggie2":
        return restaurant.vegan >= 1;
      case "veggie3":
        return restaurant.vegan >= 2;
      case "veggie4":
        return restaurant.vegan >= 3;
      default:
        return true;
    }
  });

  const budget = document.getElementById("budgetSelect").value;
  selection = selection.filter((restaurant) => {
    switch (budget) {
      case "budget1":
        return restaurant.price >= 0;
      case "budget2":
        return restaurant.price >= 1;
      case "budget3":
        return restaurant.price >= 2;
      case "budget4":
        return restaurant.price >= 3;
      default:
        return true;
    }
  });

  let types = [];
  document.querySelectorAll("#restaurantTypes div").forEach((type) => {
    if (type.children[0].checked) {
      types.push(type.children[1].textContent);
    }
  });

  selection = selection.filter((restaurant) => {
    let result = false;
    for (let type of types) {
      for (let tag of restaurant.tags) {
        if (type === tag) {
          result = true;
        }
      }
    }
    return result;
  });

  let services = [];
  document.querySelectorAll("#modalities div").forEach((service) => {
    if (service.children[0].checked) {
      services.push(service.children[1].textContent);
    }
  });

  selection = selection.filter((restaurant) => {
    let result = false;
    for (let service of services) {
      for (let serve of restaurant.service) {
        if (service === serve) {
          result = true;
        }
      }
    }
    return result;
  });

  selection.sort((a, b) => b.rating - a.rating);

  while (selection.length > 10) {
    selection.pop();
  }

  for (let select of selection) {
    stickerResults.push(select.sticker);
  }

  results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  for (let restaurant of restaurants) {
    restaurant.sticker.classList.remove(
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

  for (let i = 0; i < stickerResults.length; i++) {
    stickerResults[i].classList.add(`slot${i + 1}`);
    stickers.appendChild(stickerResults[i]);
  }
}

// Stickers Slider Feature
// -----------------------

const leftSticker = document.getElementById("leftSticker");
const rightSticker = document.getElementById("rightSticker");

let results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
  console.log("Left");
  stickerSlide(1);
});

rightSticker.addEventListener("click", () => {
  console.log("Right");
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
  topRestaurants();
  if (stickerResults.length > 0) {
    catchphrase.classList.add("hiddenMobile");
    filterForm.classList.add("hiddenMobile");
    mobileFilterBar.classList.remove("hiddenMobile");
    stickersSlider.classList.remove("hiddenMobile");
  } else {
    // Afficher modal message qui va avec
  }
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

// Gallery Slider Feature
// ----------------------

let turns = [1, 2, 3];

function gallerySlide(restaurant, direction) {
  for (let picture of restaurant.pictures) {
    picture.classList.remove("spot1", "spot2", "spot3");
  }

  turns[0] = turns[0] + direction;
  if (turns[0] < 1) turns[0] = 3;
  if (turns[0] > 3) turns[0] = 1;
  for (let i = 1; i < 3; i++) {
    turns[i] = turns[i - 1] + 1;
    if (turns[i] > 3) turns[i] = 1;
  }

  for (let i = 0; i < restaurant.pictures.length; i++) {
    restaurant.pictures[i].classList.add("spot" + turns[i]);
  }
}

for (let restaurant of restaurants) {
  restaurant.upButton.addEventListener("click", () => {
    gallerySlide(restaurant, 1);
  });
  restaurant.downButton.addEventListener("click", () => {
    gallerySlide(restaurant, -1);
  });
}

// Home Button Feature
// -------------------

const homeButton = document.getElementsByClassName("item")[0];

homeButton.addEventListener("click", () => {});
