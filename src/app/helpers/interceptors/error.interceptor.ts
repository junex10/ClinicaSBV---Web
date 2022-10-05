import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {
    SwalAlerts
} from 'src/app/shared';

export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap((err: any) => {
                if (err.body?.error) {
                    const error = err?.body.error;
                    Swal.fire(SwalAlerts.swalError('Error', error));
                    return throwError(error);
                } 
                else return null;
            }),
            catchError(err => {
                const error = err.message || err.statusText || err?.error?.error;
                Swal.fire(SwalAlerts.swalError('Error', err?.error?.error));
                return throwError(error);
            })
        );
    }
}