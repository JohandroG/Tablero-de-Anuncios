import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import {FormsModule} from '@angular/forms'
import { NewnoticeComponent } from './newnotice/newnotice.component';
import { CallsComponent } from './calls/calls.component';
import { CodesComponent } from './codes/codes.component';
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

const routes: Routes = [
  {path: '', 
  component: HomeComponent,
  },
  {path: 'ingresar', 
  component: LoginComponent,
  },
  {path: 'registarse', 
  component: RegisterComponent,
  },
  {path: 'nuevo/anuncio', 
  component: NewnoticeComponent,
  },
  {path: 'modificar/codigos', 
  component: CodesComponent,
  },
  {path: 'olvide/contra', 
  component: ForgotPassComponent,
  },
  {path: 'restablecer/contra/:id', 
  component: ForgotPass2Component,
  },
  {path: 'info/anuncio/:id', 
  component: NoticeInfoComponent,
  },
  {path: 'editar/anuncio/:id', 
  component: EditnoticeComponent,
  },
  {path: 'perfil/personal', 
  component: MyProfileComponent,
  },
  {path: 'info/app/versions', 
  component: AboutComponent,
  },
  {path: 'llamadas/iniciar', 
  component: CallsComponent,
  },
  {path: 'ver/registros', 
  component: ViewnumsComponent,
  },
  {path: 'ver/registros/config', 
  component: ViewnumsconfigComponent,
  },
  {path: 'mi/numero', 
  component: MynumComponent,
  },
  {path: 'numero/actualizado', 
  component: NumupdatedComponent,
  },


  //!Save Route
  {
    path: '**',
    component: ErrorpageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
