const mobileNavigation = document.querySelector(".mobile-navigation");
const burger = document.querySelector(".burger");
const nav = document.querySelectorAll(".navigation");
const sliderPets = document.querySelector(".slider-pets");
const numberPage = document.querySelector(".slider-controls-current");
const next = document.querySelector(".slider-controls-next");
const end = document.querySelector(".slider-controls-end");
const prev = document.querySelector(".slider-controls-prev");
const start = document.querySelector(".slider-controls-start");
const containerPopUp = document.querySelector(".container-popup");
const popUp = document.querySelector(".popup");
const body = document.querySelector("body");

const getRandomInt = () => Math.floor(Math.random() * 8);
let randomItemsAll = [];
let currentPage = 0;

burger.addEventListener("click", () => {
  mobileNavigation.classList.toggle("active");
  burger.classList.toggle("active");
  nav[1].classList.toggle("open");
  body.classList.toggle("overflow");
});

mobileNavigation.addEventListener("click", (e) => {
  if (
    e.target.classList.contains(".burger") ||
    (e.target.classList.contains("mobile-navigation") &&
      e.target.classList.contains("active"))
  ) {
    mobileNavigation.classList.toggle("active");
    burger.classList.toggle("active");
    nav[1].classList.toggle("open");
    body.classList.toggle("overflow");
  }

  if (e.target.tagName === "A") {
    event.preventDefault();
    mobileNavigation.classList.toggle("active");
    burger.classList.toggle("active");
    nav[1].classList.toggle("open");
    body.classList.toggle("overflow");
    setTimeout(() => {
      location.href = e.target.href;
    }, 900);
  }
});

function getRandomItems() {
  console.log("hello");
  for (let i = 0; i < 6; i++) {
    let randomItems = [];
    for (let i = 0; i < 8; i++) {
      const random = getRandomInt();
      if (randomItems.includes(random)) {
        --i;
        continue;
      }
      randomItems.push(random);
    }
    randomItemsAll.push(...randomItems);
  }
}

function getNumberPage() {
  currentPage = Number(numberPage.textContent);
}

async function startPagination() {
  const pets = "pets.json";
  const res = await fetch(pets);
  const data = await res.json();
  for (i = 0; i < randomItemsAll.length; i++) {
    let div = document.createElement("div");
    div.classList.add("slider-item");
    div.dataset.id = randomItemsAll[i];
    div.innerHTML = `<img src="${data[randomItemsAll[i]].img}" alt="img_pets" />
          <h3 class="item-title">${data[randomItemsAll[i]].name}</h3>
          <button class="item-button">Learn more</button>`;
    sliderPets.append(div);
  }
}

next.addEventListener("click", () => {
  if (currentPage === 6) {
    next.disabled = true;
    return;
  }
  sliderPets.classList.add(`transform-right-${currentPage}`);
  next.disabled = true;
  setTimeout(() => {
    sliderPets.classList.remove(`transform-right-${currentPage - 2}`);
    next.disabled = false;
  }, 1000);
  currentPage += 1;
  numberPage.textContent = currentPage;
  prev.classList.add("active");
  start.classList.add("active");
  if (currentPage === 6) {
    next.classList.remove("active");
    end.classList.remove("active");
  }
});

end.addEventListener("click", () => {
  if (currentPage === 6) {
    return;
  }
  currentPage = 6;
  numberPage.textContent = currentPage;
  sliderPets.classList.add(`transform-right-5`);
  prev.classList.add("active");
  start.classList.add("active");
  if (currentPage === 6) {
    next.classList.remove("active");
    end.classList.remove("active");
  }
});

prev.addEventListener("click", () => {
  if (currentPage === 1) {
    return;
  }
  sliderPets.classList.add(`transform-right-${currentPage - 2}`);
  prev.disabled = true;
  setTimeout(() => {
    sliderPets.classList.remove(`transform-right-${currentPage}`);
    prev.disabled = false;
  }, 100);
  currentPage -= 1;
  numberPage.textContent = currentPage;
  next.classList.add("active");
  end.classList.add("active");
  if (currentPage === 1) {
    prev.classList.remove("active");
    start.classList.remove("active");
  }
});

start.addEventListener("click", () => {
  if (currentPage === 1) {
    return;
  }
  sliderPets.classList.add(`transform-right-0`);
  setTimeout(() => {
    sliderPets.classList.remove(`transform-right-${currentPage - 1}`);
    prev.disabled = false;
    currentPage = 1;
    numberPage.textContent = currentPage;
  }, 100);
  next.classList.add("active");
  end.classList.add("active");
  prev.classList.remove("active");
  start.classList.remove("active");
});

sliderPets.addEventListener("click", async (e) => {
  if (e.target.classList.value === "slider") {
    return;
  }
  let id = e.target.closest(".slider-item").dataset.id;
  const pets = "pets.json";
  const res = await fetch(pets);
  const data = await res.json();
  containerPopUp.classList.add("active");
  body.classList.add("overflow");
  popUp.innerHTML = `<img src="${data[id].img}" alt="${data[id].name}" />
    <div class="popup-content">
      <div class="popup-name">${data[id].name}</div>
      <div class="popup-type"><span>${data[id].type}</span><span>${data[id].breed}</span></div>
      <div class="popup-description">${data[id].description}</div>
      <ul class="popup-items">
        <li class="popup-item">Age: <span>${data[id].age}</span></li>
        <li class="popup-item">Inoculations: <span>${data[id].inoculations}</span></li>
        <li class="popup-item">Diseases: <span>${data[id].diseases}</span></li>
        <li class="popup-item">Parasites: <span>${data[id].parasites}</span></li>
      </ul>
      <button class="popup-button"></button>
    </div>`;
});

containerPopUp.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("popup-button") ||
    e.target.classList.contains("container-popup")
  ) {
    containerPopUp.classList.remove("active");
    body.classList.remove("overflow");
  }
});

getRandomItems();
startPagination();
getNumberPage();
