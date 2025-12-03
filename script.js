// script.js

// Grab elements from the DOM
const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location p:nth-child(1)");
const dateandTimeField = document.querySelector(".time_location p:nth-child(2)");
const conditionField = document.querySelector(".condition p:nth-child(2)");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

// When form is submitted, search for that location
form.addEventListener("submit", searchForLocation);

// Default city
let target = "Lucknow";

const fetchResults = async (targetLocation) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=b22ad9e573ab46208dd104824250312&q=${encodeURIComponent(
      targetLocation
    )}&aqi=no`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Location not found");
    }

    const data = await res.json();

    console.log(data);

    const locationName = data.location.name;
    const time = data.location.localtime; // e.g. "2025-12-03 15:44"
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;

    updateDetails(temp, locationName, time, condition);
  } catch (error) {
    console.error(error);
    alert("Could not fetch weather. Please check the city name.");
  }
};

function updateDetails(temp, locationName, time, condition) {
  // Fix: use split, not spilt
  const splitDate = time.split(" ")[0]; // "2025-12-03"
  const splitTime = time.split(" ")[1]; // "15:44"
  const currentDay = getDayName(new Date(splitDate).getDay());

  temperatureField.innerText = `${temp}°C`;
  locationField.innerText = locationName;
  dateandTimeField.innerText = `${splitTime} - ${currentDay} ${splitDate}`;
  conditionField.innerText = condition;
}

function searchForLocation(e) {
  e.preventDefault();

  const newLocation = searchField.value.trim();
  if (!newLocation) return;

  target = newLocation;
  fetchResults(target);
  searchField.value = "";
}

// Load default city on page load
fetchResults(target);

function getDayName(number) {
  switch (number) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "";
  }
}
