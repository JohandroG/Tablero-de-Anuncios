import {PhonesService} from '../services/phones.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UntypedFormControl, FormGroupDirective, UntypedFormGroup, NgForm, Validators, FormControlName} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-viewnumsconfig',
  templateUrl: './viewnumsconfig.component.html',
  styleUrls: ['./viewnumsconfig.component.css']
})
export class ViewnumsconfigComponent implements OnInit {

  info = new UntypedFormControl('', Validators.required)
  
  unCallInfo = new UntypedFormGroup({
    info: this.info,
  })

  msj:any = {}

  //*USER-INFO
  userinfo:any = this._mainComp.userinfo



  constructor(private _phoneService:PhonesService,
    private _router:Router,
    private _route:ActivatedRoute,
    private renderer2: Renderer2,
    private _mainComp:AppComponent
    ) { }

    ngOnInit(): void {
      this.protectURL();
    }

    protectURL():void{
      const admintype = this.userinfo.admintype;
      if(!admintype || admintype === "Register"){
        this._router.navigate( ['/'] )
      }
    }

  unCallNums(e:any):void{
    if(!this.info.errors){
      this._phoneService.unCall(this.unCallInfo.value)
      .subscribe((data:any)=>{
        console.log(data);
        alert(`Se han habilitado nuevamente ${data.modifiedCount} de los ${data.matchedCount} registros que coinciden con estas caracteristicas`)
      })
    }
    else{
      this.msj.problem = "⚠️ Ha ocurrido un problema"
    }
    

  }
}
