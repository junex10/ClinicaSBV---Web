import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    GetSpecializationsDTO
} from 'src/app/dtos';
import { IPATIENTS_APPOINTMENTS } from 'src/app/interfaces';

const API = 'patient/appointments/';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService implements IPATIENTS_APPOINTMENTS {

  constructor(
    private http: HttpClient
  ) { }

  getSpecializations = () => this.http.get<GetSpecializationsDTO[]>(`${API}getSpecializations`);

}
