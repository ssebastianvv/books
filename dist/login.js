var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserController } from "./controllers/controllers.users.js";
const URL_USERS = "http://190.147.64.47:5155";
const form = document.querySelector("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault(); //evitar recarga del formulario
    const crudUsers = new UserController(URL_USERS);
    const respuesta = yield crudUsers.login(email, password);
    const token = respuesta.data.token; // le digo si existe o no existe
    if (token) {
        alert("login exitoso" + token);
        localStorage.setItem('authToken', token); //para que lo guarde en authT
        window.location.href = "books.html"; //para rediccionar a otra pagina 
    }
    else {
        alert("login fallo");
    }
    form.reset();
}));
