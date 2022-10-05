import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { ProfileComponent } from './profile/profile.component';
import { ProfileGuard } from 'src/app/guards';
import { ShowDetailsComponent } from './profile/show-details/show-details.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ProfileGuard]
  }
]

@NgModule({
  declarations: [
    ProfileComponent,
    ShowDetailsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
})
export class ProfileModule { }
