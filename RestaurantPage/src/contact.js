import { navBar } from "./navBar.js"
import { foots } from "./navBar.js"

function contact() {
    let content = document.getElementById("content")

    let header = document.createElement('header');
    header.id = "header";
    let container = document.createElement('div');
    container.id = "containerContact"
    let footer = document.createElement('footer');
    footer.id = "footer"
    content.appendChild(header).className = "header";
    content.appendChild(container).className = "container";
    content.appendChild(footer).className = "footer"
    navBar()
    foots()

    let contactBox = document.createElement('div')
    contactBox.className = 'contactBox'
    container.appendChild(contactBox)

    let phoneHeader = document.createElement('h4');
    phoneHeader.id = 'phoneHeader'
    phoneHeader.textContent = 'Phone number:'
    contactBox.appendChild(phoneHeader)

    let phone = document.createElement('p')
    phone.id = 'phone'
    phone.textContent = '+12 3456 7891'
    contactBox.appendChild(phone)

    let mailHeader = document.createElement('h4')
    mailHeader.id = 'mailheader'
    mailHeader.textContent = 'Email:'
    contactBox.appendChild(mailHeader)

    let mail = document.createElement('p')
    mail.id = 'mail'
    mail.textContent = 'thisIsARealMail@soTrue.com'
    contactBox.appendChild(mail)
}

export {contact}