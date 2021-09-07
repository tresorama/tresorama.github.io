//ViewportDetailsBanner();


const initSmilesSlider = () => {
  const smilesSlider = document.querySelector(".smiles .slider");
  const handlePause = (eventType) => {
    return function () {
      this.classList.add("paused");
      this.addEventListener(
        eventType,
        () => {
          this.classList.remove("paused");
        },
        { once: true }
      );
    };
  };
  smilesSlider.addEventListener("touchstart", handlePause("touchend"));
  smilesSlider.addEventListener("mousedown", handlePause("mouseup"));
};
initSmilesSlider();

const playIntroSequence = () => {
  const ease = "ease";

  const tl = gsap.timeline({
    defaults: {
      ease,
      duration: 1
    },
    onComplete: () => {
      setTimeout(() => {
        document.querySelector(".smiles .slider").classList.add("animate");
      }, 2000);
    }
  });

  tl.to(".intro", { opacity: 1 })
    .from(".intro .slider__mover", { x: "100%" })
    .from(".intro .slider__slide:nth-child(1) .text > *:not(br)", {
      opacity: "0",
      duration: 1.5,
      stagger: 3
    })
    .to(".intro .slider__slide:nth-child(1) .text > *", {
      opacity: "0",
      delay: 3
    })
    .to(".intro .slider__mover", { x: "-100%" })
    .from(".intro .slider__slide:nth-child(2) .text > *:not(br)", {
      opacity: "0",
      duration: 1.5,
      stagger: 4
    })
    .to(".intro .slider__slide:nth-child(2) .text > *", {
      opacity: "0",
      delay: 3
    })
    .to(".intro", { x: "-100vw" })
    .to(".intro", { height: "0", duration: 0 })
    .to(".smiles", { opacity: 1, duration: 0 });
};
playIntroSequence();

const fixViewportDimensionForMobileBrowsers = () => {
  let throttleTimer;
  const throttleFunction = function (func, delay) {
    // If setTimeout is already scheduled, no need to do anything
    if (throttleTimer) {
      return;
    }

    // Schedule a setTimeout after delay seconds
    throttleTimer = setTimeout(function () {
      func();
      throttleTimer = null;
    }, delay);
  };

  const updateBodyDimensions = () => {
    const winDim = {
      height: window.innerHeight,
      width: window.innerWidth
    };

    document.body.style.height = `${winDim.height}px`;
  };

  const throttleUpdateBodyDimensions = () => {
    throttleFunction(updateBodyDimensions, 200);
  };
  window.addEventListener("resize", throttleUpdateBodyDimensions);
  updateBodyDimensions(); // run once at page load
};
fixViewportDimensionForMobileBrowsers();