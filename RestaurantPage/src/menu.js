import { navBar } from "./navBar.js"
import { foots } from "./navBar.js"
import food2 from './assets/food2.jpg'
import food3 from './assets/food3.jpg'

function createMenuItem(title, text, price) {
    let menuBox = document.getElementById('menuBox')
  
    let name = document.createElement("h4");
    name.textContent = title + " ~ " + price;
    menuBox.appendChild(name);
  
    let details = document.createElement("p");
    details.textContent = text;
    menuBox.appendChild(details);
}

function menu() {
    let content = document.getElementById("content")

    let header = document.createElement('header');
    header.id = "header";
    let container = document.createElement('div');
    container.id = "containerMenu"
    let footer = document.createElement('footer');
    footer.id = "footer"
    content.appendChild(header).className = "header";
    content.appendChild(container).className = "container";
    content.appendChild(footer).className = "footer"
    navBar()
    foots()

    let foodPic2 = document.createElement('img')
    let foodPic3 = document.createElement('img')
    foodPic2.id = 'foodPic2'
    foodPic2.src = food2
    foodPic3.id = 'foodPic3'
    foodPic3.src = food3

    container.appendChild(foodPic2).className = 'foodImg'


    let menuBox = document.createElement('div')
    menuBox.className = "menuBox"
    menuBox.id = "menuBox"
    container.appendChild(menuBox)

    container.appendChild(foodPic3).className = 'foodImg'


    let menuHeader = document.createElement('h1')
    menuHeader.textContent = "Menu"

    let starter = document.createElement('h3')
    starter.textContent = "Starter";
    menuBox.appendChild(starter)

    let starterMenu = [
        {
            name: "Lobster ravioli", 
            text: "Homemade pasta stuffed with fresh lobster",
            price: "20€"
        },
        {
            name: "Salmon tatar", 
            text: "Fresh caught salmon served as a tatar",
            price: "10€"
        },
    ]

    for (let i = 0; i < starterMenu.length; i++) {
        createMenuItem(starterMenu[i].name, starterMenu[i].text, starterMenu[i].price)
    }

    let main = document.createElement('h3')
    main.textContent = "Main"
    menuBox.appendChild(main)

    let mainMenu = [
        {
            name: "Pasta with meatballs", 
            text: "Homemade pasta with fresh tomato sauce and meatballs",
            price: "15€"
        },
        {
            name: "Spaghetti carbonara", 
            text: "Classic carbonara with fresh pasta, pancetta and eggs",
            price: "15€"
        },
    ]

    for (let i = 0; i < mainMenu.length; i++) {
        createMenuItem(mainMenu[i].name, mainMenu[i].text, mainMenu[i].price)
    }

    let dessert = document.createElement('h3')
    dessert.textContent = "Dessert"
    menuBox.appendChild(dessert)

    let dessertMenu = [
        {
            name: "Gateau marcel", 
            text: "French chocolate cake with ice cream.",
            price: "10€"
        },
        {
            name: "Strawberry pie", 
            text: "A slice of homemade strawberry pie",
            price: "10€"
        },
    ]

    for (let i = 0; i < dessertMenu.length; i++) {
        createMenuItem(dessertMenu[i].name, dessertMenu[i].text, dessertMenu[i].price)
    }
    
    
    

}



export {menu}