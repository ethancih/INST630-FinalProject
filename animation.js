console.log('Loaded animation.js');

const weatherDetermine = await import("./weatherDetermine.js");

const backgrounds = [ ["./assets/backgrounds/sunny-01.jpg"],
                      ["./assets/backgrounds/rainy-01.jpg"], 
                      ["./assets/backgrounds/cloudy-01.jpg"],
                      ["./assets/backgrounds/snowy-01.jpg"] ];

export async function defaultAnimation() {

  console.log("defaultAnimation EXECUTED");

  console.log("Waiting for weather to be set...");
  const currWeather = await weatherDetermine.waitForWeather();
  console.log("currWeather = " + currWeather);

  document.getElementById("background1").style.backgroundImage = "url('"+ backgrounds[currWeather] +"')";
  document.getElementById("background2").style.backgroundImage = "url('"+ backgrounds[currWeather] +"')";

  gsap.from(".weatherContainer", 1.8, { x: "100vw", ease: "power4.out", delay: 0 });
  gsap.from(".selectBox", 1.8, { x: "100vw", ease: "power4.out", delay: 0.3 });
  gsap.from("button", 1.8, { x: "100vw", ease: "power4.out", delay: 0.4 });
  
  gsap.from(".background1", 1.8, { xPercent: 100, ease: "power3.out", delay: 1 });
  gsap.set(".background2", { xPercent: 0, delay: 0 });
}

export async function transAnimation() {
  const currWeather = await weatherDetermine.waitForWeather();
  console.log("currWeather = " + currWeather);

  let tl = new TimelineMax();

  tl.fromTo(".weatherContainer", 1, { x: "0" }, { x: "-100vw", ease: "power3.in" } );
  tl.fromTo(".selectBox", 1, { x: "0" }, { x: "-100vw", ease: "power3.in" }, '<')
  tl.fromTo("button", 1, { x: "0" }, { x: "-100vw", ease: "power3.in", onComplete: updateData }, '<');

  document.getElementById("background2").style.display = "block";
  tl.set(".background2", { xPercent: 0 }, '>0.15')
  tl.set(".background1", { xPercent: 100, onComplete: updateBG1 }, '<');
  tl.to(".background2", 1.8, { xPercent: -100, ease: "power3.out" }, '<')
  tl.to(".background1", 1.8, { xPercent: 0, ease: "power3.out", onComplete: updateBG2 }, '>0.25');
  
  tl.from(".weatherContainer", 1.8, { x: "100vw", ease: "power4.out" }, '<0.35')
  tl.from(".selectBox", 1.8, { x: "100vw", ease: "power4.out" }, '<0.3')
  tl.from("button", 1.8, { x: "100vw", ease: "power4.out" }, '<0.1');

  function updateBG1() {
    document.getElementById("background1").style.backgroundImage = "url('"+ backgrounds[currWeather] +"')";
    console.log("updated BG1");
  }

  function updateBG2() {
    document.getElementById("background2").style.backgroundImage = "url('"+ backgrounds[currWeather] +"')";
    console.log("animation complete");
  }

  async function updateData() {
    const weatherData = await import("./weatherData.js");
    weatherData.weatherDataMain(tempUnit, place);  // Call with updated parameters
  }
  
}