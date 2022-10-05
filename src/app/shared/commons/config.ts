import { HttpHeaders } from '@angular/common/http';
import { local, prod } from 'src/environments';

export const ENVIRONMENT = !local.production ? local : prod;

export const HTTP_OPTIONS = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
});
