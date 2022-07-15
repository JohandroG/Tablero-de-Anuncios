import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from "../app.component";
import { CompConnectionService } from '../services/comp-connection.service';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.css']
})
export class CallsComponent implements OnInit {

//*USER-INFO
userinfo:any = this._mainComp.userinfo

navInfo = {
  title: "Registros Telefónicos",
  search : false,
  profile: true,
  utilities: false
}

  constructor(
    private _router:Router,
    private _route:ActivatedRoute,
    private _mainComp:AppComponent,
    private _compConnService: CompConnectionService
    ) { }

  ngOnInit(): void {
    this.protectURL();
    this.emitNavInfo();
  }

  emitNavInfo(){
    this._compConnService.navinfo.emit(this.navInfo)
  }

  protectURL():void{
    if(!this.userinfo.admintype){
      this._router.navigate( ['/'] )
    }
  }



}
