import {PhonesService} from '../services/phones.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroupDirective, FormGroup, NgForm, Validators, FormControlName} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-viewnumsconfig',
  templateUrl: './viewnumsconfig.component.html',
  styleUrls: ['./viewnumsconfig.component.css']
})
export class ViewnumsconfigComponent implements OnInit {

  info = new FormControl('', Validators.required)
  
  unCallInfo = new FormGroup({
    info: this.info,
  })

  msj:any = {}



  constructor(private _phoneService:PhonesService,
    private _router:Router,
    private _route:ActivatedRoute,
    private renderer2: Renderer2
    ) { }

  ngOnInit(): void {
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
