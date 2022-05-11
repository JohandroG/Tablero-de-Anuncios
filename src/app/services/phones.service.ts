import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhonesService {

  constructor(private _http: HttpClient) { }
  
  // baseURL:string = "https://tablero-a-api.herokuapp.com"
  baseURL:string = "http://localhost:8080" 

  getUnusedNum(){
    return this._http.get(this.baseURL + "/phones/get/num");
  }

  getAllNums(){
    return this._http.get(this.baseURL + "/phones/get/allnum");
  }

  getReservedNums(user:any){
    return this._http.get(this.baseURL + `/phones/get/resnum/${user}`);
  }

  updateNum(numinfo:any){
    return this._http.put(this.baseURL + "/phones/update/num",numinfo);
  }

  unRegister(_id:any){
    return this._http.put(this.baseURL + "/phones/unregister",_id);
  }

  unCall(info:any){
    return this._http.put(this.baseURL + "/phones/update/calledreg",info);
  }



}
