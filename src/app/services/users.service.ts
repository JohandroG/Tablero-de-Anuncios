import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  baseURL:string = "https://tablero-a-api.herokuapp.com"
  // baseURL:string = "http://localhost:8080"


  constructor(private _http: HttpClient) { }


  createNewUser(newUser:any){
    return this._http.post(this.baseURL + "/admins/create", newUser)
  }

  login(userinfo:any){
    return this._http.post(this.baseURL + "/admins/login", userinfo)
  }

  reqEmail(requestinfo:any){
    return this._http.post(this.baseURL + "/admins/recoverpass", requestinfo)
  }

  changePass(passinfo:any){
    return this._http.post(this.baseURL + "/admins/changepass", passinfo)
  }

}
