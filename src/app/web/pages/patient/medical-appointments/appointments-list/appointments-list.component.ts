import { Component, OnInit } from '@angular/core';
import { GetAssociatedDTO } from 'src/app/dtos';
import { 
  AuthService,
  AssociatesService,
  AppointmentsService
} from 'src/app/services';
import * as moment from 'moment';

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

  associateList = {
    data: <GetAssociatedDTO | any>[],
    page: 1,
    total: 0,
    header: ['#', 'Nombre', 'Apellido', 'Razón de la cita', 'Descripción', 'Monto', 'Estatus', 'Fecha de la cita', 'Fecha de entrada']
  }

  constructor(
    private auth: AuthService,
    private associates: AssociatesService,
    private appointments: AppointmentsService
  ) { }

  ngOnInit(): void {
    this.getAppointments(this.page);
  }

  getAppointments = (page: number) => {
    this.appointments.get({ user_id: this.user.id, page}).subscribe(
      (item) => {
        this.data = item.data.rows;
        this.total = item.data.count;
      }
    )
  }
  receivedTools = ($function: any) => {
    this.itemSelected = $function;
    eval(`this.${$function.action}`);
  }

  getAssociates = (page: number) => {
    this.associates.getAll(this.user.id, page).then(
      (item: any) => {
        const associates: GetAssociatedDTO = item;
        const data = associates.rows.map(value => (
          {
            id: value.id,
            name: value.person?.name,
            lastname: value.person?.lastname,
            age: value.person?.age,
            tools: [
              {
                icon: 'visibility',
                action: 'showAssociated()'
              }
            ]
          }
        ))
        this.associateList = {
          ...this.associateList,
          data,
          total: item.count
        }
      }
    )
  }

}
