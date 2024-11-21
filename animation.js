function defaultAnimation() {
    console.log('Loaded animation.js');
  
    gsap.from(".weatherContainer", 1.8, {
      x: 600,
      ease: "power4.out",
      delay: 0,
      stagger: {
        amount: 1.2
      }
    })

    gsap.from(".selectBox", 1.8, {
      x: 600,
      ease: "power4.out",
      delay: 0.3,
      stagger: {
        amount: 1.2
      }
    })

    gsap.from("button", 1.8, {
      x: 600,
      ease: "power4.out",
      delay: 0.4,
      stagger: {
        amount: 1.2
      }
    })

    gsap.from(".background", 1.8, {
      x: 2000,
      ease: "power3.out",
      delay: 1,
      stagger: {
        amount: 1.2
      }
    })
}

export {defaultAnimation};