// ! == == == ==   hamburger menu  == == == ==

document.querySelector(".hamburger").addEventListener("click", function () {
  this.classList.toggle("open");
  document.querySelector(".navbar-list").classList.toggle("open");
});

window.addEventListener("resize", function () {
  // get the current window width
  let width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  // check if the window width is larger than your mobile breakpoint (in this case, 800px)
  if (width > 800) {
    // if it is, remove the 'open' class from the hamburger and the navbar list
    let hamburger = document.querySelector(".hamburger");
    let navbarList = document.querySelector(".navbar-list");

    hamburger.classList.remove("open");
    navbarList.classList.remove("open");
  }
});
// to remove open class when link is triger
document.querySelectorAll(".navbar-list a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".hamburger").classList.remove("open");
    document.querySelector(".navbar-list").classList.remove("open");
  });
});

// to autohide header on mobile screen size
let lastScrollTop = 0; // Store the last scroll position

window.addEventListener(
  "scroll",
  function () {
    if (window.innerWidth <= 960) {
      let currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        // Downward scroll - Hide header
        document.querySelector(".header").style.transform = "translateY(-100%)";
      } else {
        // Upward scroll - Show header
        document.querySelector(".header").style.transform = "translateY(0)";
      }

      lastScrollTop = currentScrollTop;
    } else {
      // Reset the header for larger screens
      document.querySelector(".header").style.transform = "translateY(0)";
    }
  },
  false
);
// ! == == == ==   toyota carousel with automatic sliding and timeing == == == ==

document.addEventListener("DOMContentLoaded", function () {
  // Common Glide options
  const glideOptions = {
    type: "carousel",
    startAt: 0,
    perView: 1,
    animationDuration: 2500,
    gap: 0,
  };

  let glideLeft = new Glide(".glide-left", glideOptions);
  let glideMiddle = new Glide(".glide-middle", glideOptions);
  let glideRight = new Glide(".glide-right", glideOptions);

  let autoplayInterval;

  // Custom function to start autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      glideLeft.go(">");
      glideMiddle.go(">");
      glideRight.go(">");
    }, 2500);
  }

  // Custom function to stop autoplay
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Initialize autoplay
  startAutoplay();

  // Function to handle manual slide move
  function handleManualSlide(direction) {
    stopAutoplay();
    glideLeft.go(direction);
    glideMiddle.go(direction);
    glideRight.go(direction);
    startAutoplay();
  }

  // Function to set active circle
  const circles = document.querySelectorAll(".button-svg-anim-path");

  function setActiveCircle(index) {
    circles.forEach((circle, i) => {
      if (i === index) {
        circle.classList.add("start-anim");
      } else {
        circle.classList.remove("start-anim");
      }
    });
  }

  glideLeft.on("run.before", function () {
    setActiveCircle(glideLeft.index);
  });

  // glideMiddle.on("run.before", function () {
  //   const currentSlideElement = document.querySelector(
  //     ".glide-middle .glide__slide--active .content"
  //   );

  //   // Add fade-out effect to the text
  //   if (currentSlideElement) {
  //     currentSlideElement.classList.add("fade-out-text");
  //   }
  // });

  // glideMiddle.on("run.after", function () {
  //   // Remove the fade-out effect after the slide transitions
  //   const previousSlideElement = document.querySelector(
  //     ".glide-middle .fade-out-text"
  //   );

  //   if (previousSlideElement) {
  //     previousSlideElement.classList.remove("fade-out-text");
  //   }
  // });
  // Existing code for fade-out

  glideMiddle.on("run.before", function () {
    // Query all slides
    const slides = document.querySelectorAll(".glide-middle .glide__slide");
    let currentSlideIndex = -1;

    // Find the index of the current active slide
    slides.forEach((slide, index) => {
      if (slide.classList.contains("glide__slide--active")) {
        currentSlideIndex = index;
      }
    });

    // Calculate the index of the next slide
    let nextSlideIndex = (currentSlideIndex + 1) % slides.length;

    // Target the content divs in current and next slides
    const currentSlideElement =
      slides[currentSlideIndex].querySelector(".content");
    const upcomingSlideElement =
      slides[nextSlideIndex].querySelector(".content");

    // Add fade-out effect to the current slide's content
    if (currentSlideElement) {
      currentSlideElement.classList.add("fade-out-text");
    }

    // Remove any old fade-in classes from previous slides
    const oldFadeInElements = document.querySelectorAll(
      ".glide-middle .fade-in-text"
    );
    oldFadeInElements.forEach((el) => el.classList.remove("fade-in-text"));

    // Add fade-in effect to the upcoming slide's content
    if (upcomingSlideElement) {
      upcomingSlideElement.classList.add("fade-in-text");
    }
  });

  glideMiddle.on("run.after", function () {
    // Remove the fade-out effect after the slide transitions
    const previousSlideElement = document.querySelector(
      ".glide-middle .fade-out-text"
    );

    if (previousSlideElement) {
      previousSlideElement.classList.remove("fade-out-text");
    }

    // Remove the fade-in effect from the current slide to reset its state
    const currentSlideElement = document.querySelector(
      ".glide-middle .glide__slide--active .content"
    );

    if (currentSlideElement) {
      currentSlideElement.classList.remove("fade-in-text");
    }
  });

  const glideSlidesLeft = document.querySelector(
    ".container-left .glide__slides"
  );
  const glideSlidesRight = document.querySelector(
    ".container-right .glide__slides"
  );
  glideSlidesRight.addEventListener("click", function () {
    handleManualSlide(">");
  });

  glideSlidesLeft.addEventListener("click", function () {
    handleManualSlide("<");
  });

  glideLeft.mount();
  glideMiddle.mount();
  glideRight.mount();

  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Resize event with debounce
  const debouncedHandleResize = debounce(function handleResize() {
    const breakpoint = window.matchMedia("(max-width: 720px)");
    if (breakpoint.matches) {
      glideRight.destroy();
    } else {
      glideRight.mount();
    }
  }, 250);

  window.addEventListener("resize", debouncedHandleResize);
});

//remove loader overlay when page is fully loaded
// window.addEventListener("load", function () {
//   const loader = document.getElementById("loader-overlay");
//   loader.style.display = "none";
// });

window.addEventListener("load", function () {
  const loader = document.getElementById("loader-overlay");
  // Add a 2-second delay (2000 milliseconds) before hiding the loader
  setTimeout(function () {
    loader.style.display = "none";
  }, 2000);
});
