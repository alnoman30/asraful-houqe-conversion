gsap.registerPlugin(ScrollTrigger);

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