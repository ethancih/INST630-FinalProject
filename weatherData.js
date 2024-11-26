
const weatherArray = ["Sunny", "Rainy", "Cloudy", "Snowy"]
let fullJson;

export async function getFullJson() {
    if (!fullJson) {
        console.error("This is getFullJson()")
        fullJson = await query(tempUnit, place);
    }
    return fullJson;
}

export async function weatherDataMain(tempUnit, place) {
    console.log('Loaded weatherData.js');

    console.error("This is weatherDataMain()")
    fullJson = await query(tempUnit, place);

    const weatherDetermine = await import("./weatherDetermine.js");
    document.getElementById("weather").innerHTML = weatherArray[weatherDetermine.weatherDetermine(fullJson)];

    document.getElementById("location").innerHTML = fullJson['address'];

    document.getElementById("localTime").innerHTML = formatDateAndTime(fullJson['days'][0]['datetime'], fullJson['currentConditions']["datetime"]) + " (UTC" + (fullJson['tzoffset'] >= 0 ? "+" : "") + fullJson['tzoffset'] + ")";

    document.getElementById("currTemp").innerHTML = fullJson['currentConditions']['temp'] + "°";

    document.getElementById("currTemp_high").innerHTML = fullJson['days'][0]['tempmax'] + "°";

    document.getElementById("currTemp_low").innerHTML = fullJson['days'][0]['tempmin'] + "°";

    document.getElementById("feelslike").innerHTML = fullJson['currentConditions']['feelslike'] + "°";

    document.getElementById("feelslike_high").innerHTML = fullJson['days'][0]['feelslikemax'] + "°";

    document.getElementById("feelslike_low").innerHTML = fullJson['days'][0]['feelslikemin'] + "°";

    ////////////////////////////////////////////////////////////////////
    //////////////////// v For handling the table v ////////////////////
    ////////////////////////////////////////////////////////////////////

    let currHour = Math.floor(convertToDecimalHour(fullJson['currentConditions']['datetime']));
    // console.log("currHour is " + currHour)

    function convertToDecimalHour(timeString) {
        const [hour, minute, second] = timeString.split(':').map(Number);
        return hour + minute / 60 + second / 3600;
    }

    function hourIteration(i) {
        return (currHour+i <= 23) ? currHour+i : currHour+i-24;
    }

    let time = document.getElementById("time0");
    let temp = document.getElementById("temp0");
    let rain = document.getElementById("rain0");
    for (let i = 0; i < 6; i++) {
        time = document.getElementById("time"+i);
        time.innerHTML = hourIteration(i);

        temp = document.getElementById("temp"+i);
        rain = document.getElementById("rain"+i);
        if (currHour+i <= 23) {
            temp.innerHTML = fullJson['days']['0']['hours'][hourIteration(i)]['temp'] + "°";
            rain.innerHTML = Math.round(fullJson['days']['0']['hours'][hourIteration(i)]['precipprob']/10)*10 + "%";
        }
        else {
            temp.innerHTML = fullJson['days']['1']['hours'][hourIteration(i)]['temp'] + "°";
            rain.innerHTML = Math.round(fullJson['days']['1']['hours'][hourIteration(i)]['precipprob']/10)*10 + "%";
        }

        console.log(hourIteration(i));
    }
    time = document.getElementById("time0");
    time.innerHTML = "Now";
}

async function query(tempUnit, location) {
    if (tempUnit === "celsius") {
        tempUnit = "metric";
    }
    else {
        tempUnit = "us";
    }

    const results = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+ location +"/today/tomorrow?unitGroup=" + tempUnit + "&key=UYVW7XN8HWS29VJ3ECRHMGLF2&current");
    const fullJson = await results.json();
    console.log("here is fullJson; 0");
    console.log(fullJson);

    // console.log(fullJson['address']);
    return fullJson;
}

function formatDateAndTime(dateStr, timeStr) {
    // Combine the date and time into a single ISO string
    const isoString = `${dateStr}T${timeStr}`;

    // Create a Date object
    const date = new Date(isoString);

    // Get the day of the week
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[date.getDay()];

    // Format the date to "yyyy/mm/dd"
    const formattedDate = dateStr.replace(/-/g, "/");

    // Process the time string
    const [hours, minutes] = timeStr.split(":"); // Split only hours and minutes
    const formattedTime = `${parseInt(hours, 10)}:${minutes}`; // Remove leading zero from hours and keep minutes

    // Return the combined result
    return `${formattedDate} ${dayOfWeek} ${formattedTime}`;
}
