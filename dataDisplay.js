const weatherData = await import("./weatherData.js");
const animation = await import("./animation.js");

export async function updateDisplay(tempUnit, place, changingScene, changingTempUnit) {
    console.clear();
    console.log("Version: 2024/12/03-23:09")
    console.log("Initial URL query string:", window.location.search);

    // Get the current URL parameters
    let params = new URLSearchParams(window.location.search);

    // Update the URL with the new tempUnit and place
    updateTempUnit(tempUnit);
    updatePlace(place);

    // Update the images with the help of weatherDetermine and call the subsequent animations
    if (changingScene) {
        console.log("Changing scene");
        animation.transAnimation();
    }
    else if (changingTempUnit) {
        console.log("Changing tempUnit");
        animation.animForcedByChangingTempUnit();
        // update the weather data based on the selected unit and place
        weatherData.weatherDataMain(tempUnit, place);  // Call with updated parameters
    }
    else {
        // update the weather data based on the selected unit and place
        weatherData.weatherDataMain(tempUnit, place);  // Call with updated parameters
    }
}

// Function to update the temperature unit in the URL
async function updateTempUnit(tempUnit) {
    console.log("Changing temperature unit");

    // Update the URL with the new temperature unit
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("tempUnit", tempUnit);  // Set the 'tempUnit' query parameter
    history.replaceState(null, "", newUrl);  // Update the browser's URL without reloading

    // Log the updated temperature unit
    console.log("Temperature unit set to " + tempUnit);
}

// Function to update the place in the URL
async function updatePlace(place) {
    console.log("Changing place");

    // Ensure 'place' is valid before updating the URL
    if (place && place !== "undefined" && place !== "Choose a location") {
        // Update the URL with the new place
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set("place", place);  // Set the 'place' query parameter
        history.replaceState(null, "", newUrl);  // Update the browser's URL without reloading

        // Log the updated place
        console.log("Place set to " + place);
    } else {
        console.log("Invalid place value, not updating URL.");
    }
}