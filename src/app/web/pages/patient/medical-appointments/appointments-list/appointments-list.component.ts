import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { 
  AuthService,
  AppointmentsService
} from 'src/app/services';
import * as moment from 'moment';
import * as PrintJS from 'print-js';
import { ENVIRONMENT } from 'src/app/shared';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {

  data: any[] = [];
  total: number = 0;
  header = ['#', 'Nombre', 'Apellido', 'Razón de la cita', 'Descripción', 'Monto', 'Estatus', 'Fecha de la cita', 'Fecha de entrada']
  page: number = 1;

  itemSelected: any = {};
  user = this.auth.getUser()?.user;
  moment: any = moment;

  options = [
    { value: 1, name: 'Todos' },
    { value: 2, name: 'Por asociados' },
    { value: 3, name: 'Personales' }
  ];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private appointments: AppointmentsService
  ) {
    this.form = this.fb.group({
      formOptions: [null]
    })
  }

  ngOnInit(): void {
    this.getAppointments(this.page, this.filter);
  }

  getAppointments = (page: number, value: number) => {
    this.appointments.get({ user_id: this.user.id, page, filterType: value }).subscribe(
      (item) => {
        this.data = item.data.rows;
        this.total = item.data.count;
      }
    )
  }

  getPDF = () => {
    this.appointments.getPDF({ user_id: this.user.id, page: this.page }).subscribe(
      (data) => {
        const url = `${ENVIRONMENT.storage}${data.url}`;
        PrintJS({
          printable: url
        });
      }
    )
  }

  getExcel = () => {
    this.appointments.getExcel({ user_id: this.user.id, page: this.page }).subscribe(
      (data) => {
        const url = `${ENVIRONMENT.storage}${data.url}`;
        window.open(url);
      }
    )
  }

  get filter() { return this.form.get('formOptions')?.value }

}
