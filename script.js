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
  root.style.setProperty("--about-color", getRandomColor());
};

const links = document.querySelectorAll(".link");
links.forEach(l => {
  l.onmouseenter = () => {
    setRandomColors();
  };
});

const aboutLink = document.getElementById('about-link'),
      aboutSection = document.getElementById('about');
      body = document.body,
      html = document.documentElement;

aboutLink.onclick = (e) => {
  e.preventDefault();
  setRandomColors();

  const isActive = aboutSection.classList.toggle('active');
  aboutSection.classList.toggle('display-none', !isActive);

  aboutLink.textContent = isActive ? 'Close' : 'About';
  history.pushState(null, null, isActive ? '#about' : ' ');

  if (isActive) {
    body.style.overflow = 'auto';
    html.style.overflow = 'auto';
    html.style.background = 'var(--munus-color)';
  } else {
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
    html.style.background = 'none';
  }
};