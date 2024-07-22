var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class BooksController {
    constructor(domain) {
        this.domain = domain;
    }
    ;
    allbooks(token, limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "accept": "*/*", //esto significa que es string string y por esso se ccoloca asi 
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            };
            const reqOption = {
                method: "GET", // cuando es get no se manda body por el metodo basicamente estamos buscando en servidor entonces no se manda nada 
                headers: headers
            };
            const response = yield fetch(`${this.domain}/api/v1/books?limit=${limit}&page=${page}`, reqOption);
            console.log(response);
            if (!response.ok) { //esto hace verlo si es booleano y dependiendo de la respuesta que mande me saca el error o no 
                throw new Error(`error al obtener libros: ${response.status}:${response.statusText}`);
            }
            const responseBodyGetAllBooks = yield response.json();
            return responseBodyGetAllBooks;
        });
    }
    // esta es la parte de crear el libro o subir un libro es necesario el token para que funcione
    create(title, author, description, summary, publicationDate, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBook = {
                title: title.value,
                author: author.value,
                description: description.value,
                summary: summary.value,
                publicationDate: publicationDate.value
            };
            const headers = {
                "accept": "*/*", //esto significa que es string string y por esso se ccoloca asi 
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            };
            const reqOption = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(newBook)
            };
            const response = yield fetch(`${this.domain}/api/v1/books`, reqOption);
            if (!response.ok) { //esto hace verlo si es booleano y dependiendo de la respuesta que mande me saca el error o no 
                throw new Error(`error al obtener libros: ${response.status}:${response.statusText}`);
            }
            const responseBodyCreateBooks = yield response.json();
            return responseBodyCreateBooks;
        });
    }
    // traer un libro por ID
    getByid(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "accept": "*/*", //esto significa que es string string y por esso se ccoloca asi 
                "Authorization": `Bearer ${token}`,
            };
            const reqOption = {
                method: "GET", // cuando es get no se manda body por el metodo basicamente estamos buscando en servidor entonces no se manda nada 
                headers: headers
            };
            const response = yield fetch(`${this.domain}/api/v1/books/${id}`, reqOption);
            if (!response.ok) { //esto hace verlo si es booleano y dependiendo de la respuesta que mande me saca el error o no 
                throw new Error(`error al obtener libros: ${response.status}:${response.statusText}`);
            }
            const responseBodyGetByID = yield response.json();
            return responseBodyGetByID;
        });
    }
    ;
    update(idCatche, title, author, description, summary, publicationDate, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateBook = {
                title: title.value,
                author: author.value,
                description: description.value,
                summary: summary.value,
                publicationDate: publicationDate.value
            };
            const headers = {
                "accept": "*/*", //esto significa que es string string y por esso se ccoloca asi 
                "Content-Type": "application/json", // cambie la t
                "Authorization": `Bearer ${token}`,
            };
            const reqOption = {
                method: "PATCH",
                headers: headers,
                body: JSON.stringify(updateBook)
            };
            const response = yield fetch(`${this.domain}/api/v1/books/${idCatche}`, reqOption); //agregue
            if (!response.ok) { //esto hace verlo si es booleano y dependiendo de la respuesta que mande me saca el error o no 
                throw new Error(`error al obtener libros: ${response.status}:${response.statusText}`);
            }
            const responseBodyUpdateBook = yield response.json();
            return responseBodyUpdateBook;
        });
    }
    ;
    // eliminar o borrar 
    delete(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "accept": "*/*", //esto significa que es string string y por esso se ccoloca asi 
                "Authorization": `Bearer ${token}`,
            };
            const reqOption = {
                method: "DELETE", // cuando es get no se manda body por el metodo basicamente estamos buscando en servidor entonces no se manda nada 
                headers: headers
            };
            const response = yield fetch(`${this.domain}/api/v1/books/${id}`, reqOption);
            if (!response.ok) { //esto hace verlo si es booleano y dependiendo de la respuesta que mande me saca el error o no 
                throw new Error(`error al obtener libros: ${response.status}:${response.statusText}`);
            }
            const BodyResponseDeleteBook = yield response.json();
            return BodyResponseDeleteBook;
        });
    }
}
