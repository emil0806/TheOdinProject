function renderPage() {
  let container = document.createElement("div");
  container.setAttribute("id", "container");
  container.setAttribute("class", "container");

  let gameContainer = document.createElement("div");
  gameContainer.setAttribute("id", "gameContainer");
  gameContainer.setAttribute("class", "gameContainer");

  let boardContainer1 = document.createElement("div");
  boardContainer1.setAttribute("class", "boardContainer");

  let boardContainer2 = document.createElement("div");
  boardContainer2.setAttribute("class", "boardContainer");

  let board = document.createElement("table");
  board.setAttribute("class", "board");

  for (let i = 0; i < 10; i++) {
    let row = board.insertRow(i);
    for (let j = 0; j < 10; j++) {
      let cell = row.insertCell(j);
      cell.innerHTML = "";
      cell.setAttribute("class", "cell");
    }
  }

  boardContainer1.appendChild(board).id = "board1";
  boardContainer2.appendChild(board.cloneNode(true)).id = "board2";

  gameContainer.appendChild(boardContainer1).id = "boardContainer1";
  gameContainer.appendChild(boardContainer2).id = "boardContainer2";

  let header = document.createElement("div");
  header.setAttribute("id", "header");
  header.setAttribute("class", "header");

  let title = document.createElement("h2");
  title.setAttribute("id", "title");
  title.textContent = "Battleship";

  header.appendChild(title);

  let footer = document.createElement("div");
  footer.setAttribute("id", "footer");
  footer.setAttribute("class", "footer");

  let footerText = document.createElement("h4");
  footerText.textContent = "Rules of battleship";

  footer.appendChild(footerText);

  container.appendChild(header);
  container.appendChild(gameContainer);
  container.appendChild(footer);

  document.body.appendChild(container);
}

export { renderPage };
