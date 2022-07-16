import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

//?Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { NewnoticeComponent } from './newnotice/newnotice.component';
import { CallsComponent } from './calls/calls.component';
import { CodesComponent } from './codes/codes.component'
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { ForgotPass2Component } from './forgot-pass2/forgot-pass2.component';
import { EditnoticeComponent } from './editnotice/editnotice.component';
import { NoticeInfoComponent } from './notice-info/notice-info.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AboutComponent } from './about/about.component';
import { MynumComponent } from './mynum/mynum.component';
import { ViewnumsComponent } from './viewnums/viewnums.component';
import { NumupdatedComponent } from './numupdated/numupdated.component';
import { ViewnumsconfigComponent } from './viewnumsconfig/viewnumsconfig.component';

//?Services y Pipes
import {UsersService} from '../app/services/users.service';
import {CodesService} from '../app/services/codes.service';
import {NoticesService} from '../app/services/notices.service';
import {PhonesService} from '../app/services/phones.service';
import { SearchNPipe } from './pipes/search-n.pipe';
import { DateformatPipe } from './pipes/dateformat.pipe';

//?Fonts Import
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons';



//?AngularMaterial
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {CustomMatPaginatorIntl } from './paginator-es';
import {SearchNoticeComponent } from './search-notice/search-notice.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import { PaginationPipe } from './pipes/pagination.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

//?Others
import { CountdownModule } from 'ngx-countdown';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationBarComponent,
    HomeComponent,
    ErrorpageComponent,
    NewnoticeComponent,
    CallsComponent,
    CodesComponent,
    PaginationPipe,
    SearchNoticeComponent,
    SearchNPipe,
    DateformatPipe,
    ForgotPassComponent,
    ForgotPass2Component,
    EditnoticeComponent,
    NoticeInfoComponent,
    MyProfileComponent,
    AboutComponent,
    MynumComponent,
    ViewnumsComponent,
    NumupdatedComponent,
    ViewnumsconfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    MatPaginatorModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatExpansionModule,
    CountdownModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    UsersService,
    CodesService,
    NoticesService,
    PhonesService,
    {
      provide: MatPaginatorIntl, 
      useClass: CustomMatPaginatorIntl
    }
  ],
  bootstrap: [AppComponent]
})


export class AppModule { 
  constructor(library: FaIconLibrary){
    library.addIconPacks(fas,far);
  }
}
