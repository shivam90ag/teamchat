import { Http } from '@angular/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class HttpService {

    constructor(
        private http: Http,
        ) {

    }
    getWithObservable(url:any): Observable<any> {
        return this.http.get(url);
    }
    
}