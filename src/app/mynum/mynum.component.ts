import {PhonesService} from '../services/phones.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroupDirective, FormGroup, NgForm, Validators, FormControlName} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { flatten } from '@angular/compiler';
import { AppComponent } from "../app.component";
import { CompConnectionService } from '../services/comp-connection.service';

@Component({
  selector: 'app-mynum',
  templateUrl: './mynum.component.html',
  styleUrls: ['./mynum.component.css']
})



export class MynumComponent implements OnInit {

//!--------------------VARIABLES----------------------------------------------------------------------------
navInfo = {
  title: "Mi número telefónico",
  search : false,
  profile: true,
  utilities: false
}


numberinfo:any = {};

//*USER-INFO
userinfo:any = this._mainComp.userinfo

time:number = 0;
minutes:number = 20; // Reset when storage is more than 20 minutes
now:any = new Date().getTime();
setupTime:any = sessionStorage.getItem('setupTime');
indicator:boolean = false;

//--------------------------------------------------------------

_id = new FormControl('')
publisher = new FormControl('')
info = new FormControl('', Validators.required)
type = new FormControl({value: '', disabled: true}, Validators.required)
notes = new FormControl({value: '', disabled: true}, Validators.maxLength(200))
user = new FormControl('')

newNumberForm = new FormGroup({
  _id: this._id,
  publisher: this.publisher,
  info: this.info,
  type: this.type,
  notes: this.notes,
  user: this.user,
})

//--------------------------------------------------------------

msj:any = {}

disabler:boolean = true
loader:boolean = true

panelOpenState = false;

//!--------------------VARIABLES----------------------------------------------------------------------------



    constructor(private _phoneService:PhonesService,
      private _router:Router,
      private _route:ActivatedRoute,
      private renderer2: Renderer2,
      private _mainComp:AppComponent,
      private _compConnService: CompConnectionService
      ) { }

  ngOnInit(): void {
    this.protectURL();
    this.getNum();
    this.getFromSession();
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


  modifyform(event:any):void{
    if(this.info.value != "No Existe" || this.info.value !== "No Contestó"){
      this.type.enable();
      this.notes.enable();
    }
    if(this.info.value == "No Existe" || this.info.value == "No Contestó"){
      this.type.disable()
      this.notes.disable()
    }
    if(this.info.value !== ''){
      this.disabler = false
    }
  }


  getFromSession():void{
    //!PHONE----------------------------------------------------------------------------------
    this.numberinfo.number = sessionStorage.getItem('Phonenumber');
    this.numberinfo.publisher = sessionStorage.getItem('Phonepublisher');
    this.numberinfo.info = sessionStorage.getItem('Phoneinfo');
    this.numberinfo.type = sessionStorage.getItem('Phonetype');
    this.numberinfo.notes = sessionStorage.getItem('Phonenotes');
    this.numberinfo.updated_at = sessionStorage.getItem('Phoneupdated_at');
    this.numberinfo._id = sessionStorage.getItem('Phone_id');

    setTimeout(()=>{
      this.loader = false;
    },1000)
  }

  getNum():void{

    this.time = (this.minutes * 60)-(this.now - this.setupTime)/1000

    setTimeout(()=>{this.indicator = true}, this.time * 1000)
    // //?Request a number, if Counter is not present or expired----------------------------------------------------------------
    if(this.setupTime == null || this.now-this.setupTime > this.minutes*60*1000){
      this._phoneService.getUnusedNum()
      .subscribe((data:any)=>{

          sessionStorage.removeItem('setupTime');
          sessionStorage.setItem('setupTime', this.now);
          
          sessionStorage.setItem('Phonenumber', data.number); //! Session In
          sessionStorage.setItem('Phonepublisher', data.publisher); //! Session In
          sessionStorage.setItem('Phoneinfo', data.info); //! Session In
          sessionStorage.setItem('Phonetype', data.type); //! Session In
          sessionStorage.setItem('Phonenotes', data.notes); //! Session In
          sessionStorage.setItem('Phoneupdated_at', data.updated_at); //! Session In
          sessionStorage.setItem('Phone_id', data._id); //! Session In

          sessionStorage.setItem('NoNums', data.nonums); //! Session In
          
          location.reload()
        
      },
      (error:any)=>{
        window.alert("Parece que no quedan mas numeros, porfavor ponte en contacto con los creadores de la app")
        this._router.navigate( ['/llamadas/iniciar'] )
        sessionStorage.removeItem('setupTime');
      })
    }
    
  }

  updateNumber(event:any):void{

    if(!this.info.errors && !this.notes.errors && !this.type.errors){
      this.publisher.setValue(`${this.userinfo.firstname} ${this.userinfo.lastname}`)
      this._id.setValue(this.numberinfo._id)
      this.user.setValue(this.userinfo.username)

      console.log(this.newNumberForm.value);

      this._phoneService.updateNum(this.newNumberForm.value)
      .subscribe((data:any)=>{
        sessionStorage.removeItem('setupTime');
        console.log(data);
        
        this._router.navigate( ['numero/actualizado'] )
      })
    }
    else{
      this.msj.problem = "⚠️ Ha ocurrido un problema"
    }
    
  }

}
