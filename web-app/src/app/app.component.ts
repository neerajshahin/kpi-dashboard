/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { AppState } from './app.service';
import { ApiService } from './services';
import { Router, ActivatedRoute } from '@angular/router';
// jQuery Typings will cause errors in Angular-Protractor,
// so we `require` it instead of importing.
const $ = require('jquery');

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})
export class App {
  logo = 'assets/img/logo-tfgi-c.png';
  name = 'Taylor & Francis Group';
  year = (new Date()).getFullYear();
  url = location.protocol + '//' + location.hostname
  + (location.port ? ':' + location.port : '') + '/';
  userInfo: any = {};
  isMobNavExpanded: boolean = false; //This flag is valid only for the mobile and tablet.

  constructor(private router: Router, private route: ActivatedRoute, 
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
    console.log('Environment', ENV);
    console.log('_token : ', Cookie.get('_token'));
  }

  onLogin(value:any){
     window.location.href = value.value;
  }
}

