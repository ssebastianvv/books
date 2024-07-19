//iniciamos con quicktipe
export interface IBodyResponseGetAllBooks {
    message: string;
    data:    Datum[];
}

export interface Datum {
    id:        string;
    role:      Role;
    name:      string;
    lastName:  string;
    email:     string;
    updatedBy: null | string;
    deletedBy: null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: null;
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