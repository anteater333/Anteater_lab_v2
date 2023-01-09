const scrollProgressBar = document.getElementById("scroll_progress");

document.addEventListener("scroll", function () {
  const scrollTop =
    document.documentElement["scrollTop"] || document.body["scrollTop"];
  const scrollBottom =
    (document.documentElement["scrollHeight"] ||
      document.body["scrollHeight"]) - document.documentElement.clientHeight;

  const scrollPercent = (scrollTop / scrollBottom) * 100 + "%";

  scrollProgressBar.style.setProperty("--scroll", scrollPercent);

  if (scrollPercent === "100%") {
    scrollProgressBar.classList.add("done");
    scrollProgressBar.classList.remove("reading");
  } else {
    scrollProgressBar.classList.add("reading");
    scrollProgressBar.classList.remove("done");
  }
});
