import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushTokensService {

  constructor(private _http: HttpClient) { }

  // baseURL:string = "https://tablero-a-api.herokuapp.com"
  baseURL:string = "http://localhost:8080" 

  saveToken(token:any){
    return this._http.post(this.baseURL + "/push-tokens/save",token);
  }



}
