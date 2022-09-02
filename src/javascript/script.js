"use strict";

// ===========================================================================
// Burger Menu Setup
// ===========================================================================

let navigationBar = document.querySelector(".navigation");
let burgerMenu = document.querySelector(".burger-menu");

let toggleBurgerState = function () {
  burgerMenu.classList.toggle("js-on");
  navigationBar.classList.toggle("js-on");
};

burgerMenu.addEventListener("click", toggleBurgerState);

// ===========================================================================
// Navigation Menu
// ===========================================================================

let menuItem = document.querySelectorAll(".js-menu-item");
let menuButtons = document.querySelectorAll(".menu-button");

let activateMenuItem = function (e) {
  e.stopPropagation();
  menuItem.forEach((item) => item.classList.replace("js-on", "js-off"));
  this.classList.replace("js-off", "js-on");
  console.log("turned on");
};

let clickExceptMenuItem = function () {
  menuItem.forEach((item) => item.classList.replace("js-on", "js-off"));
};

menuItem.forEach((item) => item.addEventListener("click", activateMenuItem));
// menuItem.forEach((item) => item.addEventListener("mouseleave", clickExceptMenuItem));
document.addEventListener("click", clickExceptMenuItem);

// Refers also to the searchbar
// searchDeactivate();
// console.log("click viewport");

// ===========================================================================
// Searchbar
// ===========================================================================
let searchForm = document.querySelector(".js-search-container");
let closeButton = document.querySelector(".js-close-button");
let searchButton = document.querySelector(".js-search-button");
let searchInput = document.querySelector(".js-search-input");

let searchbarActivate = function (e) {
  e.stopPropagation();
  // If the bar is not active prevent the search button to submit
  if (searchForm.classList.contains("js-off")) {
    e.preventDefault();
    searchForm.classList.replace("js-off", "js-on");
  }
};

let stopPropagation = function (e) {
  e.stopPropagation();
};

let searchbarClose = function (e) {
  e.stopPropagation();
  if (searchInput.value !== "") {
    searchInput.value = "";
    console.log("input is cleared");
  } else {
    searchForm.classList.replace("js-on", "js-off");
    console.log("search inactive");
  }
};

let searchbarFullClose = function (e) {
  searchForm.classList.replace("js-on", "js-off");
};

closeButton.addEventListener("click", searchbarClose);
searchButton.addEventListener("click", searchbarActivate);
// Close the search bar when clicked anywhere on page also clears the input
// SearchForm listeners serves as a propagation stopper
searchForm.addEventListener("click", stopPropagation);
document.addEventListener("click", searchbarFullClose);

// ===========================================================================
// UP Button
// ===========================================================================

let upButton = document.querySelector(".up-button");
let rootElement = document.documentElement;

let enableScrollUp = function () {
  if (rootElement.scrollTop > 100) {
    upButton.classList.replace("off", "on");
  } else {
    upButton.classList.replace("on", "off");
  }
};

let scrollTop = function (e) {
  e.stopPropagation();
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  // For Safari
  document.body.scrollTop({
    top: 0,
    behavior: "smooth",
  });
};

window.addEventListener("scroll", enableScrollUp);
upButton.addEventListener("click", scrollTop);

// ===========================================================================
// Gallery Button
// ===========================================================================

let buttonGalleryLeft = document.querySelectorAll(".atelier-gallery-container .btn-left");
let buttonGalleryRight = document.querySelectorAll(".atelier-gallery-container .btn-right");
// let galleryAtelier = document.querySelector(".atelier-gallery");

let swipeLeft = function (e) {
  // e.stopPropagation();
  e.srcElement.parentElement.lastElementChild.scrollBy({ left: -300, behavior: "smooth" });
  console.log("scroll left");
  console.log(e);
};
let swipeRight = function (e) {
  // e.stopPropagation();
  e.srcElement.parentElement.lastElementChild.scrollBy({ left: 300, behavior: "smooth" });
  console.log("scroll right");
  console.log(e.srcElement.parentElement.lastElementChild);
};

