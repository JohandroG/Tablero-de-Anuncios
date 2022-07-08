import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { of } from 'rxjs';
import {NoticesService} from '../services/notices.service';
import { AppComponent } from "../app.component";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

//!--VARIABLES------------------------------------------------------------------------------------------

notices:any[] = [];

page_size: number = 5
page_number: number = 1

pageSizeOptions = [5,10,15,20,30,50]

filter_value = "";

//*USER-INFO
userinfo:any = this._mainComp.userinfo


loader:boolean = true
//!--VARIABLES------------------------------------------------------------------------------------------


  constructor(private _HttpNoticesService: NoticesService,
    private _router:Router,
    private _route:ActivatedRoute,
    private _mainComp:AppComponent
    ) { }

  ngOnInit(): void {
    this.getallNotices();
  }

  handlePage(e:PageEvent){
      this.page_size = e.pageSize
      this.page_number = e.pageIndex + 1  
  }
  

  handleSearch(value:string){
    this.filter_value = value;
  }

  getallNotices():void{
    this._HttpNoticesService.requestallNotices()
    .subscribe((result:any)=>{

      result.reverse().sort((a:any,b:any)=>{
        if(a.importance === b.importance){
          return 0;
        }
        if(a.importance === true){
          return -1;
        }
        else{
          return 0;
        }
      })
      
      this.notices = result;
    },
    (error=>{
      console.log(error);
      this.loader = false;
    }))
    
    
    
  }



}
