const scrollBtnList = document.querySelectorAll(".up-btn");
const btnContainerList = document.querySelectorAll(".up-btn-container");

for (let i = 0; i < scrollBtnList.length; i++) {
  const btnContainer = btnContainerList[i];
  const scrollBtn = scrollBtnList[i];

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
    history.pushState(null, null, window.location.href.split("#")[0]);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
