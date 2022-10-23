import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { GetSpecializationsDTO, GetDoctorsDTO, SelectDTO, User } from 'src/app/dtos';
import { AppointmentsService, AssociatesService, AuthService } from 'src/app/services';

@Component({
  selector: 'app-medical-appointments',
  templateUrl: './medical-appointments.component.html',
  styleUrls: ['./medical-appointments.component.css']
})
export class MedicalAppointmentsComponent implements OnInit {

  form: FormGroup;
  moment: any = moment;
  STEPS = {
    TAB_DATA: 1,
    TAB_DATE: 2
  };
  actualStep: number = this.STEPS.TAB_DATA;
  specialization: GetSpecializationsDTO[] = [];
  doctors: GetDoctorsDTO[] = [];
  patient: SelectDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private appointments: AppointmentsService,
    private auth: AuthService,
    private associates: AssociatesService
  ) { 
    this.form = this.fb.group({
      medical_reason: [null, Validators.required],
      specialization: [null, Validators.required],
      doctor: [null, Validators.required],
      medical_description: [null, Validators.required],
      patient: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.getSpecializations();
    this.getPatients();
  }

  getPatients = () => {
    const user = this.auth.getUser()?.user;
    this.associates.getAll(user.id).then((data: any) => {
      const item: User[] = Object.values(data);
      const formatSelect: SelectDTO[] = item.map(value => ({ name: `${value.person.name} ${value.person.lastname}`, value: value.id }));
      this.patient = [
        { name: 'Yo', value: user.id },
        ...formatSelect
      ];
    })
    console.log(user)
  }

  getSpecializations = () => {
    this.appointments.getSpecializations().subscribe(
      (item) => {
        this.specialization = Object.values(item);
      },
    )
  }

  getDoctorBySpecialization = () => {
    const specialization = this.form_specialization;
    this.appointments.getDoctor(specialization).subscribe(
      (item) => {
        this.doctors = Object.values(item);
      }
    )
  }

  next = () => this.actualStep = this.STEPS.TAB_DATE;

  submit = () => {

  }

  get form_medical_reason() { return this.form.get('medical_reason')?.value }
  get form_specialization() { return this.form.get('specialization')?.value }
  get form_doctor() { return this.form.get('doctor')?.value }
  get form_medical_description() { return this.form.get('medical_description')?.value }
  get form_patient() { return this.form.get('patient')?.value }

}
