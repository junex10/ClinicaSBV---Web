import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CheckPermissionDTO,
  GetUserDTO,
  ResetParamsDTO
} from 'src/app/dtos';
import { IAUTH } from 'src/app/interfaces';
import { Router } from '@angular/router';

const API = 'auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAUTH {

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  setUser = (data: any) => window.sessionStorage.setItem('user', JSON.stringify(data))
  getUser = (): GetUserDTO => JSON.parse(window.sessionStorage.getItem('user') || JSON.stringify(``))?.data || false;
  removeUser = (): void => window.sessionStorage.removeItem('user');
  logout = (route: string = '/login') => {
    window.sessionStorage.removeItem('user');
    this.route.navigate([route]);
  };

  checkPermissions = (form: CheckPermissionDTO) => this.http.post(`${API}checkPermissions`, form).toPromise();

  verify = (token: string) => this.http.post<any>(`${API}verify`, { url: token });

  recover = (email: string) => this.http.post<GetUserDTO>(`${API}recover`, { email });

  sendOtp = (otp: string) => this.http.post<any>(`${API}check-code`, { code: otp });

  reset = (form: ResetParamsDTO) => this.http.post<any>(`${API}reset`, form);

}
