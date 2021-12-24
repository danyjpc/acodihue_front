
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';



@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (sessionStorage.getItem('session') !== null) {
            const session = JSON.parse(sessionStorage.getItem('session'));
            const token = session['token']
            const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
            const AuthRequest = request.clone({headers: headers});
            return next.handle(AuthRequest);
        } else {
            return next.handle(request);
        }
    }
}