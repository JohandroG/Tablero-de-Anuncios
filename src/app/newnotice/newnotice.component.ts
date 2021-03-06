import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {NoticesService} from '../services/notices.service';
import {UntypedFormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AppComponent } from "../app.component";
import { CompConnectionService } from '../services/comp-connection.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-newnotice',
  templateUrl: './newnotice.component.html',
  styleUrls: ['./newnotice.component.css']
})




export class NewnoticeComponent implements OnInit {


//!--VARIABLES------------------------------------------------------------------------------------------
navInfo = {
  title: "Nuevo Anuncio",
  search : false,
  profile: true,
  utilities: false
}

newNotice:any = {
  title: "",
  description : "",
  link : "",
  importance : false,
  creator : ""
}

descprev:any = this.newNotice.description.split("\n").join("<br />")

imgprev:any = ""
imgnameprev:any = ""

noticeImage:any =  null;

archivos:any = [];


//*MSJ-----------------------------------------------------------------

msj:any = {};

//*USER-INFO
userinfo:any = this._mainComp.userinfo

//!--VARIABLES------------------------------------------------------------------------------------------

  titleFormControl = new UntypedFormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]);

  descriptionFormControl = new UntypedFormControl('', [Validators.required, Validators.minLength(8)]);

  matcher = new MyErrorStateMatcher();

  


//?--INPUTVALIDATOR--------------------------------------------------------------------------------------
@ViewChild('cardpreview') preview: ElementRef<any> | undefined;



  constructor(private _HttpNoticesService: NoticesService,
    private _router:Router,
    private _route:ActivatedRoute,
    private renderer2: Renderer2,
    private _mainComp:AppComponent,
    private _compConnService: CompConnectionService
    ) { }

  ngOnInit(): void {
    this.protectURL();
    this.emitNavInfo();
  }

  emitNavInfo(){
    this._compConnService.navinfo.emit(this.navInfo)
  }

  protectURL():void{
    const admintype = this.userinfo.admintype;
    if(!admintype || admintype === "Register"){
      this._router.navigate( ['/'] )
    }
  }


  selectedIMG(e:any){
    
    this.imgprev = ""
    this.imgnameprev = ""

    const imageCaptured = e.target.files[0]
    if(imageCaptured){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.imgprev = event.target.result;
      }
      this.archivos.push(imageCaptured)
      this.imgnameprev = imageCaptured.name;
    }
  }



  createnotice(event:any):void{
    

    if(!this.titleFormControl.errors && !this.descriptionFormControl.errors){

      const sessionUsername = sessionStorage.getItem('userUsername');
      this.newNotice.creator = sessionUsername;

      const formNoticeIndfo = new FormData()
      this.archivos.forEach((archivo:any) => {
        formNoticeIndfo.append('noticeImage',archivo)
      });

      formNoticeIndfo.append('title',this.newNotice.title);
      formNoticeIndfo.append('description',this.newNotice.description.split("\n").join("<br/>"));
      formNoticeIndfo.append('link',this.newNotice.link);
      formNoticeIndfo.append('importance',JSON.stringify(this.newNotice.importance));
      formNoticeIndfo.append('creator',this.newNotice.creator);
      
      
      this._HttpNoticesService.createNotice(formNoticeIndfo)
      .subscribe((data:any)=>{
        console.log(data);
        this._router.navigate( ['/'] )
      },
      (error:any)=>{
        this.msj = error.error
      }
      )
    }
    else{
      this.msj.problem = "?????? Ha ocurrido un problema"
    }
    
  }

  mobilepreview():void{
    this.renderer2.addClass(this.preview?.nativeElement,'appear')
  }

}
