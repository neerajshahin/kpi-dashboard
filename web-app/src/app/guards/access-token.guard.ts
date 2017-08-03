import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ApiService } from '../services';

@Injectable()
export class ActivateOnAccessToken implements CanActivate {
    constructor(private router: Router) { }

    canActivate(){
        if(Cookie.get('_token')){
            return true;
        }else{
            //window.location.href = ApiService.BASE_ENDPOINT;
           // return false;
        }
    }
}
