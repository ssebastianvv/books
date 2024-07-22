export class CardTemplateController {
    constructor(containerbooks) {
        this.containerBooks = containerbooks;
    }
    // guia estilos 
    render(id, title, author, description, summary, publicationDate) {
        const figure = document.createElement("figurre");
        figure.classList.add("card", "col-4"); //recordar que esto es tipo bustrap
        const h2 = document.createElement("h2");
        h2.classList.add("card-title", "text-center");
        h2.textContent = title;
        figure.appendChild(h2);
        const h4 = document.createElement("h4");
        h4.classList.add("card-title", "text-center");
        h4.textContent = author;
        figure.appendChild(h4);
        const figcaption = document.createElement("figcaption");
        figcaption.classList.add("card-body", "bg-light", "text-dark");
        figure.appendChild(figcaption);
        const h5 = document.createElement("h5");
        h5.classList.add("card-title", "text-center");
        h5.textContent = description;
        figcaption.appendChild(h5);
        const p = document.createElement("p");
        p.classList.add("card-title", "text-center");
        p.textContent = summary;
        figcaption.appendChild(p);
        const h6 = document.createElement("h6");
        h6.classList.add("card-title", "text-center");
        h6.textContent = publicationDate;
        figcaption.appendChild(h6);
        // desde aca dejar quieto
        const div = document.createElement("div");
        div.classList.add("d-flex");
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btn", "btn-warning");
        btnEdit.textContent = "edit";
        btnEdit.type = "button";
        btnEdit.dataset.id = id;
        const btnDelete = document.createElement("button");
        btnDelete.classList.add("btn", "btn-danger");
        btnDelete.textContent = "delete";
        btnDelete.type = "button";
        btnDelete.dataset.id = id;
        div.appendChild(btnEdit);
        div.appendChild(btnDelete);
        figcaption.appendChild(div);
        this.containerBooks.appendChild(figure);
    }
}
