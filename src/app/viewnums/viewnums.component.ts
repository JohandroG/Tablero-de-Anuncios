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


  numbers:any[] = [];

  page_size: number = 5
  page_number: number = 1
  
  pageSizeOptions = [5,10,15,20,30,50]
  
  filter_value = "";


  constructor(private _phoneService:PhonesService,
    private _router:Router,
    private _route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.loadnums();
  }

  loadnums():void{
    this._phoneService.getAllNums()
    .subscribe((data:any)=>{
      this.numbers = data
    })
  }

  handlePage(e:PageEvent){
    this.page_size = e.pageSize
    this.page_number = e.pageIndex + 1  
  }

}
