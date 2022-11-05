import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { GetSpecializationsDTO, GetDoctorsDTO, SelectDTO, User } from 'src/app/dtos';
import { AppointmentsService, AssociatesService, AuthService } from 'src/app/services';
import { SwalAlerts } from 'src/app/shared';
import Swal from 'sweetalert2';
import { ENVIRONMENT } from 'src/app/shared';

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
  hasFecthDates: boolean = false;

  blockDays: number[] = [];
  blockWeeks: number[] = [];
  minDate = new Date();

  user = this.auth.getUser()?.user;
  patientSelected: any = {
    name: '',
    lastname: '',
    photo: 'assets/img/user.png'
  };

  filterByControls = (d: Date | null): boolean => {
    const doctor = this.form_doctor;
    const specialization = this.form_specialization;
    // Fetch control appointments of doctor
   if (!this.hasFecthDates) {
    this.appointments.getDoctorControl(doctor, specialization).subscribe(
      (value) => {
        this.blockDays = value.data.days.map(item => moment(item).unix());
        this.blockWeeks = value.data.weeks;
      },
      () => {},
      () => this.hasFecthDates = true
    )
   }
    
    const time = moment(d).unix();
    const day = (d || new Date()).getDay();
    return (
      !this.blockDays.find(x => x === time) &&
      !this.blockWeeks.find(y => y === day) &&
      day !== 0
    );
  };

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
      patient: [null, Validators.required],
      date_cite: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.getSpecializations();
    this.getPatients();
  }

  getPatients = () => {
    this.associates.getAll(this.user.id).then((data: any) => {
      const item: User[] = Object.values(data);
      const formatSelect: SelectDTO[] = item.map(value => ({ name: `${value.person.name} ${value.person.lastname}`, value: value.id }));
      this.patient = [
        { name: 'Yo', value: this.user.id },
        ...formatSelect
      ];
    })
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
  back = () => this.actualStep = this.STEPS.TAB_DATA;

  getUser = () => {
    const patient = this.form_patient;
    if (patient === this.user.id) {
      const photo = this.user.photo ? `${ENVIRONMENT.storage}${this.user?.photo}` : 'assets/img/user.png';
      this.patientSelected = {
        name: this.user.person.name,
        lastname: this.user.person.lastname,
        photo
      }
    } else {
      this.associates.getAssociated(patient).subscribe(
        (data) => {
          const photo = data.user?.photo ? `${ENVIRONMENT.storage}${data.user?.photo}` : 'assets/img/user.png';
          this.patientSelected = {
            name: data.user.person.name,
            lastname: data.user.person.lastname,
            photo
          };
        }
      );
    }
  }

  submit = () => {
    if (!this.form.invalid) {
      this.appointments.register(this.form.value).subscribe(
        () => {
          Swal.fire(SwalAlerts.swalSuccess('Cita', 'Cita registrada con éxito', 'Aceptar'))
        }
      )
    }
  }

  get form_medical_reason() { return this.form.get('medical_reason')?.value }
  get form_specialization() { return this.form.get('specialization')?.value }
  get form_doctor() { return this.form.get('doctor')?.value }
  get form_medical_description() { return this.form.get('medical_description')?.value }
  get form_patient() { return this.form.get('patient')?.value }
  get form_date_cite() { return this.form.get('date_cite')?.value }

}
