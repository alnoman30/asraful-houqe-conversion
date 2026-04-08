// Register GSAP plugin (removed ScrollSmoother to avoid conflict with Lenis)
gsap.registerPlugin(ScrollTrigger);

// ── Smooth scroll (Lenis) ──
let lenis;

if (typeof Lenis !== "undefined") {
  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.3,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

// ── Counter Animation ──
document.querySelectorAll(".counter").forEach((counter) => {
  const target = +counter.getAttribute("data-target");
  const obj = { val: 0 };

  gsap.to(obj, {
    val: target,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: counter,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    onUpdate: function () {
      counter.innerText = Math.floor(obj.val).toLocaleString() + "+";
    },
  });
});

