import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentsListComponent } from './appointments-list/appointments-list.component';
import { AppointmentsStatisticsComponent } from './appointments-statistics/appointments-statistics.component';

const routes: Routes = [
  {
    path: 'appointments-list',
    component: AppointmentsListComponent,
    canActivate: []
  },
  {
    path: 'statistics',
    component: AppointmentsStatisticsComponent,
    canActivate: []
  }
];

@NgModule({
  declarations: [
    AppointmentsListComponent,
    AppointmentsStatisticsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class AppointmentsModule { }
