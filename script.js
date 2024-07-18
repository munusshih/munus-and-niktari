const c = document.querySelector(".container"),
  f = document.getElementById("followText");

c.onmousemove = (e) => {
  f.style.left = e.clientX + "px";
  f.style.top = e.clientY + "px";
  f.classList.remove("hidden");
};

c.onmouseleave = () => f.classList.add("hidden");

const getRandomColor = () =>
  `#${Math.random()
    .toString(16)
    .slice(-6)}`;

const setRandomColors = () => {
  const root = document.documentElement;
  root.style.setProperty("--munus-color", getRandomColor());
  root.style.setProperty("--niktari-color", getRandomColor());
};

const buttons = document.querySelectorAll("button");
buttons.forEach(b => {
  b.onmouseenter = () => {
    setRandomColors();
  };
});