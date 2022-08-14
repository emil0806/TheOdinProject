const container = document.getElementById("container");
let squares = 0;
let resetButton = document.createElement("button");
resetButton.innerHTML = "Reset Grid";
document.body.appendChild(resetButton);
let newColor;

function color() {
  newColor = Math.floor(Math.random() * 16777215).toString(16);
}

function makeRows(_squares) {
  color();
  squares = Number(prompt("How many squares would you like?"));
  const rows = squares;
  const cols = squares;
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  for (c = 0; c < rows * cols; c++) {
    let cell = document.createElement("div");
    container.appendChild(cell).className = "grid-item";
    cell.addEventListener("mouseover", (e) => color());
    cell.addEventListener(
      "mouseover",
      (e) => (e.target.style.backgroundColor = "#" + newColor)
    );
  }
}
resetButton.addEventListener("click", (e) => {
  reset();
});

function reset() {
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((e) => e.parentNode.removeChild(e));
  makeRows(squares);
}

makeRows();
