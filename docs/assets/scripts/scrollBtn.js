const scrollBtn = document.querySelector(".up-btn");
const btnContainer = document.querySelector(".up-btn-container");

const btnVisibility = () => {
  if (window.scrollY > 100) {
    btnContainer.classList.add("show");
  } else {
    btnContainer.classList.remove("show");
  }
};

document.addEventListener("scroll", () => {
  btnVisibility();
});

scrollBtn.addEventListener("click", () => {
  history.pushState(null, null, window.location.href.split('#')[0]);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
