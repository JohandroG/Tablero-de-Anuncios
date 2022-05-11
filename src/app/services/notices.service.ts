import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticesService {

  baseURL:string = "https://tablero-a-api.herokuapp.com"
  // baseURL:string = "http://localhost:8080" 

  constructor(private _http: HttpClient) { }

  requestallNotices(){
    return this._http.get(this.baseURL + "/notices/galln");
  }


  createNotice(newNotice:any){
    return this._http.post(this.baseURL + "/notices/create",newNotice);
  }


  findNotice(_id:any){
    return this._http.get(this.baseURL + `/notices/findN/${_id}`);
  }

  deleteNotice(_id:any){
    return this._http.delete(this.baseURL + `/notices/delete/${_id}`);
  }

  deleteNoticeIMG(_id:any){
    return this._http.delete(this.baseURL + `/notices/removeimg/${_id}`);
  }

  updateNotice(_id:any,noticeinfo:any){
    return this._http.put(this.baseURL + `/notices/update/${_id}`,noticeinfo);
  }


}

