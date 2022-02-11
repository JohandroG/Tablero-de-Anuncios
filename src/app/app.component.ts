import { Component } from '@angular/core';
import { Title, } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'public';

  public constructor(private titleService: Title,
    private meta: Meta) { }

  // ngOnInit(): void {
  //   this.setTitle("Prueba")
  //   this.setMetas()
  // }

  // public setTitle(newTitle: string) {
  //   this.titleService.setTitle(newTitle);
  // }


   // <meta name="apple-mobile-web-app-title" content="Anuncios">
   // <meta name="apple-mobile-web-app-capable" content="yes">
   // <meta name="apple-mobile-web-app-status-bar-style" content="black">


  // public setMetas(){
  //   this.meta.addTag({ name: 'apple-mobile-web-app-title', content: 'Anuncios' })
  //   this.meta.addTag({ name: 'apple-mobile-web-app-capable', content: 'yes' })
  //   this.meta.addTag({ name: 'apple-mobile-web-app-status-bar-style', content: 'black' })
  // }



}
