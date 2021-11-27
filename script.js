"use strict";
const toggleBtn = document.querySelector(".box-bot__toggle-btn");

const slider = document.querySelector(".box-mid__slider");
const progress = document.querySelector(".box-mid__progress");

const pageViews = document.querySelector(".box-top__text-lft");
const price = document.querySelector(".box-top__text-price");
const duration = document.querySelector(".box-top__text-duration");

const arrSlide = [0, 25, 50, 75, 100];
const arrPages = [100, 250, 500, 750, 1000];

/* function to display price and pageviews */
const displayPagePrice = function (val1, val2, counter) {
  pageViews.textContent = `${arrPages[counter]}k Pageviews`;
  price.textContent = `$${16 * val1 * (counter + 1)}.00`;
  duration.textContent = `/${val2}`;
};

/* function to calculate price for month and year  */
const countPagePrice = function (val1, val2) {
  arrSlide.forEach((el, i, arr) => {
    if (slider.value === String(arr[i])) displayPagePrice(val1, val2, i);
    if (
      toggleBtn.classList.contains("toggle-btn") &&
      slider.value === String(arr[i])
    )
      displayPagePrice(val1, val2, i);
  });
};

/* Event listener for toggle button */
toggleBtn.parentElement.onclick = function () {
  if (toggleBtn.classList.contains("toggle-btn")) {
    toggleBtn.classList.remove("toggle-btn");
    toggleBtn.parentElement.style.backgroundColor = "hsl(223, 50%, 87%)";
    countPagePrice(1, "month");
  } else {
    toggleBtn.classList.add("toggle-btn");
    toggleBtn.parentElement.style.backgroundColor = "hsl(174, 86%, 45%)";

    countPagePrice(12, "year");
  }
};

/* Event listener for slider bar */
slider.oninput = function (e) {
  const progressValue = arrSlide.find((el, i, arr) => {
    if (el >= this.value) return el;
    console.log(el);
  });
  const progressWidth = this.value >= 10 ? progressValue : 0;
  this.value = progressWidth;
  progress.style.width = progressWidth + "%";

  toggleBtn.classList.contains("toggle-btn")
    ? countPagePrice(12, "year")
    : countPagePrice(1, "month");
};
