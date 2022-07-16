import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {NoticesService} from '../services/notices.service';
import {PhonesService} from '../services/phones.service';
import { AppComponent } from "../app.component";
import { CompConnectionService } from '../services/comp-connection.service';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

//!--VARIABLES------------------------------------------------------------------------------------------


infoToUpdate = {
  firstname : "",
  lastname : "",
  email : "",
  username : "",
  oldpassword : "",
  newpassword : ""
}


//*USER-INFO
userinfo:any = this._mainComp.userinfo

navInfo = {
  title: `${this.userinfo.firstname} ${this.userinfo.lastname}`,
  search : false,
  profile: false,
  utilities: false
}

reserved:any = {}

//!--VARIABLES------------------------------------------------------------------------------------------


  constructor(private _HttpNoticesService: NoticesService,
    private _HttpPhonesService: PhonesService,
    private _router:Router,
    private _route:ActivatedRoute,
    private _mainComp:AppComponent,
    private _compConnService: CompConnectionService
    ) { }

  ngOnInit(): void {
    this.protectURL();
    this.loadreserved();
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

  loadreserved():void{
    this._HttpPhonesService.getReservedNums(this.userinfo.username)
    .subscribe((data:any)=>{
      this.reserved = data
    })
  }

  unRegister(e:any):void{
    let _id:string = e.target.remove.value;
    let body = {_id: _id}

    this._HttpPhonesService.unRegister(body)
    .subscribe((data:any)=>{
      alert(data.msj)
      location.reload()
    })
  }


}
