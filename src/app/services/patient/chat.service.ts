import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    PatientGetChatsDTO,
    PatientNewChatDTO,
    PatientNewMessageDTO,
    PatientGetLogsDTO,
    PatientDeleteDTO,
    PatientViewedDTO
} from 'src/app/dtos';
import { IPATIENTCHAT } from 'src/app/interfaces';

const API = 'patient/chat/';

@Injectable({
  providedIn: 'root'
})
export class PatientChatService implements IPATIENTCHAT {

  constructor(
    private http: HttpClient
  ) { }

  getChats = (request: PatientGetChatsDTO) => this.http.post<unknown>(`${API}getChats`, request);

  newChat = (request: PatientNewChatDTO) => this.http.post<unknown>(`${API}newChat`, request);

  newMessage = (request: PatientNewMessageDTO) => this.http.post<unknown>(`${API}newMessage`, request);

  getLogs = (request: PatientGetLogsDTO) => this.http.post<unknown>(`${API}getLogs`, request);

  delete = (request: PatientDeleteDTO) => this.http.delete<unknown>(`${API}delete`, { body: request });

  viewed = (request: PatientViewedDTO) => this.http.post<unknown>(`${API}delete`, request);

  getUsers = () => this.http.get<unknown>(`${API}getUsers`);
}
