import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { of } from 'rxjs';
import {NoticesService} from '../services/notices.service';
import { AppComponent } from "../app.component";
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { CompConnectionService } from '../services/comp-connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

//!--VARIABLES------------------------------------------------------------------------------------------

//?-----------------------Variables to config this page nav Bar---------------------------------------------
navInfo = {
  title: "Tablero de Anuncios",
  search : true,
  profile: true,
  utilities: false
}

//?-----------------------Variables to pipe notices---------------------------------------------
filter_value = "";
searchfor = "notices"

//?-----------------------Variables for info---------------------------------------------
notices:any[] = [];

//?-----------------------Variables for pagination---------------------------------------------
page_size: number = 10
page_number: number = 1
pageSizeOptions = [10,15,20,25,30]



//?-----------------------Variables for USERINFO---------------------------------------------
userinfo:any = this._mainComp.userinfo


loader:boolean = true
//!--VARIABLES------------------------------------------------------------------------------------------


  constructor(private _HttpNoticesService: NoticesService,
    private _router:Router,
    private _route:ActivatedRoute,
    private _mainComp:AppComponent,
    private _compConnService: CompConnectionService
    ) { }

  ngOnInit(): void {
    this.getallNotices();
    this.handleSearch();
    this.emitNavInfo();
  }

  emitNavInfo(){
    this._compConnService.navinfo.emit(this.navInfo)
  }


  handlePage(e:PageEvent){
      this.page_size = e.pageSize
      this.page_number = e.pageIndex + 1  
  }
  

  handleSearch(){
    this._compConnService.searchinfo.subscribe(data=>{
      console.log(data);
      this.filter_value = data
    })
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
