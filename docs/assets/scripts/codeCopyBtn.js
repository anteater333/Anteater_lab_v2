const codeBlockList = document.querySelectorAll("div.highlight");

codeBlockList.forEach((codeBlock) => {
  const code = codeBlock.firstChild.textContent;

  const copyButton = document.createElement("button");
  copyButton.classList.add("code-copy-btn");
  copyButton.textContent = "📋";

  copyButton.addEventListener("click", (event) => {
    window.navigator.clipboard.writeText(code);

    Toastify({
      text: `코드를 복사했습니다.`,
      position: "center",
      gravity: "bottom",
      duration: 1000,
    }).showToast();
  });

  codeBlock.appendChild(copyButton);

  codeBlock.addEventListener("mouseover", (event) => {
    copyButton.classList.add("show");
  });
  codeBlock.addEventListener("mouseout", (event) => {
    copyButton.classList.remove("show");
  });
});
