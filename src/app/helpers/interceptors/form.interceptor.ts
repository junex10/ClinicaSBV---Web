import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { local, prod } from 'src/environments';
import { finalize } from "rxjs/operators";

@Injectable()
export class FormInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const body = req.body;
        let formdata = new FormData();
        if (body?.formData) {
            for (var key in body) {
                if (Array.isArray(body[key])) {
                    for (var _key in body[key]) {
                        if (Array.isArray(body[key][_key])) {
                            for (var i in body[key][_key]) {
                                formdata.append(key + '[' + _key + '][' + i + ']', body[key][_key][i]);
                            }
                        }
                        else {
                            formdata.append(`${key}`, body[key][_key], _key);
                        }
                    }
                }
                else {
                    formdata.append(key, body[key]);
                }
            }
            const request = req.clone({ body: formdata });
            return next.handle(request);
        }
        
        return next.handle(req);
    }
}