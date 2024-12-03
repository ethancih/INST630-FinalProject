console.log('Loaded animation.js');

const weatherDetermine = await import("./weatherDetermine.js");
const weatherData = await import("./weatherData.js");

const backgrounds = [ ["./assets/backgrounds/sunny-01.jpg", "./assets/backgrounds/sunny-02.jpg", "./assets/backgrounds/sunny-03.jpg"],
                      ["./assets/backgrounds/rainy-02.jpg", "./assets/backgrounds/rainy-03.jpg", "./assets/backgrounds/rainy-04.jpg"], 
                      ["./assets/backgrounds/cloudy-02.jpg", "./assets/backgrounds/cloudy-03.jpg", "./assets/backgrounds/cloudy-04.jpg"],
                      ["./assets/backgrounds/snowy-01.jpg", "./assets/backgrounds/snowy-02.jpg", "./assets/backgrounds/snowy-03.jpg"] ];
let bgCounter = [0, 0, 0, 0];
function iterateBgCounter(currWeather) {
  if (bgCounter[currWeather] < 2) {
    bgCounter[currWeather] += 1;
  }
  else {
    bgCounter[currWeather] = 0;
  }
  console.log("bgCounter = " + bgCounter);
}

export async function defaultAnimation() {
  console.log("defaultAnimation EXECUTED");

  console.log("Waiting for weather to be set...");
  const currWeather = await weatherDetermine.waitForWeather();
  console.log("currWeather = " + currWeather);

  document.getElementById("background1").style.backgroundImage = "url('"+ backgrounds[currWeather][bgCounter[currWeather]] +"')";
  document.getElementById("background2").style.backgroundImage = "url('"+ backgrounds[currWeather][bgCounter[currWeather]] +"')";
  iterateBgCounter(currWeather);

  weatherData.updateWeatherData();
  gsap.from(".weatherContainer", 1.8, { x: "100vw", ease: "power4.out", delay: 0 });
  gsap.from(".selectBox", 1.8, { x: "100vw", ease: "power4.out", delay: 0.3 });
  gsap.from("button", 1.8, { x: "100vw", ease: "power4.out", delay: 0.4 });
  
  gsap.from(".background1", 1.8, { xPercent: 100, ease: "power3.out", delay: 1, onComplete: () => disableSelect(false) });
  gsap.set(".background2", { xPercent: 0 });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function animForcedByChangingTempUnit() {
  await sleep(100);
  weatherData.updateWeatherData();
}

export async function transAnimation() {
  disableSelect(true);
  const currWeather = await weatherDetermine.waitForWeather();
  console.log("currWeather = " + currWeather);

  let tl = new TimelineMax();

  tl.fromTo(".weatherContainer", 1, { x: "0" }, { x: "-100vw", ease: "power3.in" } );
  tl.fromTo(".selectBox", 1, { x: "0" }, { x: "-100vw", ease: "power3.in" }, '<')
  tl.fromTo("button", 1, { x: "0" }, { x: "-100vw", ease: "power3.in", onComplete: () => updateData() }, '<');

  document.getElementById("background2").style.display = "block";
  tl.set(".background2", { xPercent: 0 }, '>0.1')
  tl.set(".background1", { xPercent: 100, onComplete: updateBG1 }, '<');
  tl.to(".background2", 1.8, { xPercent: -100, ease: "power3.out" }, '<')
  tl.to(".background1", 1.8, { xPercent: 0, ease: "power3.out", onComplete: updateBG2 }, '>0.25');
  
  tl.from(".weatherContainer", 1.8, { x: "100vw", ease: "power4.out" }, '<0.35')
  tl.from(".selectBox", 1.8, { x: "100vw", ease: "power4.out", onComplete: () => disableSelect(false)  }, '<0.3')
  tl.from("button", 1.8, { x: "100vw", ease: "power4.out" }, '<0.1');

  function updateBG1() {
    document.getElementById("background1").style.backgroundImage = "url('"+ backgrounds[currWeather][bgCounter[currWeather]] +"')";
    console.log("updated BG1 to " + backgrounds[currWeather][bgCounter[currWeather]]);
  }

  function updateBG2() {
    document.getElementById("background2").style.backgroundImage = "url('"+ backgrounds[currWeather][bgCounter[currWeather]] +"')";
    iterateBgCounter(currWeather);
    console.log("updated BG2 to " + backgrounds[currWeather][bgCounter[currWeather]]);
    console.log("animation complete");
  }

  async function updateData() {
    // weatherData.weatherDataMain(tempUnit, place);  // Call with updated parameters
    weatherData.updateWeatherData();
  }
}

function disableSelect(bool) {
    document.getElementById("selectBox").disabled = bool;
}