import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Convert, IVideos } from "../shared/interfaces/videos";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  @ViewChild('asContainer') container!: ElementRef;
  @ViewChild('asTitle') title!: ElementRef;
  @ViewChild('asImage') image!: ElementRef;
  texto: string = '';
  public data: any;
  // videos!: IVideos;
  constructor(private renderer2: Renderer2){
    
    // this.videoSection = document.querySelector('section')
    // this.loader = document.querySelector('.loader-box')
  }
  ngOnInit(): void {
    this.data = {
      text: "Hello",
      url: "https://media1.tenor.com/m/MYZgsN2TDJAAAAAC/this-is.gif"
    };
    this.getVideos()
  }
  getVideos() {
    fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=UULTBaW3SVEM4HOGd-MpL6oQ&key=AIzaSyAxcbCBuLkG1HzNItG379nksSE1oYKDets')
        .then(res => res.json())
        .then(res => {
            const data:IVideos = res; 
            data.items.forEach((el) => {
                const urlVideo = el.snippet.resourceId.videoId;
                const imgVideo = el.snippet.thumbnails.standard.url;
                const titleVideo = el.snippet.title;
                console.log(urlVideo, imgVideo, titleVideo)
                this.addVideos(urlVideo, imgVideo, titleVideo);
            }
            );
        }).catch(err => {
            console.error(err);
            let errormsg = this.renderer2.createText(`Something went wrong`);
            this.renderer2.appendChild(this.container, errormsg);
        });
  }
  addVideos(urlVideo: string, imgVideo: string, titleVideo: string){
    const asContainer = this.container.nativeElement;
    // contenedor
    let article = this.renderer2.createElement('article');
    this.renderer2.setAttribute(article,'class', 'w-full lg:w-2/4 mx-auto mt-20 border-solid border-slate-400 rounded-md border-2 py-5 shadow-2xl text-center')
    //  create title
    let h3 = this.renderer2.createElement('h3');
    let titleCard = this.renderer2.createText(`${titleVideo}`);
    this.renderer2.appendChild(h3, titleCard);
    //  create img
    let img = this.renderer2.createElement('img');
    this.renderer2.setAttribute(img, 'src', imgVideo);
    this.renderer2.setAttribute(img, 'loading', "lazy");
    this.renderer2.addClass(img, 'w-full');
    this.renderer2.addClass(img, 'aspect-video');
    //  create element a
    let linkA = this.renderer2.createElement('a');
    this.renderer2.setAttribute(linkA, 'href', `https://www.youtube.com/watch?v=${urlVideo}`);
    this.renderer2.setAttribute(linkA, 'target', `_blank`);
    //  Join all of the links:
    this.renderer2.appendChild(linkA, img);
    this.renderer2.appendChild(linkA, h3);
    this.renderer2.appendChild(article, linkA);
    this.renderer2.appendChild(asContainer, article);

  }
  ///
  /* -> Crear un nuevo elemento
    Asignarle lo necesario al elemento lemento.
    Almacenar el elemento al contenedor
  */
}
