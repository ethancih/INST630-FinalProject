function defaultAnimation() {
    console.log('Loaded animation.js');
  
    gsap.from("span", 1.8, {
      y: 100,
      ease: "power4.out",
      delay: 0.2,
      skewY: 7,
      stagger: {
        amount: 1.2
      }
    })
}

export {defaultAnimation};