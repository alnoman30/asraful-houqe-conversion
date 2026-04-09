// Register GSAP plugin (removed ScrollSmoother to avoid conflict with Lenis)
gsap.registerPlugin(ScrollTrigger);



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


// text animation
const link = document.querySelector(".group");
const track = link.querySelector(".mask-track");

const tl = gsap.timeline({ paused: true });

tl.to(track, {
  y: "-50%", // move exactly one text height (since 2 items stacked)
  duration: 0.4,
  ease: "power2.out"
});


link.addEventListener("mouseenter", () => tl.play());
link.addEventListener("mouseleave", () => tl.reverse());



// ── Smooth scroll (Lenis) ──
if (typeof Lenis !== 'undefined') {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.3,
    infinite: false,
  });

  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}
