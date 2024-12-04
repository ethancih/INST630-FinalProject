let dataDisplay;
let tempUnit = "celsius"; // Default temperature unit
let place = "College Park, MD, US"; // Default location

// Executes mainEvent() when the page loads or reloads
document.addEventListener("DOMContentLoaded", async () => mainEvent());

async function mainEvent() {

  // Dynamically import modules
  dataDisplay = await import("./dataDisplay.js");
  const animation = await import("./animation.js");

  // Run default animation
  animation.defaultAnimation();

  // Check the URL for existing parameters
  const params = new URLSearchParams(window.location.search);
  // Update tempUnit and place from URL or set defaults
  tempUnit = params.get("tempUnit") || tempUnit;
  place = params.get("place") || place;
  // Update the weather display with the current parameters
  dataDisplay.updateDisplay(tempUnit, place, false, false);
}

/////////////////////////////////////////////////////////////////////////////////////////
//////////////////// v For Changing the temperature unit and place v ////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// Event listener for the place drop-down select box
const selectBox = document.getElementById("selectBox");
selectBox.addEventListener("change", () => {
  // Grab the selected place from the dropdown
  place = selectBox.value;

  // Check if a valid location was selected
  if (!place || place === "Choose a location") {
    // console.log("No valid location selected.");
    return; // Don't update if no valid location is selected
  }

  console.log(`Selected place: ${place}`);

  // Update the URL and display
  updateURL("place", place);
  dataDisplay.updateDisplay(tempUnit, place, true, false);
});

// Event listener for the temperature unit change button
document.getElementById("tempUnitSelect").addEventListener("click", () => {
  // Toggle between celsius and fahrenheit
  tempUnit = (tempUnit === "celsius") ? "fahrenheit" : "celsius";

  console.log(`Changed temperature unit to: ${tempUnit}`);

  // Update the URL and display
  updateURL("tempUnit", tempUnit);
  dataDisplay.updateDisplay(tempUnit, place, false, true);

  if (tempUnit === "celsius") {
    document.getElementById("tempUnitSelect").innerHTML = "Change to °F";
  }
  else {
    document.getElementById("tempUnitSelect").innerHTML = "Change to °C";
  }
  
});

// Function to update the URL with new query parameters
function updateURL(param, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(param, value);
  history.replaceState(null, "", url); // Update the URL without reloading the page
}
