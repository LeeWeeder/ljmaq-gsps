const gspsGrid = document.getElementById("gsps-grid");
const gsps = document.getElementById("gsps");

let isGSPSGridClicked = false;

gsps.addEventListener("click", () => {
  if (!isGSPSGridClicked) {
    gspsGrid.classList.add('move');
    isGSPSGridClicked = true;
  } else {
    gspsGrid.classList.remove('move');
    isGSPSGridClicked = false;
  }
});

const fullName = document.getElementById("full-name");

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");

let isFirstNameMovedUp = false;
let isLastNameMovedUp = false;

function move(namePartGrid, state) {
  if (state) {
    namePartGrid.classList.remove("move-up");
    return !state;
  }

  namePartGrid.classList.add("move-up");
  return !state;
}

firstName.addEventListener("click", () => {
  isFirstNameMovedUp = move(firstName, isFirstNameMovedUp);
  showFullName();
})

lastName.addEventListener("click", () => {
  isLastNameMovedUp = move(lastName, isLastNameMovedUp);
  showFullName();
})

function showFullName() {
  if (isFirstNameMovedUp && isLastNameMovedUp) {
    fullName.classList.remove("hidden");
  } else {
    fullName.classList.add("hidden");
  }
}

fullName.addEventListener("click", () => {
  fullName.classList.add("hidden");
  isFirstNameMovedUp = move(firstName, isFirstNameMovedUp);
  isLastNameMovedUp = move(lastName, isLastNameMovedUp);
})

const handleMouseEvent = e => {
  const { currentTarget: target } = e;

  const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left;
  y = e.clientY - rect.top;

  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
}


for (const grid of document.querySelectorAll(".grid")) {
  grid.onmousemove = e => handleMouseEvent(e);
}

const contactDialog = document.getElementById("contact-dialog");
contactDialog.onmousemove = e => handleMouseEvent(e);

function openDialog() {
  contactDialog.showModal();
}

function closeDialog() {
  setTimeout(() => {
    contactDialog.close();
  }, 100);
}

let screen = document.querySelector("body");

function setGridSize() {
  let screenWidth = screen.offsetWidth;
  let screenHeight = screen.offsetHeight;
  let gridSize;
  if (screenWidth < screenHeight) {
    gridSize = 0.30 * screenWidth;
  } else {
    gridSize = 0.30 * screenHeight;
  }
  document.documentElement.style.setProperty("--grid-dimension", `${gridSize}px`);
}

setGridSize();

new ResizeObserver(setGridSize).observe(screen);