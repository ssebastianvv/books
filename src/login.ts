import { UserController } from "./controllers/controllers.users.js";

const URL_USERS:string="http://190.147.64.47:5155";

const form     = document.querySelector("form")       as HTMLFormElement;
const email    = document.querySelector("#email")     as HTMLInputElement;
const password = document.querySelector("#password")  as HTMLInputElement;

form.addEventListener("submit",async(e:Event)=>{
    e.preventDefault();//evitar recarga del formulario
    const crudUsers = new UserController(URL_USERS);
    const respuesta = await crudUsers.login(email,password);

    const token : string | null =respuesta.data.token; // le digo si existe o no existe

    if (token){
        alert("login exitoso"+ token)
        localStorage.setItem('authToken',token);//para que lo guarde en authT
        window.location.href = "books.html"; //para rediccionar a otra pagina 
    }
    else{
        alert("login fallo")
    }
    form.reset();
})
