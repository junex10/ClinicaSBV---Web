import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    GetAssociatedDTO
} from 'src/app/dtos';
import { IPATIENTS } from 'src/app/interfaces';

const API = 'patient/associates/';

@Injectable({
  providedIn: 'root'
})
export class AssociatesService implements IPATIENTS {

  constructor(
    private http: HttpClient
  ) { }

  addAssociated = (body: any) => this.http.post<GetAssociatedDTO>(`${API}new_associated`, body).toPromise();
  getAll = (user_id: number, page?: number) => this.http.get<GetAssociatedDTO>(`${API}getAll/${user_id}/${page}`).toPromise();
}
