import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { LoginResultModel } from '../model/LoginResultModel'
import { User } from '../model/user'
import { Headers, RequestOptions } from '@angular/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class TestWeb {

    private api = 'https://prueba-admision-web.herokuapp.com/session';     
    
    username = 'usuario';
    password = 'password';

    constructor(private http: Http) {}

    private extractData(res: Response) {
        let body = res.json();
            return body || {};
    }
    private handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
    private handleErrorPromise (error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }	

    login(username: String, password: String): Observable<LoginResultModel>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });        
        let jsonResult = this.http.post(this.api, User, options)
            .pipe(map(res => res.json()));
        
            console.log(jsonResult);
            return jsonResult;
    }   

}
