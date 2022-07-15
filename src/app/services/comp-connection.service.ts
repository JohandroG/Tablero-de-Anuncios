import { EventEmitter, Injectable, Output } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CompConnectionService {

  @Output() searchinfo: EventEmitter<any> = new EventEmitter

  @Output() navinfo: EventEmitter<any> = new EventEmitter



  constructor() { }





}
