import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginResultModel } from '../model/LoginResultModel'
import { User } from '../model/user'
import { TimeLine } from '../model/timeLine'
import { Headers, RequestOptions } from '@angular/http';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class TestWeb{

    private postUrl = 'https://prueba-admision-web.herokuapp.com/session';   // URL to post
    private getUrl = 'https://prueba-admision-web.herokuapp.com/data';  // URL to get
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });        

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
        let jsonResult = this.http.post(this.postUrl, user, this.options)
            .pipe(map(res => this.extractData(res)));
            return jsonResult;
    }
    
    public getTimeLine (cid: string): Observable<TimeLine[]> {
        let timeLine = this.http.get(this.getUrl + '?cid=' + cid, this.options)
        .pipe(map((response:Response) => this.extractData(response)));
        return timeLine;            
    }
    
}
