// segunda parte 
import { BodyRequestLogin,BodyResponseLogin } from "../models/auth.model"; // no se pone js porque no traspilan entonces no es necesario en este caso 

//CRUD crear editar eliminar y buscar
//toca mandarle primero el enpoint
export class UserController{
 public domain: string; // el dominio son los numeros como el ip por asi decirlo
 
   constructor(domain:string) { //
    this.domain = domain; // toca con this y se hace para crearlo 
   }

   async login (email:HTMLInputElement,password:HTMLInputElement): Promise<BodyResponseLogin> { //se manda input para que tome lo que sale de  los input
       const userData: BodyRequestLogin ={  // el body requ es para tipar y decir que trae o que necesita 
        email: email.value,// ´porque .value porque como son input a mi lo que me interesa es el valor del input no el input como tal 
        password : password.value
       };
       const headers: Record<string,string>={
        // aca los -h en la parte del swager en el cur agarro los -h
        'accept': '*/*',
        'Content-Type':'application/json',
       };
       const reqOptions: RequestInit={
        method:"POST",//metodo post porque es el login 
        headers:headers,
        body:JSON.stringify(userData)
       };
       const response:Response=await fetch(`${this.domain}/api/v1/auth/login`,reqOptions) // recordar no dejar espacio porque al intentar buscar no daria 

       if(!response.ok){
            console.log(`response body: ${(await response.json()).message}`)
            throw new Error (`Error: ${response.status}: ${response.statusText}`)//throw capturar el error
       };

       const responseBodyLogin: BodyResponseLogin= await response.json();
       return responseBodyLogin;
}
}
