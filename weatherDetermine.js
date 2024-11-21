let weather;

export function weatherDetermine(fullJson) {
    console.log("weatherDetermine() executed.")
    weather = "Rainy"
    return weather;
}

export function currWeather() {
    console.log("currWeather() executed.")
    return weather;
}