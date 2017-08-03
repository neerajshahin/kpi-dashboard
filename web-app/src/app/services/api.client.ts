import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AuthService } from './auth.Service';
import { ApiService } from '../services';

@Injectable()
export class ApiClient extends Http {
  static refreshingToken: boolean = false;
  constructor(backend: XHRBackend, options: RequestOptions) {
    options.headers.set('Content-Type', 'application/json');
    super(backend, options);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.defer(() => {
      return this.intercept(super.request(url, this.getRequestOptionArgs(options)));
    }).retryWhen(errors => {
      return errors
        .mergeMap((error) => (error.status != 401 && error.status != 403) ? Observable.throw(error) : Observable.of(error))
        .delay(1000)
      // .take(2);
    });
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.defer(() => {
      // console.log("I AM A GET CALL");
      return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
    }).retryWhen(errors => {
      return errors
        .mergeMap((error) => (error.status != 401 && error.status != 403) ? Observable.throw(error) : Observable.of(error))
        .delay(1000)
      // .take(2);
    });
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.defer(() => {
      // console.log("I AM A POST CALL");
      return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }).retryWhen(errors => {
      return errors
        .mergeMap((error) => (error.status != 401 && error.status != 403) ? Observable.throw(error) : Observable.of(error))
        .delay(1000)
      // .take(2);
    });
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.defer(() => {
      // console.log("I AM A PUT CALL");
      return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }).retryWhen(errors => {
      return errors
        .mergeMap((error) => (error.status != 401 && error.status != 403) ? Observable.throw(error) : Observable.of(error))
        .delay(1000)
      // .take(2);
    });
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.defer(() => {
      // console.log("I AM A DELETE CALL");
      return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
    }).retryWhen(errors => {
      return errors
        .mergeMap((error) => (error.status != 401 && error.status != 403) ? Observable.throw(error) : Observable.of(error))
        .delay(1000)
      // .take(2);
    });
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.defer(() => {
      // console.log("I AM A HEAD CALL");
      return this.intercept(super.head(url, this.getRequestOptionArgs(options)));
    }).retryWhen(errors => {
      return errors
        .mergeMap((error) => (error.status != 401 && error.status != 403) ? Observable.throw(error) : Observable.of(error))
        .delay(1000)
      // .take(2);
    });
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    let token = Cookie.get('_token');
    let email = Cookie.get('email');
    let me = this;
    if (!options) {
      // let's make option object
      options = { headers: new Headers() };
    }
    //For testing the functionality
    //    if (ApiClient.temp) {
    options.headers.set('Authorization', ` ${token}`);
    options.headers.set('Email', `${email}`);
    //    }
    return options;
  }
  private intercept(observable: Observable<Response>): Observable<Response> {
    let me = this;
    let token = "";
    return observable.catch(
      initialError => {
        return Observable.throw(initialError);
      })
  }

  private retryRequest(self, callback) {
    function checkFlag() {
      if (ApiClient.refreshingToken) {
        window.setTimeout(checkFlag, 1000); /* this checks the flag every 100 milliseconds*/
      } else {
        callback()
      }
    }
    checkFlag();
  }


  private setAuthDetails(access_tokens): void {
    console.log("Cookies are", Cookie.getAll());
    Cookie.set("_token", access_tokens.idtoken);
    Cookie.set("_refresh_token", access_tokens.idtoken);
    console.log("Cookies are", Cookie.getAll());
  }

  private catchAuthError(self: ApiClient) {
    // we have to pass ApiClient's own instance here as `self`
    return (res: Response) => {
      console.log("Your session seems to be expired.", res);
      Cookie.deleteAll('/');
      window.location.href = ApiService.BOOKS_WEBSITE_ENDPOINT;
      return Observable.throw(new Error("Your session seems to be expired"));
    };
  }
}
