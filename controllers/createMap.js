export function createMap(id, container, evento) {
  const size = parseInt(localStorage.getItem("size"));

  const vocales = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
  ];
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const div = document.createElement("div");
      div.classList.add("celda", "header");
      div.classList.remove("header");
      div.id = `${id}-${i}-${j}`;

      evento(div);
      container.appendChild(div);
    }
  }
}
