import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';
import { ChartsModule } from 'ng2-charts/ng2-charts';
const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { NumberFormat } from './app.pipes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { ApiClient } from './services';
import { Home } from './home';
import { NoContent } from './no-content';
import { ForwardPage } from './no-reuse-page-base';
import { COMPONENTS } from './components';
//To import Guard providers.
import { ActivateOnAccessToken } from './guards';
const APP_GUARDS = [ActivateOnAccessToken];

const APP_COMPONENTS = [
  App,
  Home,
  NoContent,
  NumberFormat,
  ForwardPage,
].concat(COMPONENTS);

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
].concat(APP_GUARDS);

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  imports: [ // import Angular's modules
    ChartsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
  ],
  declarations: [APP_COMPONENTS],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    {
      provide: ApiClient,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new ApiClient(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    }
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) { }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

