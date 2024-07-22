var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CardTemplateController } from "./controllers/CardTemplate.controller.js";
import { BooksController } from "./controllers/books.controllers.js";
const URL_books = "http://190.147.64.47:5155"; // se podria usar la misma url?
const btnlogOut = document.querySelector("#btn-logout");
const prevpage = document.querySelector("#prev-page");
const nextPage = document.querySelector("#next-page");
const token = localStorage.getItem("authToken");
let currentPage = 1;
const limit = 9;
btnlogOut.addEventListener("click", (e) => {
    localStorage.removeItem("authToken");
    window.location.href = "index.html";
});
if (!token) {
    alert("Autentication token is missing. please try again");
    window.location.href = "index.html";
}
else {
    const containerBooks = document.querySelector(".container-books");
    const form = document.querySelector("form");
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const description = document.querySelector("#description");
    const summary = document.querySelector("#summary");
    const publicationDate = document.querySelector("#publication-date");
    let idCatche;
    const cardTemplate = new CardTemplateController(containerBooks);
    //funcionalidad de las paginas(paginado)
    prevpage.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (currentPage >= 1) {
            currentPage = currentPage - 1;
            yield allbooks(limit, currentPage);
        }
    }));
    nextPage.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (currentPage >= 1) {
            currentPage++; //otra forma de usarlo igual que el de arriba
            yield allbooks(limit, currentPage);
        }
    }));
    form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const crudBooks = new BooksController(URL_books);
        if (idCatche === undefined) {
            yield crudBooks.create(title, author, description, summary, publicationDate, token);
        }
        else {
            yield crudBooks.update(idCatche, title, author, description, summary, publicationDate, token);
            idCatche = undefined;
        }
        form.reset();
        yield allbooks(limit, currentPage);
    }));
    containerBooks.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (e.target instanceof HTMLButtonElement) {
            const crudBooks = new BooksController(URL_books);
            if (e.target.classList.contains("btn-warning")) {
                idCatche = e.target.dataset.id;
                if (idCatche) {
                    const book = yield crudBooks.getByid(idCatche, token);
                    title.value = book.data.title;
                    author.value = book.data.title;
                    description.value = book.data.description;
                    summary.value = book.data.summary;
                    publicationDate.value = book.data.publicationDate;
                }
            }
            else if (e.target.classList.contains("btn-danger")) {
                const bookId = e.target.dataset.id;
                if (bookId) {
                    const confitmDelete = confirm("are you sure to delete");
                    if (confitmDelete) {
                        yield crudBooks.delete(bookId, token);
                        idCatche = undefined;
                        yield allbooks(limit, currentPage);
                    }
                }
            }
        }
    }));
    // funcion para pintar los libros 
    function allbooks(limit, currentPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const crudBooks = new BooksController(URL_books);
            try { // se pone el metodo que trae todos los libros 
                const response = yield crudBooks.allbooks(token, limit, currentPage);
                console.log(`respuesta de allbooks${response}`);
                const books = response.data;
                //la idea es limpiar antes de dibujar
                containerBooks.innerHTML = '';
                // recorrer el array y dibujarlos o imprimirlos
                for (const book of books) {
                    cardTemplate.render(book.id, book.title, book.author, book.description, book.summary, book.publicationDate);
                }
            }
            catch (error) {
                console.error("Error fetching books", error);
            }
        });
    }
    allbooks(limit, currentPage);
}
