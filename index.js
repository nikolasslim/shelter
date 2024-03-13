const mobileNavigation = document.querySelector(".mobile-navigation");
const burger = document.querySelector(".burger");
const nav = document.querySelectorAll(".navigation");
const body = document.querySelector("body");
const slider = document.querySelector(".slider");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const containerPopUp = document.querySelector(".container-popup");
const popUp = document.querySelector(".popup");

const getRandomInt = () => Math.floor(Math.random() * 8);
let prevClickedButton = "";
let prevDivs = [];
let prevState = [];
let currentState = [];
let activeItems = 0;
let currentWidth = document.body.clientWidth;

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

async function startSlider() {
  slider.innerHTML = "";
  prevState = [];
  currentState = [];
  const pets = "pets.json";
  const res = await fetch(pets);
  const data = await res.json();
  for (let i = 0; i < activeItems; i++) {
    const random = getRandomInt();
    if (prevState.includes(random)) {
      --i;
      continue;
    }
    prevState.push(random);
    let div = document.createElement("div");
    div.classList.add("slider-item");
    div.dataset.id = random;
    div.innerHTML = `<img src="${data[random].img}" alt="img_pets" />
      <h3 class="item-title">${data[random].name}</h3>
      <button class="item-button">Learn more</button>`;
    slider.append(div);
  }
}

async function addNextItems() {
  if (prevClickedButton === "prev") {
    prevState = prevDivs.map((el) => Number(el.dataset.id));
    slider.append(...prevDivs);
    return;
  }
  const pets = "pets.json";
  const res = await fetch(pets);
  const data = await res.json();
  for (let i = 0; i < activeItems; i++) {
    const random = getRandomInt();
    if (prevState.includes(random) || currentState.includes(random)) {
      --i;
      continue;
    }
    currentState.push(random);
    let div = document.createElement("div");
    div.classList.add("slider-item");
    div.dataset.id = random;
    div.innerHTML = `<img src="${data[random].img}" alt="img_pets" />
      <h3 class="item-title">${data[random].name}</h3>
      <button class="item-button">Learn more</button>`;
    slider.append(div);
  }
  prevState = [...currentState];
  currentState = [];
}

async function addPrevItems() {
  if (prevClickedButton === "next") {
    prevState = prevDivs.map((el) => Number(el.dataset.id));
    slider.prepend(...prevDivs);
    return;
  }
  const pets = "pets.json";
  const res = await fetch(pets);
  const data = await res.json();
  for (let i = 0; i < activeItems; i++) {
    const random = getRandomInt();
    if (prevState.includes(random) || currentState.includes(random)) {
      --i;
      continue;
    }
    currentState.push(random);
    let div = document.createElement("div");
    div.classList.add("slider-item");
    div.dataset.id = random;
    div.innerHTML = `<img src="${data[random].img}" alt="img_pets" />
      <h3 class="item-title">${data[random].name}</h3>
      <button class="item-button">Learn more</button>`;
    slider.prepend(div);
  }
  prevState = [...currentState];
  currentState = [];
}

prev.addEventListener("click", () => {
  addPrevItems();
  slider.classList.add("transform-left");
  prev.disabled = true;
  setTimeout(() => {
    let sliderItems = document.querySelectorAll(".slider-item");
    slider.classList.remove("transform-left");
    prevDivs = [];
    for (let i = sliderItems.length - 1; i > activeItems - 1; i--) {
      prevDivs.unshift(sliderItems[i]);
      sliderItems[i].remove();
    }
    prev.disabled = false;
    prevClickedButton = "prev";
  }, 1000);
});

next.addEventListener("click", () => {
  addNextItems();
  slider.classList.add("transform-right");
  next.disabled = true;
  setTimeout(() => {
    let sliderItems = document.querySelectorAll(".slider-item");
    slider.classList.remove("transform-right");
    prevDivs = [];
    for (let i = 0; i < activeItems; i++) {
      prevDivs.push(sliderItems[i]);
      sliderItems[i].remove();
    }
    next.disabled = false;
    prevClickedButton = "next";
  }, 1000);
});

function changeActiveItems() {
  if (currentWidth > 1070) {
    activeItems = 3;
    
  } else if (currentWidth > 760) {
    activeItems = 2;
    
  } else {
    activeItems = 1;
  
  }
}

const resizeHandler = () => {
  currentWidth = document.body.clientWidth;
  changeActiveItems();
  startSlider();
};

function debounce(f, ms) {
  let isCooldown = false;
  return function () {
    if (isCooldown) return;
    f.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => (isCooldown = false), ms);
  };
}

slider.addEventListener("click", async (e) => {
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

const debouncedResizeHandler = debounce(resizeHandler, 1000);

window.addEventListener("resize", debouncedResizeHandler);

changeActiveItems();
startSlider();

console.log(`Итого: 110`);
