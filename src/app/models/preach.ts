export class Preach{
    date: string;
    title: string;
    autor: string;
    serie: string;
    url: string;
    constructor( date: string, title: string, autor: string, serie: string, url: string){
        this.date = date;
        this.title = title;
        this.autor = autor;
        this.serie = serie;
        this.url = url;
    }
}