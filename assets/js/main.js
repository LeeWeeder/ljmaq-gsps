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

