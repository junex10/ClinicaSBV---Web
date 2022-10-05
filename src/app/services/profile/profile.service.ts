import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    GetUserDTO,
    UpdateUserDTO
} from 'src/app/dtos';
import { IPROFILE } from 'src/app/interfaces';
import { Observable } from 'rxjs';

const API = 'profile/';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements IPROFILE {

  constructor(
    private http: HttpClient
  ) { }


  updateUser = (body: any) => this.http.post<GetUserDTO>(`${API}update`, body).toPromise();
}