buttonGalleryLeft.forEach((item) => item.addEventListener("click", swipeLeft));
buttonGalleryRight.forEach((item) => item.addEventListener("click", swipeRight));

// ==============================================================================================================
// Details Accordion
// ==============================================================================================================
// the code is taken from the tutorial on https://css-tricks.com/how-to-animate-the-details-element-using-waapi/
// ==============================================================================================================

class Accordion {
  constructor(el) {
    // Store the <details> element
    this.el = el;
    // Store the <summary> element
    this.summary = el.querySelector("summary");
    // Store the <div class="content"> element
    this.content = el.querySelector(".details-content");

    // Store the animation object (so we can cancel it if needed)
    this.animation = null;
    // Store if the element is closing
    this.isClosing = false;
    // Store if the element is expanding
    this.isExpanding = false;
    // Detect user clicks on the summary element
    this.summary.addEventListener("click", (e) => this.onClick(e));
  }

  onClick(e) {
    // Stop default behaviour from the browser
    e.preventDefault();
    // Add an overflow on the <details> to avoid content overflowing
    this.el.style.overflow = "hidden";
    // Check if the element is being closed or is already closed
    if (this.isClosing || !this.el.open) {
      this.open();
      // Check if the element is being openned or is already open
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    // Set the element as "being closed"
    this.isClosing = true;

    // Store the current height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the height of the summary
    const endHeight = `${this.summary.offsetHeight}px`;

    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }

    // Start a WAAPI animation
    this.animation = this.el.animate(
      {
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight],
      },
      {
        duration: 400,
        easing: "ease-out",
      }
    );

    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(false);
    // If the animation is cancelled, isClosing variable is set to false
    this.animation.oncancel = () => (this.isClosing = false);
  }

  open() {
    // Apply a fixed height on the element
    this.el.style.height = `${this.el.offsetHeight}px`;
    // Force the [open] attribute on the details element
    this.el.open = true;
    // Wait for the next frame to call the expand function
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    // Set the element as "being expanding"
    this.isExpanding = true;
    // Get the current fixed height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;

    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }

    // Start a WAAPI animation
    this.animation = this.el.animate(
      {
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight],
      },
      {
        duration: 400,
        easing: "ease-out",
      }
    );
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(true);
    // If the animation is cancelled, isExpanding variable is set to false
    this.animation.oncancel = () => (this.isExpanding = false);
  }

  onAnimationFinish(open) {
    // Set the open attribute based on the parameter
    this.el.open = open;
    // Clear the stored animation
    this.animation = null;
    // Reset isClosing & isExpanding
    this.isClosing = false;
    this.isExpanding = false;
    // Remove the overflow hidden and the fixed height
    this.el.style.height = this.el.style.overflow = "";
  }
}

document.querySelectorAll("details").forEach((el) => {
  new Accordion(el);
});

// ===========================================================================
// Display some data about the screen width.
// ===========================================================================

// let headerText = document.querySelector("h1");
// headerText.innerHTML = `Screen width is ${window.screen.width}px`;
// let widthHeader = function () {
//   if (window.screen.width >= 1366) {
//     headerText.innerHTML = "Screen width is >1366px";
//     console.log("Screen width is >1366px");
//   } else if (window.screen.width >= 1024) {
//     headerText.innerHTML = "Screen width is >1024px & <1366px";
//     console.log("Screen width is >1024px & <1366px");
//   } else if (window.screen.width < 1024 && window.screen.width >= 768) {
//     headerText.innerHTML = "Screen width is >768px & <1024px";
//     console.log("Screen width is >768px & <1024px");
//   } else {
//     headerText.innerHTML = "Screen width is <768px";
//     console.log("Screen width is <768px");
//   }
// };
// window.addEventListener("resize", widthHeader);
