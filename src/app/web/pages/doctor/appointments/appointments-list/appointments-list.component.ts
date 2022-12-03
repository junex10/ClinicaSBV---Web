import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDTO } from 'src/app/dtos';
import { 
  AuthService,
  AppointmentsService
} from 'src/app/services';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {

  filter: FormGroup;

  appointmentsTable: DataTableDTO = {
    data: [],
    total: 0,
    header: ['#', 'Nombre', 'Apellido', 'Razón de la cita', 'Descripción', 'Monto', 'Estatus', 'Fecha de la cita', 'Fecha de entrada'],
    page: 1
  };

  user = this.auth.getUser()?.user;

  options = [
    { value: 1, name: 'Todos' },
    { value: 2, name: 'Por asociados' },
    { value: 3, name: 'Personales' }
  ];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private appointments: AppointmentsService
  ) { 
    this.filter = this.fb.group({
      formOptions: [null]
    })
  }

  ngOnInit(): void {
    this.getAppointments(this.appointmentsTable.page, this.getFormOptions);
  }

  getAppointments = (page: number, value: number) => {
    this.appointments.get({ user_id: this.user.id, page, filterType: value }).subscribe(
      (item) => {
        this.appointmentsTable.data = item.data.rows;
        this.appointmentsTable.total = item.data.count;
      }
    )
  }

  get getFormOptions() { return this.filter.get('formOptions')?.value }

}
