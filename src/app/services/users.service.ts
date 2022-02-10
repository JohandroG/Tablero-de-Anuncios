import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }


  // createNewUser(newUser:any){
  //   return this._http.post("http://localhost:8080/admins/create", newUser)
  // }

  // login(userinfo:any){
  //   return this._http.post("http://localhost:8080/admins/login", userinfo)
  // }

  // reqEmail(requestinfo:any){
  //   return this._http.post("http://localhost:8080/admins/recoverpass", requestinfo)
  // }

  // changePass(passinfo:any){
  //   return this._http.post("http://localhost:8080/admins/changepass", passinfo)
  // }



  createNewUser(newUser:any){
    return this._http.post("https://tablero-a-api.herokuapp.com/admins/create", newUser)
  }

  login(userinfo:any){
    return this._http.post("https://tablero-a-api.herokuapp.com/admins/login", userinfo)
  }

  reqEmail(requestinfo:any){
    return this._http.post("https://tablero-a-api.herokuapp.com/admins/recoverpass", requestinfo)
  }

  changePass(passinfo:any){
    return this._http.post("https://tablero-a-api.herokuapp.com/admins/changepass", passinfo)
  }

}
