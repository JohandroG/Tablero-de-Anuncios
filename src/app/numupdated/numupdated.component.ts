import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-numupdated',
  templateUrl: './numupdated.component.html',
  styleUrls: ['./numupdated.component.css']
})
export class NumupdatedComponent implements OnInit {


  message:any = "";


  constructor(
    private _router:Router,
    private _route:ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.protectURL();
    this.generateGoodMSJ();
  }

  protectURL():void{
    const admintype = sessionStorage.getItem('userAdminType');
    if(!admintype){
      this._router.navigate( ['/'] )
    }
  }

  generateGoodMSJ():void{
    let messages = 
    [
      "Agradecemos el excelente trabajo que estás haciendo para mantener los registros teléfonicos actualizados.",
      "Muchas gracias por tu fiel trabajo Que Jehová bendiga tus esfuerzos.",
      "¡Buen trabajo! Gracias por participar en la predicación y mantener el directorio actualizado.",
      "¡Bien hecho! Gracias por estar activo en la predicación. ",
      "¡Muy bien hecho! Gracias por colaborar con Jehová, un Dios de orden.",
      "¡Excelente! Valoramos tu tiempo y tus esfuerzos.",
      "¡Así se hace! Estamos contentos con el apoyo que das.",
      "Gracias por apoyar los intereses del Reino.",
      "Siga buscando primero el Reino así como lo has hecho hasta el día de hoy.",
      "No todos aprecian tu llamadita, pero Jehová está muy feliz de ver tu buena voluntad.",
    ]
    
    let randomNum = Math.trunc(Math.random()*(messages.length-0)+0) 
    
    this.message = messages[randomNum]
  }


}
