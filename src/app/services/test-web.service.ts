import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
//import { Observable, Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { LoginResultModel } from '../model/LoginResultModel'
import { User } from '../model/user'
import { Headers, RequestOptions } from '@angular/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class TestWeb {

    private api = 'https://prueba-admision-web.herokuapp.com/session';     
    
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

    public login(user: User): Observable<LoginResultModel>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });        
        alert("User: " + user.GetUserName);
        let jsonResult = this.http.post(this.api, user, options)
            .pipe(map(res => res.json()));
            console.log(jsonResult);
            return jsonResult;
    }   

}
