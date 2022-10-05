import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgOtpInputModule } from 'ng-otp-input';
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { RecoverComponent } from './recover/recover.component';
import { ForgotAccountComponent } from './forgot-account/forgot-account.component';

// Guards
import { LoginGuard } from 'src/app/guards';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'verify/:token',
    component: VerifyComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'forgot-account',
    component: ForgotAccountComponent,
    canActivate: [LoginGuard]
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyComponent,
    RecoverComponent,
    ForgotAccountComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgOtpInputModule,
    SharedModule
  ]
})
export class AuthModule { }
