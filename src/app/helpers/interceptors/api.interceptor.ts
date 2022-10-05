import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { local, prod } from 'src/environments';
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from "rxjs/operators";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(
        private spinner: NgxSpinnerService
    ) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const api = !local.production ? local.baseApi : prod.baseApi;
        this.spinner.show();
        const request = req.clone({ 
            url: `${api}${req.url}`,
        });
        return next.handle(request).pipe(finalize(() => this.spinner.hide()));
    }
}