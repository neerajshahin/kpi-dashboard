import {
  inject,
  TestBed
} from '@angular/core/testing';

import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  Response,
  ResponseOptions,
  RequestMethod
} from '@angular/http';
import { MockBackend, MockConnection  } from '@angular/http/testing';

// Load the implementations that should be tested
import { App } from './app.component';
import { AppState } from './app.service';
import { ApiClient } from './services';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AppState,
      App,
      BaseRequestOptions,
      MockBackend,
      {
        provide: ApiClient,
        useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
    ]}));

  it('should have a url', inject([ App ], (app: App) => {
   
  }));

});
