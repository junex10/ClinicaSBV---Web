import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentsModule } from './appointments/appointments.module';

const routes: Routes = [
    {
        path: 'appointments',
        loadChildren: () => import('./appointments/appointments.module').then(mod => mod.AppointmentsModule)
    },
];

@NgModule({
    declarations: [

    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AppointmentsModule
    ],
    exports: [
        AppointmentsModule
    ]
})
export class DoctorModule { }
