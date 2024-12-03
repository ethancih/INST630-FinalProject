const weatherArray = ["Sunny", "Rainy", "Cloudy", "Snowy"]
let fullJson;
let data =  {   "weather": "", "location": "", "localTime": "", "currTemp": "", "currTemp_high": "", "currTemp_low": "",
                "feelslike": "", "feelslike_high": "", "feelslike_low": "", "time": [], "temp": [], "rain": []
            };
let currHour;

export async function weatherDataMain(tempUnit, place) {
    console.log('Loaded weatherData.js');

    console.log("This is weatherDataMain()")
    fullJson = await query(tempUnit, place);

    const weatherDetermine = await import("./weatherDetermine.js");
    data["weather"] = await weatherArray[weatherDetermine.weatherDetermine(fullJson)];
    data["location"] = fullJson['address'];
    data["localTime"] = formatDateAndTime(fullJson['days'][0]['datetime'], fullJson['currentConditions']["datetime"]) + " (UTC" + (fullJson['tzoffset'] >= 0 ? "+" : "") + fullJson['tzoffset'] + ")";
    data["currTemp"] = fullJson['currentConditions']['temp'].toFixed(1) + "°";
    data["currTemp_high"] = fullJson['days'][0]['tempmax'].toFixed(1) + "°";
    data["currTemp_low"] = fullJson['days'][0]['tempmin'].toFixed(1) + "°";
    data["feelslike"] = fullJson['currentConditions']['feelslike'].toFixed(1) + "°";
    data["feelslike_high"] = fullJson['days'][0]['feelslikemax'].toFixed(1) + "°";
    data["feelslike_low"] = fullJson['days'][0]['feelslikemin'].toFixed(1) + "°";

    ////////////////////////////////////////////////////////////////////
    //////////////////// v For handling the table v ////////////////////
    ////////////////////////////////////////////////////////////////////

    currHour = Math.floor(convertToDecimalHour(fullJson['currentConditions']['datetime']));

    function convertToDecimalHour(timeString) {
        const [hour, minute, second] = timeString.split(':').map(Number);
        return hour + minute / 60 + second / 3600;
    }

    function hourIteration(i) {
        return (currHour+i <= 23) ? currHour+i : currHour+i-24;
    }

    for (let i = 0; i < 6; i++) {
        data["time"][i] = hourIteration(i);
        if (currHour+i <= 23) {
            data["temp"][i] = fullJson['days']['0']['hours'][hourIteration(i)]['temp'] + "°";
            data["rain"][i] = Math.round(fullJson['days']['0']['hours'][hourIteration(i)]['precipprob']/10)*10 + "%";
        }
        else {
            data["temp"][i] = fullJson['days']['1']['hours'][hourIteration(i)]['temp'] + "°";
            data["rain"][i] = Math.round(fullJson['days']['1']['hours'][hourIteration(i)]['precipprob']/10)*10 + "%";
        }
    }
    data["time"][0] = "Now";

    console.table(data);
}

export function updateWeatherData() {
    document.getElementById("weather").innerHTML = data["weather"];
    document.getElementById("location").innerHTML = data["location"];
    document.getElementById("localTime").innerHTML = data["localTime"];
    document.getElementById("currTemp").innerHTML = data["currTemp"];
    document.getElementById("currTemp_high").innerHTML = data["currTemp_high"];
    document.getElementById("currTemp_low").innerHTML = data["currTemp_low"];
    document.getElementById("feelslike").innerHTML = data["feelslike"];
    document.getElementById("feelslike_high").innerHTML = data["feelslike_high"];
    document.getElementById("feelslike_low").innerHTML = data["feelslike_low"];

    ////////////////////////////////////////////////////////////////////
    //////////////////// v For handling the table v ////////////////////
    ////////////////////////////////////////////////////////////////////

    let time = document.getElementById("time0");
    let temp = document.getElementById("temp0");
    let rain = document.getElementById("rain0");
    for (let i = 0; i < 6; i++) {
        time = document.getElementById("time"+i);
        time.innerHTML = data["time"][i]

        temp = document.getElementById("temp"+i);
        rain = document.getElementById("rain"+i);
        if (currHour+i <= 23) {
            temp.innerHTML = data["temp"][i];
            rain.innerHTML = data["rain"][i];
        }
        else {
            temp.innerHTML = data["temp"][i];
            rain.innerHTML = data["rain"][i];
        }
    }
    time = document.getElementById("time0");
    time.innerHTML = data["time"][0];
}

async function query(tempUnit, location) {
    if (tempUnit === "celsius") {
        tempUnit = "metric";
    }
    else {
        tempUnit = "us";
    }

    const results = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+ location +"/today/tomorrow?unitGroup=" + tempUnit + "&key=UYVW7XN8HWS29VJ3ECRHMGLF2&current");
    const fullJson = results.json();
    console.log("here is fullJson; 0");
    console.log(fullJson);

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
