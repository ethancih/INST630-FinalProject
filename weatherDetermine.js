let weather;

export function weatherDetermine(fullJson) {
    console.log("weatherDetermine() executed.");
    weather = "Rainy"; // Replace this with actual logic using fullJson
    return weather;
}

export async function waitForWeather() {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (weather !== undefined) {
                clearInterval(interval);
                resolve(weather);
            }
        }, 50); // Check every 100ms
    });
}

export function currWeather() {
    console.log("currWeather() executed.");
    return weather;
}
