const nav = document.querySelector('.bahure-nav');
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  topBtn.style.display = window.scrollY > 500 ? 'flex' : 'none';
  topBtn.style.alignItems = 'center';
  topBtn.style.justifyContent = 'center';
});

topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.querySelector('.navbar-collapse');
    if (menu.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

const counters = document.querySelectorAll('.stat-item strong');
const animateCounter = (el) => {
  const target = parseInt(el.textContent.replace(/\D/g,''), 10);
  const suffix = el.textContent.includes('+') ? '+' : '';
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 45));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + suffix;
  }, 25);
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, {threshold: .7});

counters.forEach(counter => observer.observe(counter));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});


// =========== SLider JS Script by Nilesh ===========

/* =========================================
   TESTIMONIAL SLIDER
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".testimonial-slider");
    const slides = document.querySelectorAll(".testimonial-slide");
    const prevBtn = document.querySelector(".testimonial-prev");
    const nextBtn = document.querySelector(".testimonial-next");
    const dotsContainer = document.querySelector(".testimonial-dots");

    if (!slider || !slides.length) {
        return;
    }

    let currentIndex = 0;
    let autoSlide;


    /* -----------------------------------------
       GET NUMBER OF VISIBLE SLIDES
    ----------------------------------------- */

    function getSlidesPerView() {

        if (window.innerWidth <= 767) {
            return 1;
        }

        if (window.innerWidth <= 991) {
            return 2;
        }

        return 3;
    }


    /* -----------------------------------------
       GET MAXIMUM SLIDE INDEX
    ----------------------------------------- */

    function getMaxIndex() {

        const slidesPerView = getSlidesPerView();

        return Math.max(
            0,
            slides.length - slidesPerView
        );
    }


    /* -----------------------------------------
       UPDATE SLIDER
    ----------------------------------------- */

    function updateSlider() {

        const slidesPerView = getSlidesPerView();

        /*
         * Each slide occupies 1/slidesPerView
         * of the visible area.
         */
        const slideWidth = 100 / slidesPerView;

        slider.style.transform =
            `translateX(-${currentIndex * slideWidth}%)`;

        updateDots();
    }


    /* -----------------------------------------
       CREATE DOTS
    ----------------------------------------- */

    function createDots() {

        dotsContainer.innerHTML = "";

        const maxIndex = getMaxIndex();

        for (let i = 0; i <= maxIndex; i++) {

            const dot = document.createElement("button");

            dot.type = "button";

            dot.classList.add("testimonial-dot");

            dot.setAttribute(
                "aria-label",
                `Go to testimonial ${i + 1}`
            );

            dot.addEventListener("click", function () {

                currentIndex = i;

                updateSlider();

                restartAutoSlide();

            });

            dotsContainer.appendChild(dot);
        }

        updateDots();
    }


    /* -----------------------------------------
       UPDATE DOTS
    ----------------------------------------- */

    function updateDots() {

        const dots =
            document.querySelectorAll(".testimonial-dot");

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });
    }


    /* -----------------------------------------
       NEXT
    ----------------------------------------- */

    function nextSlide() {

        const maxIndex = getMaxIndex();

        if (currentIndex < maxIndex) {

            currentIndex++;

        } else {

            currentIndex = 0;

        }

        updateSlider();
    }


    /* -----------------------------------------
       PREVIOUS
    ----------------------------------------- */

    function previousSlide() {

        const maxIndex = getMaxIndex();

        if (currentIndex > 0) {

            currentIndex--;

        } else {

            currentIndex = maxIndex;

        }

        updateSlider();
    }


    /* -----------------------------------------
       BUTTON EVENTS
    ----------------------------------------- */

    nextBtn.addEventListener("click", function () {

        nextSlide();

        restartAutoSlide();

    });


    prevBtn.addEventListener("click", function () {

        previousSlide();

        restartAutoSlide();

    });


    /* -----------------------------------------
       AUTO SLIDE
    ----------------------------------------- */

    function startAutoSlide() {

        autoSlide = setInterval(function () {

            nextSlide();

        }, 5000);

    }


    function stopAutoSlide() {

        clearInterval(autoSlide);

    }


    function restartAutoSlide() {

        stopAutoSlide();

        startAutoSlide();

    }


    /* -----------------------------------------
       PAUSE ON HOVER
    ----------------------------------------- */

    const viewport =
        document.querySelector(".testimonial-slider-viewport");

    viewport.addEventListener("mouseenter", function () {

        stopAutoSlide();

    });


    viewport.addEventListener("mouseleave", function () {

        startAutoSlide();

    });


    /* -----------------------------------------
       RESIZE
    ----------------------------------------- */

    window.addEventListener("resize", function () {

        const maxIndex = getMaxIndex();

        if (currentIndex > maxIndex) {

            currentIndex = maxIndex;

        }

        createDots();

        updateSlider();

    });


    /* -----------------------------------------
       INITIALIZE
    ----------------------------------------- */

    createDots();

    updateSlider();

    startAutoSlide();

});