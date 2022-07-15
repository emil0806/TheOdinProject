let myLibrary = [];
let numberOfBooks = 0;

const container = document.getElementById("container");

const titleInput = document.getElementById('newTitle');
const authorInput = document.getElementById('newAuthor');
const pagesInput = document.getElementById('newPages');
const readInput = document.getElementById('newRead');

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
    displayBooks()

    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readInput.checked = false;
    
    numberOfBooks++;
}

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

function readStatus(i) {
    if (myLibrary[i].read === 'on') {
        myLibrary[i].read = 'off';
    } 
    else {
        myLibrary[i].read = 'on';
    }
}

function displayBooks() {
    for(i = numberOfBooks; i < myLibrary.length; i++) {
        let card = document.createElement('div');
        card.dataset.index = i;

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

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
    
        card.appendChild(label);
        card.appendChild(readCheck);
        card.appendChild(br)
        card.appendChild(deleteButton).className = "deleteButton";
        container.appendChild(card).className = "book-card";

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
        
        readCheck.addEventListener('click', () => {
            readStatus(card.dataset.index)
        })
        
    }
    
}


function openForm() {
    document.getElementById("formContainer").style.display = "block";
  }

function closeForm() {
    document.getElementById("formContainer").style.display = "none";
  }


