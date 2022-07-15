import { Component, ElementRef, EventEmitter, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { CompConnectionService } from '../services/comp-connection.service';

//? Icons



@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

@ViewChild('navbar') navbar: ElementRef<any> | undefined;
@ViewChild('logo') logo: ElementRef<any> | undefined;
@ViewChildren('linktext') linktext: QueryList<any> | undefined;
@ViewChild('background') background: ElementRef<any> | undefined;

@ViewChild('profileinfo') profileinfo: ElementRef<any> | undefined;


//!--VARIABLES------------------------------------------------------------------------------------------
deftrue = true
deffalse = false


admintype:any = "";
userinfo:any = "";

filter_value = "";

// navigateURL:string = "/Tablero-de-Anuncios"
navigateURL:string = ""

navInfo = {
  title : "Registros CN",
  search: false,
  profile: false,
  utilities: false
}


profindicator:any = false;


//!--VARIABLES------------------------------------------------------------------------------------------


constructor(private _router:Router,
  private _route:ActivatedRoute,
  private _compConnService: CompConnectionService,
  private renderer2: Renderer2,) { 
  }


  ngOnInit(): void {
    this.verifysession();
    this.getNavInfo();
  }



  getNavInfo(): void{
    this._compConnService.navinfo.subscribe(data=>{
      this.navInfo = data
    })
  }

  handleSearch(value:string){
    this.filter_value = value;
    this._compConnService.searchinfo.emit(this.filter_value);
  }

  verifysession():void{
    const userinfo = JSON.parse(localStorage.getItem('userinfo') || "{}");
    this.admintype = userinfo.admintype;
    this.userinfo = userinfo
  }

  mobilemenuappear():void{
    this.renderer2.addClass(this.navbar?.nativeElement,'navshow')
    this.renderer2.addClass(this.background?.nativeElement,'backappear')
    this.renderer2.addClass(this.logo?.nativeElement,'logohov')
    this.linktext?.forEach(element=>{
      this.renderer2.addClass(element.nativeElement,'link-texthov')
    })

    
  }

  mobilemenudisappear():void{
    setTimeout(()=>{
    this.renderer2.removeClass(this.navbar?.nativeElement,'navshow')
    this.renderer2.removeClass(this.background?.nativeElement,'backappear')
    this.renderer2.removeClass(this.logo?.nativeElement,'logohov')
    this.linktext?.forEach(element=>{
      this.renderer2.removeClass(element.nativeElement,'link-texthov')
    })
    },5)
  }

  profileshow() {
    const hasClass = this.profileinfo?.nativeElement.classList.contains('showprof');
  
    if(hasClass) {
      this.renderer2.removeClass(this.profileinfo?.nativeElement, 'showprof');
    } else {
      this.renderer2.addClass(this.profileinfo?.nativeElement, 'showprof');
    }
  }

  logout():void{
    // sessionStorage.clear();
    localStorage.removeItem('userinfo')
    this.verifysession();
    this._router.navigate( ['/'] )
    location.reload()
  }


}
