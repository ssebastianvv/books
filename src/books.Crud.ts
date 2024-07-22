import { CardTemplateController } from "./controllers/CardTemplate.controller.js";
import { BooksController } from "./controllers/books.controllers.js";

const URL_books:string = "http://190.147.64.47:5155";// se podria usar la misma url?
const btnlogOut=document.querySelector("#btn-logout")as HTMLButtonElement;
const prevpage=document.querySelector("#prev-page")as HTMLButtonElement;
const nextPage = document.querySelector("#next-page") as HTMLButtonElement;
const token = localStorage.getItem("authToken");
let currentPage: number=1;
const limit:number=9;


btnlogOut.addEventListener("click",(e:Event)=>{
    localStorage.removeItem("authToken");
    window.location.href="index.html";
})
if(!token){
    alert("Autentication token is missing. please try again");
    window.location.href="index.html";
}else{
    const containerBooks=document.querySelector(".container-books") as HTMLDivElement;
    const form = document.querySelector("form") as HTMLFormElement;
    const title=document.querySelector("#title") as HTMLInputElement;
    const author=document.querySelector("#author") as HTMLInputElement;
    const description = document.querySelector("#description") as HTMLInputElement;
    const summary=document.querySelector("#summary") as HTMLInputElement;
    const publicationDate=document.querySelector("#publication-date") as HTMLInputElement
    let idCatche: undefined|string;

    const cardTemplate = new CardTemplateController(containerBooks);
    
    
    //funcionalidad de las paginas(paginado)
    prevpage.addEventListener("click",async (e:Event)=>{
        if(currentPage >= 1){
           currentPage=currentPage-1;
           await allbooks(limit,currentPage);
        }
       })        
    nextPage.addEventListener("click",async (e:Event)=>{
        if(currentPage >= 1){
           currentPage++  //otra forma de usarlo igual que el de arriba
           await allbooks(limit,currentPage);
        }
       })        
    
    form.addEventListener("submit",async(e:Event)=>{
        e.preventDefault();
        const crudBooks=new BooksController(URL_books);

        if(idCatche===undefined){
            await crudBooks.create(title,author,description,summary,publicationDate,token as string);

        }else{
            await crudBooks.update(idCatche,title,author,description,summary,publicationDate,token as string);
            idCatche=undefined
        }

        form.reset();
        await allbooks(limit,currentPage);
    })

    containerBooks.addEventListener("click",async(e:Event)=>{
        if(e.target instanceof HTMLButtonElement){
            const crudBooks=new BooksController(URL_books);


            if(e.target.classList.contains("btn-warning")){
                idCatche=e.target.dataset.id;

                if (idCatche){
                    const book = await crudBooks.getByid(idCatche, token as string);
                    title.value= book.data.title;
                    author.value=book.data.title;
                    description.value=book.data.description;
                    summary.value=book.data.summary;
                    publicationDate.value=book.data.publicationDate;
                } 

            }else if(e.target.classList.contains("btn-danger")){
                    const bookId= e.target.dataset.id;

                    if (bookId){
                        const confitmDelete = confirm ("are you sure to delete");
                        if (confitmDelete){
                            await crudBooks.delete(bookId,token as string);
                            idCatche=undefined;
                            await allbooks(limit,currentPage);
                        }
                    }
                }
            }
        
    })
    // funcion para pintar los libros 
    async function allbooks(limit:number,currentPage:number) {
        const crudBooks = new BooksController(URL_books);
        try {// se pone el metodo que trae todos los libros 
            const response = await crudBooks.allbooks(token as string, limit, currentPage);
            console.log(`respuesta de allbooks${response}`);
            const books = response.data;

            //la idea es limpiar antes de dibujar

            containerBooks.innerHTML='';

            // recorrer el array y dibujarlos o imprimirlos

            for(const book of books){
                cardTemplate.render(book.id ,book.title,book.author,book.description, book.summary, book.publicationDate);
            }
        } catch (error) {
            console.error("Error fetching books", error);
        }
    }
    allbooks(limit,currentPage)
}