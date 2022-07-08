import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.css']
})
export class CallsComponent implements OnInit {

//*USER-INFO
userinfo:any = this._mainComp.userinfo


  constructor(
    private _router:Router,
    private _route:ActivatedRoute,
    private _mainComp:AppComponent
    ) { }

  ngOnInit(): void {
    this.protectURL();
  }

  protectURL():void{
    if(!this.userinfo.admintype){
      this._router.navigate( ['/'] )
    }
  }



}
