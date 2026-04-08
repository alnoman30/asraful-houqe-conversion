gsap.registerPlugin(ScrollTrigger);

// Counter js
document.querySelectorAll(".counter").forEach((counter) => {
  let target = +counter.getAttribute("data-target");
  let obj = { val: 0 };

  gsap.to(obj, {
    val: target,
    duration: 4,
    ease: "power2.out",
    scrollTrigger: {
      trigger: counter,
      start: "top 80%",
      end: "top 20%",
      toggleActions: "restart none restart none",
    },
    onUpdate: function () {
      counter.innerText = Math.floor(obj.val) + "+";
    },
  });
});

// Core expertise section: Heading fill animation
gsap.set(".text-fill", {
  backgroundSize: "0%"
});
const textElements = gsap.utils.toArray(".text-fill");

textElements.forEach((text) => {
  gsap.fromTo(
    text,
    { backgroundSize: "0%" },
    {
      backgroundSize: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: text,
        start: "top 90%",
        end: "center 50%",
        scrub: true,
      }
    }
  );
});

gsap.utils.toArray(".expertise-card").forEach((card, i) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        delay: i * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  });