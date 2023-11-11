const defaultBooks = [
    {
        id: 'a123',
        title: 'Cien años de soledad',
        autor: 'Gabriel García Márquez',
        image: 'https://images.cdn3.buscalibre.com/fit-in/360x360/b9/d5/b9d5d415d11423d0f9e98074ee6997d9.jpg',
    },
    {
        id: 'a124',
        title: 'Tengo miedo torero',
        autor: 'Pedro Lemebel',
        image: 'https://images.cdn3.buscalibre.com/fit-in/360x360/be/99/be990f369aaedd92ce55ad2c925a60e2.jpg',
    },
    {
        id: 'a125',
        title: 'Solanin',
        autor: 'Inio Asano',
        image: 'https://images.cdn2.buscalibre.com/fit-in/360x360/52/7d/527d3ed4471d0f801a5df62d963a1e84.jpg',
    },
    {
        id: 'a126',
        title: 'Trilogía de la fundación',
        autor: 'Isaac Asimov',
        image: 'https://images.cdn3.buscalibre.com/fit-in/360x360/b1/6d/b16d510807679d5fe523b96c5a90f14e.jpg',
    },
    {
        id: 'a127',
        title: 'Armada',
        autor: 'Ernest Cline',
        image: 'https://images.cdn3.buscalibre.com/fit-in/360x360/32/5e/325e77f76321dab3d567479347573c87.jpg',
    },
    {
        id: 'a128',
        title: 'Carrie',
        autor: 'Stephen King',
        image: 'https://images.cdn1.buscalibre.com/fit-in/360x360/46/80/4680f1138f6d913f1dcade06b4c06e4b.jpg',
    },
    {
        id: 'a129',
        title: 'Los hijos de Húrin',
        autor: 'J.R.R Tolkien',
        image: 'https://images.cdn3.buscalibre.com/fit-in/360x360/60/a5/60a5fe0237975ca21e1e950c586c3307.jpg',
    },
    {
        id: 'a120',
        title: 'La mujer que soy',
        autor: 'Britney Spears',
        image: 'https://images.cdn1.buscalibre.com/fit-in/360x360/d2/ae/d2aebc204783107b162198290118bee9.jpg',
    },
    {
        id: 'a121',
        title: 'Humano Es',
        autor: 'Philip K. Dick',
        image: 'https://images.cdn3.buscalibre.com/fit-in/360x360/7a/95/7a95f2681a07bbf37e6108a906c43ccb.jpg',
    },
];

//----------- LISTAR LIBROS 
let books = [];

// ----------- CONTENEDOR LISTAR LIBROS
const container = document.querySelector('.container-books');

// Intenta obtener la lista de libros del localStorage
const storedBooks = localStorage.getItem('books');

// Usa la lista predeterminada si no hay libros en el localStorage
books = storedBooks ? JSON.parse(storedBooks) : defaultBooks;

for (const book of books) {
    container.innerHTML += `
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

let nextId = 1;

formBook.addEventListener('submit', addBook);

function addBook(e){
    e.preventDefault();

    const title = formBook.title.value;
    const autor = formBook.autor.value; 
    const image = formBook.image.value;  

    if(title && autor && image){
        const newBook = {
            id: `book-${nextId}`,
            title,
            autor,
            image,
        }

        books.push(newBook);

        localStorage.setItem('books', JSON.stringify(books));

        container.innerHTML += ` 
        <div id=${newBook.id} class="card card-book">
        <img src=${newBook.image} alt="Portada ${newBook.title}" class="book-thumbnail">
        <div class="card-body">
            <h4 class="card-title">${newBook.title}</h4>
            <p class="card-text">${newBook.autor}</p>
            <div class="list-group">
                <button type="button" class="btn btn-dark list-group-item" onclick="addToMyBooklist('${newBook.id}')" id="add-${newBook.id}">Agregar a mi lista</button>
            </div>
        </div>
    </div>`;

        nextId++;

        formBook.reset();

        message.innerHTML = `<div class="alert alert-success container-fluid col-6" role="alert">${newBook.title}, agregado con exito!</div>`
    } else {
        message.innerHTML = `<div class="alert alert-danger container-fluid col-6" role="alert">Por favor. Completa todos los campos.</div>`
    }

}

showBooklist();
updateButtonState();
