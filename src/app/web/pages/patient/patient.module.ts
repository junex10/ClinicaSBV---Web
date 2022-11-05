import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MedicalAppointmentsComponent } from './medical-appointments/medical-appointments.component';
import { PatientGuard } from 'src/app/guards';
import { AppointmentsListComponent } from './medical-appointments/appointments-list/appointments-list.component';

const routes: Routes = [
  {
    path: 'patient',
    component: MedicalAppointmentsComponent,
    canActivate: [PatientGuard]
  },
  {
    path: 'patient/appointments',
    component: MedicalAppointmentsComponent,
    canActivate: [PatientGuard]
  },
  {
    path: 'patient/appointments-list',
    component: AppointmentsListComponent,
    canActivate: [PatientGuard]
  }
];

@NgModule({
  declarations: [
    MedicalAppointmentsComponent,
    AppointmentsListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class PatientModule { }
