import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { HTTP_OPTIONS } from 'src/app/shared';
import { AuthService } from "src/app/services";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const request = req.clone({
            headers: HTTP_OPTIONS,
            setHeaders: {
                'Authorization': this.auth.getUser()?.token ?? ''
            }
        });
        return next.handle(request);
    }
}