import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhonesService {

  constructor(private _http: HttpClient) { }


  getUnusedNum(){
    return this._http.get("http://localhost:8080/phones/get/num");
  }

  getAllNums(){
    return this._http.get("http://localhost:8080/phones/get/allnum");
  }

  updateNum(numinfo:any){
    return this._http.put("http://localhost:8080/phones/update/num",numinfo);
  }


  // getUnusedNum(){
  //   return this._http.get("https://tablero-a-api.herokuapp.com/phones/get/num");
  // }

  // getAllNums(){
  //   return this._http.get("https://tablero-a-api.herokuapp.com/phones/get/allnum");
  // }

  // updateNum(numinfo:any){
  //   return this._http.put("https://tablero-a-api.herokuapp.com/phones/update/num",numinfo);
  // }


}
