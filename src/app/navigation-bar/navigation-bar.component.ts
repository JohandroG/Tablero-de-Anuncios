import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

//? Icons



@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

//!--VARIABLES------------------------------------------------------------------------------------------

admintype:any = "";

// navigateURL:string = "/Tablero-de-Anuncios"
navigateURL:string = ""

//!--VARIABLES------------------------------------------------------------------------------------------


constructor(private _router:Router,
  private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.verifysession();
  }

  verifysession():void{
    const sessionadmintype = JSON.parse(localStorage.getItem('userinfo') || "{}");
    this.admintype = sessionadmintype.admintype;
  }

  logout():void{
    // sessionStorage.clear();
    localStorage.removeItem('userinfo')
    this.verifysession();
    this._router.navigate( ['/'] )
    location.reload()
  }


}
