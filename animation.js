function defaultAnimation() {
  console.log('Loaded animation.js');

  gsap.from(".weatherContainer", 1.8, {
    x: 600,
    ease: "power4.out",
    delay: 0
  })

  gsap.from(".selectBox", 1.8, {
    x: 600,
    ease: "power4.out",
    delay: 0.3
  })

  gsap.from("button", 1.8, {
    x: 600,
    ease: "power4.out",
    delay: 0.4
  })

  gsap.from(".background", 1.8, {
    xPercent: 100,
    ease: "power3.out",
    delay: 1
  })

  gsap.to(".background", 1.8, {
    xPercent: -100,
    ease: "power3.out",
    delay: 3
  })

  gsap.from(".background2", 1.8, {
    xPercent: 100,
    ease: "power3.out",
    delay: 3
  })
}

export {defaultAnimation};