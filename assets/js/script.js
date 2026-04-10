// Register GSAP plugin (removed ScrollSmoother to avoid conflict with Lenis)
gsap.registerPlugin(ScrollTrigger);



// ── Counter Animation ──
document.querySelectorAll(".counter").forEach((counter) => {
  const target = +counter.getAttribute("data-target");
  const obj = {
    val: 0
  };

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

const tl = gsap.timeline({
  paused: true
});

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

// Testimonial section js
document.addEventListener('DOMContentLoaded', () => {
  const testimonial = new Splide('#testimonial-slider', {
    type: 'loop',
    perPage: 1,
    arrows: false,
    pagination: false,
    autoplay: false,
    speed: 600,
  }).mount();

  const avatars = new Splide('#avatar-slider', {
    type: 'loop',
    perPage: 3,
    focus: 'center',
    gap: '-10px',
    pagination: false,
    arrows: true,
    isNavigation: true,
    trimSpace: false,
  }).mount();

  const nameSpans = document.querySelectorAll('.avatar-names span');

  let totalSlides = testimonial.length;
  let currentIndex = 0;

  function showActiveName(index) {
    nameSpans.forEach((name, i) => {
      name.style.opacity = i === index ? '1' : '0';
      name.style.transform = i === index ? 'translateY(0)' : 'translateY(10px)';
    });
  }

  // Initial active name
  showActiveName(0);

  // Avatar click
  avatars.on('click', (slide) => {
    currentIndex = slide.index;
    testimonial.go(currentIndex);
    showActiveName(currentIndex);
  });

  // Avatar active sync
  avatars.on('active', (slide) => {
    testimonial.go(slide.index);
    showActiveName(slide.index);
  });

  // Auto-play every 2s
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    testimonial.go(currentIndex);
    avatars.go(currentIndex);
    showActiveName(currentIndex);
  }, 4000);
});




// ── Navbar scroll ──
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  });
}

// ── Mobile menu toggle ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  const hamTop = hamburger.querySelector('.ham-top');
  const hamMid = hamburger.querySelector('.ham-mid');
  const hamBot = hamburger.querySelector('.ham-bot');
  let menuOpen = false;

  const toggleMenu = () => {
    menuOpen = !menuOpen;

    if (menuOpen) {
      // Open menu
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
      navbar.classList.add('navbar--menu-open');

      // Hamburger → X
      hamTop.style.transform = 'translateY(0px) rotate(45deg)';
      hamMid.style.opacity = '0';
      hamMid.style.transform = 'scaleX(0)';
      hamBot.style.width = '24px';
      hamBot.style.transform = 'translateY(0px) rotate(-45deg)';
    } else {
      // Close menu
      mobileMenu.style.maxHeight = '0';
      navbar.classList.remove('navbar--menu-open');

      // Reset hamburger bars
      hamTop.style.transform = '';
      hamMid.style.opacity = '';
      hamMid.style.transform = '';
      hamBot.style.width = '';
      hamBot.style.transform = '';
    }
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (menuOpen) toggleMenu();
    });
  });
}