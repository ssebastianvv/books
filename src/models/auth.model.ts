// primera parte

//desde el auth loguearse


// lo que ando pidiendo para poder logearse 
export interface BodyRequestLogin{
    email: string,
    password: string  
}


// interface de lo que me regresa 
export interface BodyResponseLogin{
    message:string,
    data:Record<string,string>    // siempre que sea un objeto y este en comillas es doble string
}

