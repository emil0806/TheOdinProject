import { navBar } from "./navBar.js"
import { foots } from "./navBar.js"
import food1 from './assets/food1.jpg'

function home() {
    let content = document.getElementById("content")

    let header = document.createElement('header');
    header.id = "header";
    let container = document.createElement('div');
    container.id = "container"
    let footer = document.createElement('footer');
    footer.id = "footer"
    content.appendChild(header).className = "header";
    content.appendChild(container).className = "container";
    content.appendChild(footer).className = "footer"
    
    navBar()
    foots()

    let foodPic = document.createElement('img')
    foodPic.src = food1
    container.appendChild(foodPic).className = 'img'

    let headline = document.createElement('h1')
    headline.textContent = "El Jefe"
    container.appendChild(headline).id = "headline"
    let subHeadline = document.createElement('h3');
    subHeadline.textContent = "Italian food with a nordic twist"
    container.appendChild(subHeadline).id = "subHeadline"
}

export {home}