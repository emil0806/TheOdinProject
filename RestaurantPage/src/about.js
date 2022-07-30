import { navBar } from "./navBar.js"
import { foots } from "./navBar.js"
import food4 from "./assets/food4.jpg"

function about() {
    let content = document.getElementById("content")

    let header = document.createElement('header');
    header.id = "header";
    let container = document.createElement('div');
    container.id = "containerAbout"
    let footer = document.createElement('footer');
    footer.id = "footer"
    content.appendChild(header).className = "header";
    content.appendChild(container).className = "container";
    content.appendChild(footer).className = "footer"
    navBar()
    foots()
    
    let picDiv = document.createElement('div')
    picDiv.className = "picDiv"
    container.appendChild(picDiv)

    let aboutBox = document.createElement('div')
    aboutBox.className = 'aboutBox'
    container.appendChild(aboutBox)
    
    let aboutPic = document.createElement('img')
    aboutPic.id = 'aboutPic'
    aboutPic.src = food4
    picDiv.appendChild(aboutPic)

    let aboutHeader = document.createElement('h2')
    aboutHeader.textContent = "A passion for authentic food."
    aboutBox.appendChild(aboutHeader)

    let firstPara = document.createElement('p')
    firstPara.textContent = "It has been a dream for a long time to open a restaurant, and finally the dream is possible." 
    aboutBox.appendChild(firstPara)

    let secondPara = document.createElement('p')
    secondPara.textContent = `Food has always had a huge impact on our family, especially the french and italian cuisine.
    We have been on vacation in both countries a lot of times, and the food is just outstanding everytime.
    Therefore we are so happy to be able open this restaurant and share the love of italian food with you.`
    aboutBox.appendChild(secondPara)

    let thirdPara = document.createElement('p')
    thirdPara.textContent = `We really look forward to welcoming you and giving you a one of kind experience.`
    aboutBox.appendChild(thirdPara)
}

export {about}