// ----------- CONTENEDOR LISTAR LIBROS
const container = document.querySelector('.container-books');

// ----------- LISTA DE LIBROS
let books = [];

function listBooks() {
    fetch('../data/books.json')
        .then(response => response.json())
        .then(data => {
            if (!localStorage.getItem('books')) {
                books = data;
                localStorage.setItem('books', JSON.stringify(books));
            } else {
                books = JSON.parse(localStorage.getItem('books'));
            }

            renderBooks();
        })
        .catch(error => console.error('Error al cargar libros:', error));
}

function renderBooks() {
    for (const book of books) {
        container.innerHTML += renderBook(book);
    }
}

function renderBook(book) {
    return `
    <div id=${book.id} class="card card-book">
        <img src=${book.image} alt="Portada ${book.title}" class="book-thumbnail">
        <div class="card-body">
            <h4 class="card-title">${book.title}</h4>
            <p class="card-text">${book.autor}</p>
            <div class="list-group">
                <button type="button" class="btn btn-dark list-group-item" onclick="addToMyBooklist('${book.id}')" id="add-${book.id}">Agregar a mi lista</button>
            </div>
        </div>
    </div>`;
}

listBooks();

//----------- MOSTRAR MI LISTA / ACTUALIZADA SI TIENE LIBROS INGRESADOS
let myListOfBooks = [];

if (localStorage.getItem('listOfBooks')){
    myListOfBooks = JSON.parse(localStorage.getItem('listOfBooks'));
    console.log(myListOfBooks)
    updateButtonState();
    showBooklist();
}

//----------- ACTUALIZAR BOTON DE LA CARD
function updateButtonState() {
    books.forEach((book) => {
        const btnAdd = document.getElementById(`add-${book.id}`);
        if (myListOfBooks.some((item) => item.id === book.id)) {
            btnAdd.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
            btnAdd.disabled = true; 
        } else {
            btnAdd.innerHTML = 'Agregar a mi lista';
            btnAdd.disabled = false; 
        }
    });
}

//----------- ALERT
function showSuccessToast(message) {
    const successToast = new bootstrap.Toast(document.getElementById('success-toast'));
    const toastBody = document.querySelector('#success-toast .toast-body');
    
    toastBody.textContent = message;

    successToast.show();
}


//----------- AGREGAR A LA LISTA    
function addToMyBooklist(id){
    const lectures = books.find((book) => book.id === id);

    if(lectures && !myListOfBooks.some((item) => item.id === id)){
        
        const btnAdd = document.getElementById(`add-${id}`);
        btnAdd.innerHTML = '<i class="fa-solid fa-bookmark"></i>'; //Cambia el texto interior
        btnAdd.disabled = true; //Deshabilita el botón
        
        myListOfBooks.push(lectures);
        localStorage.setItem('listOfBooks', JSON.stringify(myListOfBooks));
        console.log(myListOfBooks);

        showBooklist();
        updateButtonState();
        showSuccessToast(`El libro "${lectures.title}" fué agregado a tu lista.`);
    }
}


//----------- BORRAR LIBRO DE LA LISTA
const BooklistElement = document.querySelector('.booklist');
BooklistElement.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('delete-button')) {
        const idDelete = e.target.getAttribute('data-id');
        deleteBook(idDelete);
    }
});

function deleteBook(id){
    const index = myListOfBooks.findIndex((item) => item.id === id);
    if(index !== -1){
        myListOfBooks.splice(index , 1) // elimina el producto

        localStorage.setItem('listOfBooks',JSON.stringify(myListOfBooks)); //actualiza el carrito

        const BooklistElement = document.querySelector('.booklist'); //Elimina elemento del carrito en el DOM
        const itemElement = document.getElementById(id);

        if(itemElement){
            itemElement.remove();
        }

        showBooklist();
        updateButtonState();
    }
}

//----------- MOSTRAR LISTA
function showBooklist() {
    const BooklistElement = document.querySelector('.booklist');
    BooklistElement.innerHTML = '';

    myListOfBooks.forEach((item) => {
        const BooklistItem = document.createElement('div');
        BooklistItem.classList.add('carrito-item');
        BooklistItem.innerHTML = `
        <div id=${item.id} class="card-booklist">
        <img src=${item.image} alt="Portada ${item.title}" class="booklist-thumbnail">
        <div class="card-body">
            <h4 class="card-title">${item.title}</h4>
            <p class="card-text">${item.autor}</p>
            <div class="list-group">
            <button class="btn btn-outline-warning delete-button" data-id=${item.id}><i class="fa-solid fa-trash"></i> Quitar de mi lista</button>
            </div>
        </div>
    </div>
        `;

        const deleteButton = BooklistItem.querySelector('.delete-button');
        deleteButton.addEventListener('click',() =>{
            deleteBook(item.id);
        });

        BooklistElement.appendChild(BooklistItem);

    })

}

showBooklist();
updateButtonState();


//----------- AGREGAR LIBROS
const formBook = document.querySelector('#form-book');
const message = document.querySelector('#message')

let nextId = parseInt(localStorage.getItem('nextId')) || 1; //GUARDA LA NUEVA ID PARA USARLA DE REFERENCIA AUNQUE SE RECARGUE LA PAGINA

formBook.addEventListener('submit', addBook);

function generateUniqueId() { //GENERA UNA ID UNICA
    const newId = `book-${nextId++}`;
    localStorage.setItem('nextId', nextId); 
    return newId;
}

function addBook(e){
    e.preventDefault();

    const title = formBook.title.value;
    const autor = formBook.autor.value; 
    const image = formBook.image.value;  

    if(title && autor && image){
        const newBook = {
            id: generateUniqueId(),
            title,
            autor,
            image,
        }

        books.push(newBook); //AGREGA A LA LISTA DE LIBROS

        localStorage.setItem('books', JSON.stringify(books)); //GUARDA EN EL LOCAL STORAGE

        container.innerHTML += renderBook(newBook); //RENDERIZA EL NUEVO LIBRO EN EL CONTENEDOR

        formBook.reset();
        message.innerHTML = `<div class="alert alert-success container-fluid col-6" role="alert">${newBook.title}, agregado con exito!</div>`
    } else {
        message.innerHTML = `<div class="alert alert-danger container-fluid col-6" role="alert">Por favor. Completa todos los campos.</div>`
    }

}


showBooklist();
updateButtonState();