import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Internal modules

import { ProfileModule } from './profile/profile.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientModule } from 'src/app/web/pages/patient/patient.module';
import { ChatModule } from './chat/chat.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('src/app/web/pages/auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('src/app/web/pages/profile/profile.module').then(mod => mod.ProfileModule)
  },
  {
    path: 'patient',
    loadChildren: () => import('src/app/web/pages/patient/patient.module').then(mod => mod.PatientModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('src/app/web/pages/chat/chat.module').then(mod => mod.ChatModule)
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    SharedModule,

    // Modules
    ProfileModule,
    PatientModule,
    ChatModule
  ]
})
export class PagesModule { }
