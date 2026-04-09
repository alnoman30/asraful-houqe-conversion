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


// 

// Testimonial slider
const testimonial = new Splide('#testimonial-slider', {
  type: 'fade',
  rewind: true,
  pagination: false,
  arrows: false,
  speed: 400, // base speed
});

// Avatar navigation slider
const avatars = new Splide('#avatar-slider', {
  type: 'slide',
  perPage: 3,
  focus: 'center',
  gap: '-10px',
  rewind: true,
  isNavigation: true,
  pagination: false,
  arrows: true,
  trimSpace: false,
});

// Sync sliders
testimonial.sync(avatars);

// Mount sliders
avatars.mount();
testimonial.mount();

// GSAP fade effect on testimonial
testimonial.on('move', (newIndex, oldIndex) => {
  const slides = document.querySelectorAll('#testimonial-slider .splide__slide');

  gsap.to(slides[oldIndex], { opacity: 0, scale: 0.9, duration: 0.5, ease: 'power1.in' });

  gsap.fromTo(
    slides[newIndex],
    { opacity: 0, scale: 1.1 },
    { opacity: 1, scale: 1, duration: 0.5, ease: 'power1.out' }
  );
});
