let weather;

export function weatherDetermine(fullJson) {
    console.log("weatherDetermine() executed.");

    let cloudCover = fullJson['currentConditions']['cloudcover'];

    let precipType = fullJson['currentConditions']['preciptype'] ? fullJson['currentConditions']['preciptype'][0] : 0;
    let rain = precipType === "rain" ? 100 : 0;
    let snow = precipType === "snow" ? 100 : 0;

    if (precipType === 0) {
        if (cloudCover > 50) {
            weather = 2; //Cloudy
        }
        else {
            weather = 0; //Sunny
        }
    }
    else if (rain > 0) {
        weather = 1; //Rainy
    }
    else if (snow > 0) {
        weather = 3; //Snowy
    }
    else {
        console.error("No suitable weather");
        weather = 0; //Sunny
    }

    console.log("weatherDetermine() says weather = " + weather);
    return weather;
}

export async function waitForWeather() {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (weather !== undefined) {
                clearInterval(interval);
                resolve(weather);
            }
        }, 50); // Check every 50ms
    });
}

export function currWeather() {
    console.log("currWeather() executed.");
    return weather;
}