import {Router, ActivatedRoute, Params} from '@angular/router';
import {UsersService} from '../services/users.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {UntypedFormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { CompConnectionService } from '../services/comp-connection.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

//!--VARIABLES------------------------------------------------------------------------------------------
navInfo = {
  title: "Iniciar Sesión",
  search : false,
  profile: false,
  utilities: false
}


  currentUser:any = {
    email: "",
    password: ""
  }
  
  errors:any = {};
//!--VARIABLES------------------------------------------------------------------------------------------

emailFormControl = new UntypedFormControl('', [Validators.required, Validators.email]);

passFormControl = new UntypedFormControl('', [Validators.required, Validators.minLength(8)]);

matcher = new MyErrorStateMatcher();




  constructor(private _HttpService: UsersService,
    private _router:Router,
    private _route:ActivatedRoute,
    private renderer2: Renderer2,
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
    const admintype = sessionStorage.getItem('userAdminType');
    if(admintype){
      this._router.navigate( ['/'] )
    }
  }

  login(event:any):void{

    if(!this.emailFormControl.errors && !this.passFormControl.errors){

      this._HttpService.login(this.currentUser)
    .subscribe((result:any)=>{
        localStorage.setItem('userinfo',JSON.stringify(result));
        this._router.navigate( ['/'] )
        .finally(()=>{
          location.reload()
        })
    },
    (error:any)=>{
      this.errors = error.error;
    })
    }
    else{
      this.errors.problem = "⚠️ Ha ocurrido un problema con alguno de los espacios"
    }
    
  }

}
