import { Component, OnInit } from '@angular/core';
import {PhonesService} from '../services/phones.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-viewnums',
  templateUrl: './viewnums.component.html',
  styleUrls: ['./viewnums.component.css']
})
export class ViewnumsComponent implements OnInit {


  _id:any = "";
  firstname:any = "";
  lastname:any = "";
  username:any = "";
  email:any = "";
  admintype:any = "";

//--------------------------------------------------------------------------
  numbers:any[] = [];

  page_size: number = 5
  page_number: number = 1
  
  pageSizeOptions = [5,10,20,30,50,100]
  
  filter_value = "";

  panelOpenState = false;

  searchValue:any = "";

  loader:boolean = true;

  constructor(private _phoneService:PhonesService,
    private _router:Router,
    private _route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.loadnums();
    this.getFromSession();
    this.protectURL();
  }

  protectURL():void{
    const admintype = sessionStorage.getItem('userAdminType');
    if(!admintype || admintype === "Register"){
      this._router.navigate( ['/'] )
    }
  }

  loadnums():void{
    this._phoneService.getAllNums()
    .subscribe((data:any)=>{


      data.sort((a:any,b:any)=>{
        if(a.number.split("-").join() > b.number.split("-").join()){
          return -1;
        }
        else{
          return 0;
        }
      }).reverse() //-----------------------------------------------------------------Order-Numbers

      this.numbers = data
      setTimeout(()=>{
        this.loader = false;
      },1000 * 1)
    })
  }

  handlePage(e:PageEvent){
    this.page_size = e.pageSize
    this.page_number = e.pageIndex + 1  
  }

  getFromSession():void{
    const sessionID = sessionStorage.getItem('userID');
    const sessionFirstname = sessionStorage.getItem('userFirstname');
    const sessionLastname = sessionStorage.getItem('userLastname');
    const sessionUsername = sessionStorage.getItem('userUsername');
    const sessionEmail = sessionStorage.getItem('userEmail');
    const sessionAdminType = sessionStorage.getItem('userAdminType');
    this._id = sessionID;
    this.firstname = sessionFirstname;
    this.lastname = sessionLastname;
    this.email = sessionUsername;
    this.username = sessionUsername;
    this.email = sessionEmail;
    this.admintype = sessionAdminType;

    
  }

  filternums(event:any):void{

  }

}
