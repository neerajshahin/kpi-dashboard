import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ApiService, ApiClient } from '../services';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as $ from 'jquery';
@Injectable()
export class ApiDashboardServices {
    constructor(public apiClient: ApiClient) {
    }
    //Get total health of tnf api
    getDashboardData() {
        let url = ApiService.API_DASHBOARD_DATA_ENDPOINT;
        return this.apiClient.get(url)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => {
                return Observable.throw(error || 'Server error');
            });
    }
}