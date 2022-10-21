import { Injectable } from '@angular/core';

import { OperationDTO } from 'src/app/dtos';

@Injectable({
  providedIn: 'root'
})
/**
 * Operation is when you re in to modify any data o when you need to persist an state in the APP, so, you save the state temporaly in the local memory
 */
export class OperationService {

  constructor() { }

  save = (data: OperationDTO) => window.localStorage.setItem('operation', JSON.stringify(data))
  delete = () => window.localStorage.removeItem('operation')
  get = () => JSON.parse(window.localStorage.getItem('operation') || JSON.stringify(''));
}
