const container = document.querySelector("#container");

const para = document.createElement("p");
para.textContent = "Hey I'm red!";
para.style.color = "red";
container.appendChild(para);

const header = document.createElement("h3");
header.textContent = "I'm a blue h3!";
header.style.color = "blue";
container.appendChild(header);

const content = document.createElement("div");
content.classList.add("content");
content.style.cssText = "color: black; background: pink; border: solid";
container.appendChild(content);

const header1 = document.createElement("h1");
header1.textContent = "I'm in a div";
content.appendChild(header1);

const para2 = document.createElement("p");
para2.textContent = "ME TOO!";
content.appendChild(para2);

const btn = document.querySelector("#btn");
btn.addEventListener("click", function (e) {
  e.target.style.background = "blue";
});
