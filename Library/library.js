/* Create array with library, and keep track of number of books */
let myLibrary = [];
let numberOfBooks = 0;

/* Gets elements from html. Container where the book cards will go, and the inputs form the form */
const container = document.getElementById("container");

const titleInput = document.getElementById('newTitle');
const authorInput = document.getElementById('newAuthor');
const pagesInput = document.getElementById('newPages');
const readInput = document.getElementById('newRead');

/* Using class to create object to store book */
class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}
/* Adding new book to library */
function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
    displayBooks()

    /* Reseting values in form */
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readInput.checked = false;
    
    /* Increasing number of books */
    numberOfBooks++;
}

/* Gets book data from form, adding values to function and closing form */
function getBook() {
    if(readInput.checked) {
        readInput.value = 'on'
    }
    else {
        readInput.value = 'off'
    }
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value)
    closeForm()
}
/* Updates the read status when box gets toggle  */
function readStatus(i) {
    if (myLibrary[i].read === 'on') {
        myLibrary[i].read = 'off';
    } 
    else {
        myLibrary[i].read = 'on';
    }
}

/* Display books with looping through library array */
function displayBooks() {
    for(i = numberOfBooks; i < myLibrary.length; i++) {
        let card = document.createElement('div');
        /* Setting dataset.index for card, so every card has own data-attribute */
        card.dataset.index = i;

        /* Creating elements inside card.
        text, checkbox and button. And setting dataset for read status */
        let title = document.createElement('h3');
        title.textContent = myLibrary[i].title;
        let author = document.createElement('h6');
        author.textContent = myLibrary[i].author;
        let pages = document.createElement('h6');
        pages.textContent = myLibrary[i].pages;
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = "Delete book";
        let readCheck = document.createElement('input');
        readCheck.type = 'checkbox';
        readCheck.id = 'readCheck';
        readCheck.dataset.index = i;
        if(readInput.checked == false) {
            readCheck.checked = false;
        }
        else {
            readCheck.checked = true;
        }
        
        let label = document.createElement('label');
        label.id = 'labelCheck'
        label.htmlFor = 'readCheck';
        label.appendChild(document.createTextNode('Read:'))
        let br = document.createElement('br')
        
        /* Appending elements to card, and card to contatiner */
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
    
        card.appendChild(label);
        card.appendChild(readCheck);
        card.appendChild(br)
        card.appendChild(deleteButton).className = "deleteButton";
        container.appendChild(card).className = "book-card";

        /* Creating eventListener for deleteButton.
        Click on button will remove card from library using its dataset.index.
        It will also decrease numberOfBooks and update dataset.index */
        deleteButton.addEventListener('click', () => {
            myLibrary.splice(card.dataset.index, 1);
            container.removeChild(card);
            numberOfBooks--;
            let children = Array.from(container.childNodes);
            children.shift()
			for (let i = 0; i < children.length; i++) {
				children[i].dataset.index = i;
            }
        })
        /* Creating eventListener to readCheck toggle */
        readCheck.addEventListener('click', () => {
            readStatus(card.dataset.index)
        })
        
    }
    
}

/* Open form */
function openForm() {
    document.getElementById("formContainer").style.display = "block";
}
/* Close form */
function closeForm() {
    document.getElementById("formContainer").style.display = "none";
}


