import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {PhonesService} from '../services/phones.service';

@Component({
  selector: 'app-mynum',
  templateUrl: './mynum.component.html',
  styleUrls: ['./mynum.component.css']
})
export class MynumComponent implements OnInit {

//!--------------------VARIABLES----------------------------------------------------------------------------
numberinfo:any = {};

_id:any = "";
firstname:any = "";
lastname:any = "";
username:any = "";
email:any = "";
admintype:any = "";

time:number = 0;
minutes:number = 1; // Reset when storage is more than 20 minutes
now:any = new Date().getTime();
setupTime:any = sessionStorage.getItem('setupTime');

//!--------------------VARIABLES----------------------------------------------------------------------------


  constructor(private _router:Router,
    private _route:ActivatedRoute,
    private _phoneService:PhonesService) { }

  ngOnInit(): void {
    this.getNum();
    this.getFromSession();
  }

  getFromSession():void{
    //!USER----------------------------------------------------------------------------------
    this._id = sessionStorage.getItem('userID');
    this.firstname = sessionStorage.getItem('userFirstname');
    this.lastname = sessionStorage.getItem('userLastname');
    this.username = sessionStorage.getItem('userUsername');
    this.email = sessionStorage.getItem('userEmail');
    this.admintype = sessionStorage.getItem('userAdminType');

    //!PHONE----------------------------------------------------------------------------------
    this.numberinfo.number = sessionStorage.getItem('Phonenumber');
    this.numberinfo.info = sessionStorage.getItem('Phoneinfo');
    this.numberinfo.type = sessionStorage.getItem('Phonetype');
    this.numberinfo.notes = sessionStorage.getItem('Phonenotes');
    this.numberinfo.updated_at = sessionStorage.getItem('Phoneupdated_at');
    this.numberinfo._id = sessionStorage.getItem('Phone_id');

  }

  getNum():void{

    this.time = (this.minutes * 60)-(this.now - this.setupTime)/1000

    // //?Request a number, if Counter is not present or expired----------------------------------------------------------------
    if(this.setupTime == null || this.now-this.setupTime > this.minutes*60*1000){
      this._phoneService.getUnusedNum()
      .subscribe((data:any)=>{  
        sessionStorage.removeItem('setupTime');
        sessionStorage.setItem('setupTime', this.now);

        sessionStorage.setItem('Phonenumber', data.number); //! Session In
        sessionStorage.setItem('Phoneinfo', data.info); //! Session In
        sessionStorage.setItem('Phonetype', data.type); //! Session In
        sessionStorage.setItem('Phonenotes', data.notes); //! Session In
        sessionStorage.setItem('Phoneupdated_at', data.updated_at); //! Session In
        sessionStorage.setItem('Phone_id', data._id); //! Session In
        
        location.reload()
      })
    }
    
  }



}
