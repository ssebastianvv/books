import { BodyRequestCreateBook, BodyResponseCreateBook, IBodyResponseGetAllBooks } from "../models/books.models";

export class BooksController{
    public domain: string;

    constructor(domain:string){
        this.domain = domain;
    };

    async allbooks(token: string, limit:number,page:number): Promise<IBodyResponseGetAllBooks>{
        const headers: Record <string,string> ={
            "accept": "*/*", //esto significa que es string string y por esso se ccoloca asi 
            "Content-type":"application/json",
            "Authorization": `Bearer ${token}`, 

        };

        const reqOption: RequestInit={
            method: "GET", // cuando es get no se manda body por el metodo basicamente estamos buscando en servidor entonces no se manda nada 
            headers: headers
        }
        const response:Response = await fetch (`${this.domain}/api/vq/books?limit=${limit}&page=${page}`, reqOption)
            console.log(response);
            if(!response.ok){  //esto hace verlo si es booleano y dependiendo de la respuesta que mande me saca el error o no 
                throw new Error(`error al obtener libros: ${response.status}:${response.statusText}`)
            }
            const responseBodyGetAllBooks:IBodyResponseGetAllBooks = await response.json();
            return responseBodyGetAllBooks;
    }
// esta es la parte de crear el libro o subir un libro es necesario el token para que funcione
    async create(title:HTMLInputElement,author:HTMLInputElement,description:HTMLInputElement,summary:HTMLInputElement,publicationDate:HTMLInputElement,token:string):Promise<BodyResponseCreateBook>{
        const newBook:BodyRequestCreateBook ={
            title : title.value,
            author:author.value,
            description:description.value,
            summary:summary.value,
            publicationDate:publicationDate.value
        };

        const headers:Record<string,string> = {
            "accept": "*/*", //esto significa que es string string y por esso se ccoloca asi 
            "Content-type":"application/json",
            "Authorization": `Bearer ${token}`, 

        };

        const reqOption :RequestInit={
            method: "POST",
            headers:headers,
            body:JSON.stringify(newBook)
        };

        const response:Response = await fetch(`${this.domain}/api/v1/books`)
    
        if(!response.ok){  //esto hace verlo si es booleano y dependiendo de la respuesta que mande me saca el error o no 
            throw new Error(`error al obtener libros: ${response.status}:${response.statusText}`)
        }
        const responseBodyCreateBooks:BodyResponseCreateBook = await response.json();
        return responseBodyCreateBooks;
    }
// traer un libro por ID

async 


}