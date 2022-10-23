import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MedicalAppointmentsComponent } from './medical-appointments/medical-appointments.component';
import { PatientGuard } from 'src/app/guards';

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
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class PatientModule { }
