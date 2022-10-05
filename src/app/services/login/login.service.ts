import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoginDTO,
  RegisterParamsDTO
} from 'src/app/dtos';

const API = 'auth/';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  login = (form: LoginDTO) => this.http.post<any>(`${API}login`, form);

  register = (form: RegisterParamsDTO) => this.http.post<any>(`${API}register`, form);

}
