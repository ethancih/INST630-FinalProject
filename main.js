async function mainEvent() {
  console.log('Loaded main.js');

  // imports animation.js then executes the functions inside
  // const weatherData = await import("./weatherData.js");
  // weatherData.weatherDataMain();

  // imports animation.js then executes the functions inside
  const animation = await import("./animation.js");
  animation.defaultAnimation();


  // Run this function on page load
  loadTempUnitFromUrl();
}


//  Executes mainEvent() when the page loads or reloads
document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests

///////////////////////////////////////////////////////////////////////////////
//////////////////// v For Changing the temperature unit v ////////////////////
///////////////////////////////////////////////////////////////////////////////

// Event listener for the temperature unit change button
document.getElementById('tempUnitSelect').addEventListener('click', () => {
  updateTempUnit(); // Call the function to change the temperature unit
});

function getTempUnitFromUrl() {
  const queryString = window.location.search; // Get the query string from the current URL
  const params = new URLSearchParams(queryString);  // Create a URLSearchParams object
  const tempUnit = params.get('tempUnit');  // Get the value of the 'tempUnit' parameter
  return tempUnit ? tempUnit : 'celsius'; // Return the value or a default if it's not set  // default to 'celsius' if not found
}

function updateTempUnit() {
  console.log("changing temp unit");

  // Get the current temperature unit from the URL
  let tempUnit = getTempUnitFromUrl();

  // Toggle between celsius and fahrenheit
  if (tempUnit === "celsius") {
    tempUnit = "fahrenheit";
    console.log("Changing to fahrenheit");
  } else {
    tempUnit = "celsius";
    console.log("Changing to celsius");
  }

  // Update the URL with the new temperature unit
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set("tempUnit", tempUnit);
  history.replaceState(null, "", newUrl);

  // Update the temperature display based on the selected unit
  console.log("Temperature unit set to " + tempUnit);
  updateTemperatureDisplay(tempUnit);
}

// Example function to update temperature display based on the unit
async function updateTemperatureDisplay(tempUnit) {
    // Logic to convert and display temperature based on the selected unit
    if (tempUnit === "celsius") {
      const weatherData = await import("./weatherData.js");
      weatherData.weatherDataMain(tempUnit);
    } else if (tempUnit === "fahrenheit") {
      const weatherData = await import("./weatherData.js");
      weatherData.weatherDataMain(tempUnit);
    }
}

async function loadTempUnitFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const tempUnit = params.get("tempUnit");
  if (tempUnit) {
      console.log("Applying temperature unit: " + tempUnit);
      updateTemperatureDisplay(tempUnit);
  }
}