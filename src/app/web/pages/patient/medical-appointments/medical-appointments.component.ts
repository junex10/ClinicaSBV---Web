import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { GetSpecializationsDTO } from 'src/app/dtos';
import { AppointmentsService } from 'src/app/services/patient/appointments.service';

const STEPS = {
  TAB_DATA: 1,
  TAB_DATE: 2
};

@Component({
  selector: 'app-medical-appointments',
  templateUrl: './medical-appointments.component.html',
  styleUrls: ['./medical-appointments.component.css']
})
export class MedicalAppointmentsComponent implements OnInit {

  form: FormGroup;
  moment: any = moment;
  step: number = STEPS.TAB_DATA;
  specialization: GetSpecializationsDTO[] = [];
  doctors = [];

  constructor(
    private fb: FormBuilder,
    private appointments: AppointmentsService
  ) { 
    this.form = this.fb.group({
      medical_reason: [null, Validators.required],
      specialization: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    this.getSpecializations();
  }

  getSpecializations = () => {
    this.appointments.getSpecializations().subscribe(
      (item) => {
        this.specialization = Object.values(item);
      },
    )
  }

  submit = () => {

  }

  get form_medical_reason() { return this.form.get('medical_reason')?.value }
  get form_specialization() { return this.form.get('specialization')?.value }

}
