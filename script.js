


const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const selectMovie = document.getElementById("movie");
let count = document.getElementById("count");
let total = document.getElementById("total");

populateUI();
let ticketPrice = +selectMovie.value;

function setMovieData(movieIndex, moviePrice) {
localStorage.setItem("selectedMovieIndex", movieIndex);
localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateCountAndTotal() {
let selectedSeatsCount = document.querySelectorAll(".row .seat.selected");
count.innerHTML = selectedSeatsCount.length;
ticketPrice
    ? (total.innerText = selectedSeatsCount.length * ticketPrice)
    : (total.innerText = " => Please select a movie");


const seatsIndex = [...selectedSeatsCount].map((seat) =>


    [...seats].indexOf(seat)
);
localStorage.setItem("seatIndex", JSON.stringify(seatsIndex));
}


function populateUI() {
const selectedSeats = JSON.parse(localStorage.getItem("seatIndex"));

if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {

if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
}
    });
}
const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

if (selectedMovieIndex !== null) {
    
    selectMovie.selectedIndex = selectedMovieIndex;
}
}

selectMovie.addEventListener("change", (e) => {
ticketPrice = +e.target.value;
setMovieData(e.target.selectedIndex, e.target.value);
updateCountAndTotal();
});

container.addEventListener("click", (e) => {
if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
) {
    e.target.classList.toggle("selected");

    updateCountAndTotal();
}
});


updateCountAndTotal();
