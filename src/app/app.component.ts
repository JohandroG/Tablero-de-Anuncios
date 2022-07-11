import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import {PushTokensService} from "./services/push-tokens.service"
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import {filter} from 'rxjs/operators'
declare var gtag:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  // baseURL = "http://localhost:8000"
  baseURL = "https://johandrog.github.io/Tablero-de-Anuncios"

  
  userinfo:any = {}

  public readonly VAPID_PUBLIC_KEY = "BOVjl3y_07wpUquE0I4B4lTv6VyjCps7u881hpzybLu3XUSLu_HY-RfebVGMGrWR-Z0DP5A8NRzU0qofgbt_thU"

  public constructor(
    private swPush: SwPush,
    private pushService : PushTokensService,
    private router: Router
    ) {
      this.subscribeToNotifications();
      this.managepushClicks();

      //?--------------This is for Google analitycs events on routing-------------------------
      const navEndEvents$ = this.router.events
      .pipe(
        filter((event:any) => event instanceof NavigationEnd)
      );
      
      navEndEvents$.subscribe((ev: NavigationEnd) => {
        gtag('config', 'G-VDDLMMPKP2', {
          'page_path': ev.urlAfterRedirects
        });
      });

    }

  ngOnInit(): void {
    this.getFromSession()
  }

  getFromSession():void{
    this.userinfo = JSON.parse(localStorage.getItem('userinfo') || "{}")
  }

  subscribeToNotifications():void{
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub=>{
      const token = JSON.parse(JSON.stringify(sub));

      let newToken = {
        token: token
      }
      
      //todo: Conectar con el API
      this.pushService.saveToken(newToken)
      .subscribe((res:any)=>{
        console.log(res);
      },
      (err:any)=>{
        console.log(err.error.done);
      })
    })
    .catch(err=>{
      console.log("UPS",err);
    })
  }


  managepushClicks():void{
    this.swPush.notificationClicks.subscribe(
      ({action, notification}) => {
          // console.log(action);
          // console.log(notification);

          if(action === "redirecttonotice"){
            window.open(`${this.baseURL}/info/anuncio/${notification.data.data1}`);
          }
      });
  }






}
