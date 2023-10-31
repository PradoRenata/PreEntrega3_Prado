const books = [
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
        id: 'a128',
        title: 'Los hijos de Húrin',
        autor: 'J.R.R Tolkien',
        image: 'https://images.cdn3.buscalibre.com/fit-in/360x360/60/a5/60a5fe0237975ca21e1e950c586c3307.jpg',
    },
    {
        id: 'a128',
        title: 'La mujer que soy',
        autor: 'Britney Spears',
        image: 'https://images.cdn1.buscalibre.com/fit-in/360x360/d2/ae/d2aebc204783107b162198290118bee9.jpg',
    },
];

//----------- LISTAR LIBROS 
const container = document.querySelector('.container-books');

for (const book of books) {
    container.innerHTML += `
    <div id=${book.id} class="card card-book">
        <img src=${book.image} alt="Portada ${book.title}" class="book-thumbnail">
        <div class="card-body">
            <h4 class="card-title">${book.title}</h4>
            <p class="card-text">${book.autor}</p>
            <div class="list-group">
                <button type="button" class="btn btn-dark list-group-item" onclick="AddToMyList('${book.id}')" id="add-${book.id}">Agregar a mi lista</button>
            </div>
        </div>
    </div>`;}