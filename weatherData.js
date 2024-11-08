export async function weatherDataMain(tempUnit) {
    console.log('Loaded weatherData.js');
  
    const placeOptions = ["Taipei, Taiwan", "11555"]
    const place = placeOptions[0];

    const fullJson = await query(place, tempUnit);

    var location = document.getElementById("location");
    location.innerHTML = fullJson['address'];

    var currTemp = document.getElementById("currTemp");
    currTemp.innerHTML = fullJson['currentConditions']['temp'] + "°";

    var feelslike = document.getElementById("feelslike");
    feelslike.innerHTML = "Feelslike: " + fullJson['currentConditions']['feelslike'] + "°";

    var highLow = document.getElementById("highLow");
    highLow.innerHTML = "High: " + fullJson['days']['0']['tempmax'] + "°  Low: " + fullJson['days']['0']['tempmin'] + "°";

    let currHour = Math.floor(convertToDecimalHour(fullJson['currentConditions']['datetime']));
    console.log("currHour is " + currHour)

    function convertToDecimalHour(timeString) {
        const [hour, minute, second] = timeString.split(':').map(Number);
        return hour + minute / 60 + second / 3600;
    }

    function hourIteration(i) {
        return (currHour+i <= 23) ? currHour+i : currHour+i-24;
    }

    var time = document.getElementById("time0");
    var temp = document.getElementById("temp0");
    var rain = document.getElementById("rain0");
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

async function query(location, tempUnit) {
    if (tempUnit === "celsius") {
        tempUnit = "metric";
    }
    else {
        tempUnit = "us";
    }

    const results = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+ location +"/today/tomorrow?unitGroup=" + tempUnit + "&key=98SKB8XS5PMLGFBLEPRHNSZAK&current");
    const fullJson = await results.json();
    console.log("here is fullJson; 0");
    console.log(fullJson);

    console.log(fullJson['address']);
    return fullJson;
}