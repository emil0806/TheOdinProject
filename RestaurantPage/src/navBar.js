import {clearContent} from './clearContent.js'
import {home} from './home.js'
import {menu} from './menu.js'
import {about} from './about.js'
import {contact} from './contact.js'


function navBar() {
    let header = document.getElementById('header')
    
    let navHome = document.createElement('a')
    navHome.textContent = "Home"
    let navMenu = document.createElement('a')
    navMenu.textContent = "Menu"
    let navAbout = document.createElement('a')
    navAbout.textContent = "About"
    let navContact = document.createElement('a')
    navContact.textContent = "Contact"

    header.appendChild(navHome).id = 'navHome'
    header.appendChild(navMenu).id = 'navMenu'
    header.appendChild(navAbout).id = 'navAbout'
    header.appendChild(navContact).id = 'navContact'

    navHome.addEventListener('click', function() {
        clearContent()
        home()
    })
    navMenu.addEventListener('click', function() {
        clearContent()
        menu()
    })
    navAbout.addEventListener('click', function() {
        clearContent()
        about()
    })
    navContact.addEventListener('click', function() {
        clearContent()
        contact()
    })
}

function foots() {
    let footer = document.getElementById('footer')
    let footText = document.createElement('h5')
    footText.textContent = "Please contact us on phone for reservation."
    footer.appendChild(footText).id = 'footText'
}

export {navBar}
export {foots}