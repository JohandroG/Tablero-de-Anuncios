import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {NoticesService} from '../services/notices.service';
import { AppComponent } from "../app.component";


@Component({
  selector: 'app-notice-info',
  templateUrl: './notice-info.component.html',
  styleUrls: ['./notice-info.component.css']
})
export class NoticeInfoComponent implements OnInit {

  _id:string = ''

  notice:any = {};

//*USER-INFO
userinfo:any = this._mainComp.userinfo

//?--INPUTVALIDATOR--------------------------------------------------------------------------------------
@ViewChild('image') image: ElementRef<any> | undefined;
@ViewChild('imagediv') imagediv: ElementRef<any> | undefined;
@ViewChild('background') background: ElementRef<any> | undefined;

  constructor(private _HttpNoticesService: NoticesService,
    private _router:Router,
    private _route:ActivatedRoute,
    private renderer2: Renderer2,
    private _mainComp:AppComponent
    ) { }

  ngOnInit(): void {
    this.loadNoticeInfo();
  }


  loadNoticeInfo():void{

    this._route.params.subscribe((params:any) => this._id = params.id)

    this._HttpNoticesService.findNotice(this._id)
    .subscribe((data:any)=>{
      this.notice = data
    },
    (error:any)=>{
      if(!this.notice.title){
        this._router.navigate( ['/'] )
      } //------------------------------------------------------------To not charge empty
    })
  }

  imgfull():void{
    this.renderer2.removeClass(this.image?.nativeElement,'disapear')
    this.renderer2.removeClass(this.imagediv?.nativeElement,'disapear')
    this.renderer2.removeClass(this.background?.nativeElement,'disapear')
  }

  imgdisapear():void{
    this.renderer2.addClass(this.image?.nativeElement,'disapear')
    this.renderer2.addClass(this.imagediv?.nativeElement,'disapear')
    this.renderer2.addClass(this.background?.nativeElement,'disapear')
  }


}
