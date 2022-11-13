import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import Events from './sockets.events';

@Injectable({
  providedIn: 'root'
})
export class PatientSocketsService {

  constructor(
    private socket: Socket
  ) { }
    
  // Patient - chat

  newMessage(message: string, sender_id: number, session_id: number) {
    this.socket.emit(Events.CHAT.NEW_MESSAGE, {
      message,
      sender_id,
      session_id
    });
  }

  on(event: string, callback: (data?: unknown) => void) {
    return this.socket.on(event, callback)
  }
}
