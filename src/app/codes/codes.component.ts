import {CodesService} from '../services/codes.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {UntypedFormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AppComponent } from "../app.component";
import { CompConnectionService } from '../services/comp-connection.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css']
})
export class CodesComponent implements OnInit {


//!--VARIABLES------------------------------------------------------------------------------------------
navInfo = {
  title: "Codigos de acceso",
  search : false,
  profile: true,
  utilities: false
}


totalcode:any = {
  oldcode : "",
  newcode : ""
}

normalcode:any = {
  oldcode : "",
  newcode : ""
}

registercode:any ={
  oldcode : "",
  newcode : ""
}

totalmsj:any = {}

normalmsj:any = {}

registermsj:any = {}

//*USER-INFO
userinfo:any = this._mainComp.userinfo

//!--VARIABLES------------------------------------------------------------------------------------------

lastcodeTFormControl = new UntypedFormControl('', [Validators.required, Validators.minLength(5)]);
codeTFormControl = new UntypedFormControl('', [Validators.required, Validators.minLength(5)]);

lastcodeNFormControl = new UntypedFormControl('', [Validators.required, Validators.minLength(5)]);
codeNFormControl = new UntypedFormControl('', [Validators.required, Validators.minLength(5)]);

lastcodeRFormControl = new UntypedFormControl('', [Validators.required, Validators.minLength(5)]);
codeRFormControl = new UntypedFormControl('', [Validators.required, Validators.minLength(5)]);

matcher = new MyErrorStateMatcher();

  constructor(private _HttpNoticesService: CodesService,
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
    const admintype = this.userinfo.admintype;
    if(!admintype || admintype === "Register"|| admintype === "Normal"){
      this._router.navigate( ['/'] )
    }
  }

  updateTotal(event:any):void{

    this.totalmsj = {}

    if(!this.codeTFormControl.errors && !this.lastcodeTFormControl.errors){

      this._HttpNoticesService.changeTotal(this.totalcode)
      .subscribe((data:any)=>{
        this.totalmsj = data
      },(error:any)=>{
        this.totalmsj = error.error
        console.log(error);
        console.log(this.totalcode);
        
      })
    }
    else{
      this.totalmsj.problem  = "?????? Parece que hay un problema"
    }
    
    
  }

  updateNormal(event:any):void{
    this.normalmsj = {}

    if(!this.codeNFormControl.errors && !this.lastcodeNFormControl.errors){
      this._HttpNoticesService.changeNormal(this.normalcode)
      .subscribe((data:any)=>{
        this.normalmsj = data
      },(error:any)=>{
        this.normalmsj = error.error
      })
    }
    else{
      this.normalmsj.problem  = "?????? Parece que hay un problema"
    }
  }

  updateRegister(event:any):void{
    this.registermsj = {}

    if(!this.codeRFormControl.errors && !this.lastcodeRFormControl.errors){
    this._HttpNoticesService.changeRegister(this.registercode)
    .subscribe((data:any)=>{
      this.registermsj = data
    },(error:any)=>{
      this.registermsj = error.error
    })
    }
    else{
      this.registermsj.problem = "?????? Parece que hay un problema"
    }

  }




}
