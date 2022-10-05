import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = 'petition/';

@Injectable({
  providedIn: 'root'
})
export class PetitionService {

  constructor(
    private http: HttpClient
  ) { }


  getPetitions = (page: number, user_id?: number) => this.http.get<any>(`${API}getPetitions/${page}/${user_id}`);
}
