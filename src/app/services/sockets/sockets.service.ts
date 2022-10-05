import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import Events from './sockets.events';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  constructor(
    private socket: Socket
  ) { }

}
