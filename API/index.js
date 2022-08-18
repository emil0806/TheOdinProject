const img = document.querySelector("img");
const changeGif = document.getElementById("changeGif");
const searchBtn = document.getElementById("search");
const errorContainer = document.getElementById("errorContainer");

let anotherGif = "";

function getImage(anotherGif) {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=WSHEqNXhd3wXH9mcqeJOYNceifUIQwLI&s=${anotherGif}`,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      img.src = response.data.images.original.url;
    });
}

function searchImg(searchText) {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=WSHEqNXhd3wXH9mcqeJOYNceifUIQwLI&s=${searchText}`,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      img.src = response.data.images.original.url;
    })
    .catch(function (error) {
      let errorText = document.createElement("h3");
      errorText.textContent = "No GIF with that name. Try something else!";
      errorText.id = "errorText";

      errorContainer.appendChild(errorText);
    });
}
changeGif.addEventListener("click", () => {
  errorContainer.innerHTML = "";
  getImage(anotherGif);
});

searchBtn.addEventListener("click", () => {
  let searchText = document.getElementById("searchText").value;
  errorContainer.innerHTML = "";
  if (searchText != "") {
    anotherGif = searchText;
  } else {
    anotherGif = anotherGif;
  }
  searchImg(searchText);
  document.getElementById("searchText").value = "";
});

window.onload = function () {
  getImage();
  anotherGif = "cats";
};
