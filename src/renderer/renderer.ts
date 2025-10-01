const headline = document.getElementById("headline");

if (headline) {
  headline.animate(
    [
      { transform: "scale(0.98)", opacity: 0.8 },
      { transform: "scale(1.02)", opacity: 1 },
      { transform: "scale(1)", opacity: 0.95 },
    ],
    {
      duration: 4000,
      iterations: Infinity,
      easing: "ease-in-out",
    }
  );
}

window.addEventListener("keydown", (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "r") {
    event.preventDefault();
  }
});
