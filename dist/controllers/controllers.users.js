var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//CRUD crear editar eliminar y buscar
//toca mandarle primero el enpoint
export class UserController {
    constructor(domain) {
        this.domain = domain; // toca con this y se hace para crearlo 
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = {
                email: email.value, // ´porque .value porque como son input a mi lo que me interesa es el valor del input no el input como tal 
                password: password.value
            };
            const headers = {
                // aca los -h en la parte del swager en el cur agarro los -h
                'accept': '*/*',
                'Content-Type': 'application/json',
            };
            const reqOptions = {
                method: "POST", //metodo post porque es el login 
                headers: headers,
                body: JSON.stringify(userData)
            };
            const response = yield fetch(`${this.domain}/api/v1/auth/login`, reqOptions); // recordar no dejar espacio porque al intentar buscar no daria 
            if (!response.ok) {
                console.log(`response body: ${(yield response.json()).message}`);
                throw new Error(`Error: ${response.status}: ${response.statusText}`); //throw capturar el error
            }
            ;
            const responseBodyLogin = yield response.json();
            return responseBodyLogin;
        });
    }
}
