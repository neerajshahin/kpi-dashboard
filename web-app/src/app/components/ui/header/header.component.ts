import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { UserService } from './user-service';
import { Observable } from 'rxjs/Rx';
import { Cookie } from 'ng2-cookies/ng2-cookies';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
console.log('`Headers` component loaded asynchronously');


@Component({
  selector: "header-component",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})


export class HeaderComponent {
  name: string;
  constructor() {
  }
  ngOnInit() {
    
  }

}