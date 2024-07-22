//iniciamos con quicktipe
export interface IBodyResponseGetAllBooks {
    message: string;
    data:    Datum[];
}

export interface Datum {
    id:        string;
    title:      Role;
    author:      string;
    description:  string;
    summary:     string;
    publicationDate: string;
    createBy: string;
    updatedBy: null;
    deletedBy: null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: null;
    files: any[];
}

export enum Role {
    Admin = "admin",
    User = "user",
}


// esto ya es la parte para crear los libros
export interface BodyRequestCreateBook{
        title : string,
        author: string,
        description: string,
        summary: string,
        publicationDate: string         
}

export interface BodyResponseCreateBook{
    messsage:string,
    data:Record<string, string>;
}


// traer libros por ID

export interface BodyResponseGetByID{
    message:string,
    data:Record<string,string>;

}

// para actualizar el libro se usa una igual a la de arriba se podria reutilizar pero es para entender el orden 
export interface BodyrequestUpdateBook{
    title : string,
    author: string,
    description: string,
    summary: string,
    publicationDate: string   
}

export interface BodyResponseUpdateBook{
    message:string,
    data:Record<string,string>;

}

// para eliimnar

export interface BodyResponseDeleteBook{
    message:string,
    data:null
}

