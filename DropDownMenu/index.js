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

// Image slider

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

let myTimer;

function startTimer() {
  myTimer = setInterval(function () {
    plusSlides(1);
  }, 5000);
}
startTimer();

function stopTimer() {
  clearInterval(myTimer);
  startTimer();
}
