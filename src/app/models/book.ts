export class Book{
    // id: number;
    title: string
    autor: string
    serie: string
    content: string
    img: string

    constructor( title: string, autor: string, serie: string, content: string, img: string) {
        this.title = title;
        this.autor = autor;
        this.serie = serie;
        this.content = content;
        this.img = img;
    }
}