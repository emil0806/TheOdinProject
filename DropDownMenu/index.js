const dropDownContent = document.getElementById("dropDown-content");

function toggleFunction() {
  dropDownContent.style.display = "block";
}

window.addEventListener("click", function (e) {
  if (!document.getElementById("dropDown").contains(e.target)) {
    dropDownContent.style.display = "none";
  } else {
    return;
  }
});
