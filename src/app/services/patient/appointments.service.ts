import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GetSpecializationsDTO,
  GetDoctorsDTO,
  GetDatesToHideDTO
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

  getDoctor = (specialization_id: number) => this.http.get<GetDoctorsDTO[]>(`${API}getDoctor/${specialization_id}`);

  getDoctorControl = (doctor_id: number, specialization_id: number) => this.http.get<GetDatesToHideDTO>(`${API}getDoctorControl/${doctor_id}/${specialization_id}`);

}
