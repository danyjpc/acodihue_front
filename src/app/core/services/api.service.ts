import {Injectable} from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpParams,

} from '@angular/common/http';
import {catchError, retry, map, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {environment} from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class ApiService {
    constructor(private http: HttpClient) {
    }

    // tslint:disable-next-line:typedef
    loginMethod(body) {
        const url = `${environment.SERVER_URL}/rest/login`;
        console.log(url);
        return this.http.post(url, body).toPromise();
    }

    // tslint:disable-next-line:typedef
    getMethod(endPoint, prms?) {
        let params = new HttpParams();
        if (prms) {
            const keyParams = Object.keys(prms);
            for (const p of keyParams) {
                params = params.append(p, prms[p]);
            }
        }
        const url = environment.SERVER_URL + endPoint;
        return this.http.get(url, {params}).toPromise();
    }


    // tslint:disable-next-line: typedef
    postMethod(endpoint, data, params?) {
        const url = environment.SERVER_URL + endpoint;
        return this.http.post(url, data, {params}).toPromise();
    }

    // tslint:disable-next-line:typedef
    putMethod(endPoint, data, params?) {
        const url = environment.SERVER_URL + endPoint;

        return this.http.put(url, data, {params}).toPromise();
    }

    // tslint:disable-next-line: typedef
    recoveryPassword(email) {
        const url = environment.SERVER_URL + `pwd-recovery`;
        const body = {
            email
        };
        return this.http.post(url, body, {})
            .pipe(
                // retry(2),
                catchError((error: HttpErrorResponse) => {
                    // tslint:disable-next-line:no-shadowed-variable
                    let data = {};
                    data = {
                        reason: error && error.error.reason ? error.error.reason : '',
                        status: error.status
                    };
                    return throwError(error);
                })
            ).toPromise();
    }

    uploadFile(endpoint, data, params) {

      const url = environment.SERVER_URL + endpoint;        
      return this.http.post(url, data, {
        reportProgress: true,
        observe: 'events',
        params
      }).pipe(
              catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                return throwError(error);
            })
      
        ).toPromise();

        
    }







}

