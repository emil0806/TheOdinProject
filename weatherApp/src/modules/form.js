function createForm() {
  const searchBox = document.getElementById("searchBox");

  let cityLabel = document.createElement("label");
  cityLabel.textContent = "Enter a city:";
  cityLabel.setAttribute("for", "cityInput");
  cityLabel.id = "cityLabel";

  let inputDiv = document.createElement("div");
  inputDiv.id = "inputDiv";
  let cityInput = document.createElement("input");
  cityInput.setAttribute("type", "text");
  cityInput.setAttribute("name", "cityInput");
  cityInput.setAttribute("id", "cityInput");

  let submitButton = document.createElement("button");
  submitButton.textContent = "Search";
  submitButton.setAttribute("id", "submitButton");

  inputDiv.appendChild(cityInput);
  inputDiv.appendChild(submitButton);

  searchBox.appendChild(cityLabel);
  searchBox.appendChild(inputDiv);
}

export { createForm };
