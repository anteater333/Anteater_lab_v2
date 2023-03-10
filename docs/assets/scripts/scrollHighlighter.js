const headingList = document.querySelectorAll("h2, h3, h4, h5, h6");
const tocList = document.querySelectorAll(".right-toc-container li a");

let currentIdx = -1;

const changeCurrent = (newCurrent) => {
  if (currentIdx === newCurrent) return;

  // 이전 Idx에 class name 제거
  if (currentIdx > -1) tocList[currentIdx].classList.remove("toc-highlighted");
  currentIdx = newCurrent;
  // 새 Idx에 class name 추가
  if (currentIdx > -1) tocList[currentIdx].classList.add("toc-highlighted");
};

document.addEventListener("scroll", function () {
  if (headingList[0].getBoundingClientRect().top >= 150) {
    // Exception - 스크롤이 페이지 최상단에 있는 경우
    changeCurrent(-1);
  } else {
    for (let i = 0; i < headingList.length; i++) {
      const { top, bottom } = headingList[i].getBoundingClientRect();

      if (top < 150 && bottom > 0) {
        changeCurrent(i);
        break;
      }
    }
  }
});
