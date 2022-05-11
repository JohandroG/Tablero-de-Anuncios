import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CodesService {

  baseURL:string = "https://tablero-a-api.herokuapp.com"
  // baseURL:string = "http://localhost:8080" 

  constructor(private _http: HttpClient) { }

    changeTotal(codeinfo:any){
      return this._http.put(this.baseURL + "/codes/updatetotal",codeinfo);
    }
  
    changeNormal(codeinfo:any){
      return this._http.put(this.baseURL + "/codes/updatenormal",codeinfo);
    }
  
    changeRegister(codeinfo:any){
      return this._http.put(this.baseURL + "/codes/updateregister",codeinfo);
    }
  

}
