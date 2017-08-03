# T&F API DASHBOARD.

> An Angular 2 web application featuring [Angular 2](https://angular.io) ([Router](https://angular.io/docs/js/latest/api/router/), [Forms](https://angular.io/docs/js/latest/api/forms/), [Http](https://angular.io/docs/js/latest/api/http/), [Services](https://gist.github.com/gdi2290/634101fec1671ee12b3e#_follow_@AngularClass_on_twitter), [Tests](https://angular.io/docs/js/latest/api/test/), [E2E](http://www.protractortest.org/#/faq#what-s-the-difference-between-karma-and-protractor-when-do-i-use-which-), [Material](https://github.com/angular/material2), [Karma](https://karma-runner.github.io/), [Protractor](https://angular.github.io/protractor/), [Jasmine](https://github.com/jasmine/jasmine), [Istanbul](https://github.com/gotwarlost/istanbul), [TypeScript](http://www.typescriptlang.org/), [@types](https://www.npmjs.com/~types), [TsLint](http://palantir.github.io/tslint/), [Codelyzer](https://github.com/mgechev/codelyzer), [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html), and [Webpack 2](http://webpack.github.io/) by [AngularClass](https://angularclass.com).

## Table of Contents

- [About the Service](#about)
  - [Features](#features)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Install system dependencies](#system-dependencies)
  - [Clone the repository](#clone-repo)
  - [Install application/dependencies](#install-app)
  - [Building, running and testing the application](#run-app)
- [Configuration](#configuration)
- [TypeScript](#typescript)
- [@Types](#types)

## About the Service <a id="about"></a>

This repo is using a [Webpack 2](http://webpack.github.io/) for building our files and assisting with boilerplate. It's also using Protractor for end-to-end story and Karma for unit tests.

### Features <a id="features"></a>

* Best practices in file and application organization for Angular 2.
* Ready to go build system using Webpack for working with TypeScript.
* Angular 2 examples that are ready to go when experimenting with Angular 2.
* A great Angular 2 seed repo for anyone who wants to start their project.
* Testing Angular 2 code with Jasmine and Karma.
* Coverage with Istanbul and Karma
* End-to-end Angular 2 code using Protractor.
* Type manager with @types
* Hot Module Replacement with Webpack, [@angularclass/hmr](https://github.com/angularclass/angular2-hmr) and [@angularclass/hmr-loader](https://github.com/angularclass/angular2-hmr-loader)
* Material Design with [angular/material2](https://github.com/angular/material2)

## File Structure
This application uses the component approach. This is the new standard for developing Angular apps and a great way to ensure maintainable code by encapsulation of behavior logic. A component is basically a self contained app usually in a single file or a folder with each concern as a file: style, template, specs, e2e, and component class. Here's how it looks:
```
tandf-pyramid-custweb/
 ├──config/                    * the configuration
 |   ├──helpers.js             * helper functions for the configuration files
 |   ├──spec-bundle.js         * ignore this magic that sets up the angular 2 testing environment
 |   ├──karma.conf.js          * karma config for the unit tests
 |   ├──protractor.conf.js     * protractor config for the end-to-end tests
 │   ├──webpack.dev.js         * the development webpack config
 │   ├──webpack.prod.js        * the production webpack config
 │   └──webpack.test.js        * the testing webpack config
 │
 ├──src/                       * the source files that will be compiled to javascript
 |   ├──main.browser.ts        * the entry file for the browser environment
 │   │
 |   ├──index.html             * Index.html: where we generate the index page
 │   │
 |   ├──polyfills.ts           * the polyfills file
 │   │
 |   ├──vendor.ts              * the vendor file
 │   │
 │   ├──app/                   * WebApp: folder
 │   │   ├──app.spec.ts        * a simple test of components in app.ts
 │   │   ├──app.e2e.ts         * a simple end-to-end test for /
 │   │   └──app.ts             * App.ts: a simple version of the App component components
 │   │
 │   └──assets/                * static assets are served here
 │       ├──icon/              * the list of icons from www.favicon-generator.org
 │       ├──service-worker.js  * ignore this. Web App service worker that's not complete yet
 │       ├──robots.txt         * for search engines to crawl your website
 │       └──humans.txt         * for humans to know who the developers are
 │
 │
 ├──tslint.json                * typescript lint config
 ├──typedoc.json               * typescript documentation generator
 ├──tsconfig.json              * config that webpack uses for typescript
 ├──package.json               * what npm uses to manage it's dependencies
 └──webpack.config.js          * webpack main configuration file

```

## Getting Started <a id="getting-started"></a>

### Set up your SSH keys in Bitbucket

The installation scripts depend on your connection to T&F's bitbucket server.  Therfore a pre-requisite is to make sure that
you have added your public ssh key to your profile on bitbucket so the connection to the repos is established. The following guide explains how to generate/add your
public key to bitbucket.

### Install system dependencies <a id="system-dependencies"></a>

Your system will need access to the `node` and `npm` commands, so ensure you're running the latest versions Node `v4.x.x`+ (or `v5.x.x`) and NPM `3.x.x`+;

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)

> If you have `nvm` installed, which is highly recommended (`brew install nvm`) you can do a `nvm install --lts && nvm use` in `$` to run with the latest Node LTS. You can also have this `zsh` done for you [automatically](https://github.com/creationix/nvm#calling-nvm-use-automatically-in-a-directory-with-a-nvmrc-file)

Once you have Node/npm installed, you should install these globals with `npm install --global`:

```bash
npm i -g bower gulp karma-cli node-sass pm2@latest protractor rimraf typescript typings webpack webpack-dev-server
```

### Clone the repository <a id="clone-repo"></a>
```bash
# --depth 1 removes all but one .git commit history
git clone --depth 1 http://bitbucket.crcpress.local:7990/scm/IN/tnf-api-dashboard.git tnf-api-dashboard
# change directory to repo
cd tnf-api-dashboard
```

### Install application and dependencies <a id="install-app"></a>
```bash
npm install
```

#### Quick-start

```bash
# default start
npm start
# use Hot Module Replacement
npm run server:dev:hmr
```

#### Launch the application in browser
- [http://0.0.0.0:3000](http://0.0.0.0:3000)
- [http://localhost:3000](http://localhost:3000)
- [http://[::1]:3000](http://[::1]:3000)

### Building, running and testing the application <a id="run-app"></a>

After you have installed all dependencies you can now run the app. Run `npm run server` to start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you.

#### Build app
```bash
# development
npm run build:dev
# production
npm run build:prod
```

#### Run server
```bash
# development
npm run server
# production
npm run server:prod
```

#### Hot Module Replacement
```bash
npm run server:dev:hmr
```

#### Watch and build files
```bash
npm run watch
```

#### Run tests
```bash
npm test
```

#### Watch and run tests
```bash
npm run watch:test
```

#### Run end-to-end tests
```bash
# make sure you have your server running in another terminal
npm run e2e
```

#### Run webdriver (for end-to-end)
```bash
npm run webdriver:update
npm run webdriver:start
```

#### Run Protractor's elementExplorer (for end-to-end)
```bash
npm run webdriver:start
# in another terminal
npm run e2e:live
```

#### Build Docker

- The Docker image will contain a production build.
- These scripts produce/remove:
  - a docker image named; 'tandf-pyr-cust-web'
  - a docker container named; 'tandf-pyr-cust-web-1'

```bash
# If you just want to build and start
# a docker container locally, just use:
npm run docker:start

# build docker image (pure docker build, app must be pre-built):
npm run docker:build
# commit changes to new docker image:
npm run docker:commit
# kill docker container:
npm run docker:kill
# remove docker container and image:
npm run docker:remove
# remove docker container:
npm run docker:rm
# remove docker image:
npm run docker:rmi
# run docker container:
npm run docker:run
# build app, build docker image and run container:
npm run docker:start
# rebuild app, rebuild docker image and restart container:
npm run docker:update
```


## Configuration
Configuration files live in `config/`, using; webpack, karma, and protractor for different stages of the application

## TypeScript
> To take full advantage of TypeScript with autocomplete you would have to install it globally and use an editor with the correct TypeScript plugins.

### Use latest TypeScript compiler
TypeScript 2.x.x includes everything you need. Make sure to upgrade, even if you installed TypeScript previously.

```bash
npm i -g typescript
```

### Use a TypeScript-aware editor
We have good experience using these editors:

* [Visual Studio Code](https://code.visualstudio.com/)
* [Webstorm 10](https://www.jetbrains.com/webstorm/download/)
* [Atom](https://atom.io/) with [TypeScript plugin](https://atom.io/packages/atom-typescript)
* [Sublime Text](http://www.sublimetext.com/3) with [Typescript-Sublime-Plugin](https://github.com/Microsoft/Typescript-Sublime-plugin#installation)

#### Visual Studio Code + Debugger for Chrome
> Install [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) and see docs for instructions to launch Chrome

The included `.vscode` automatically connects to the webpack development server on port `3000`.

## Types
> When you include a module that doesn't include Type Definitions inside of the module you can include external Type Definitions with @types

i.e, to have youtube api support, run this command in terminal:
```bash
npm i @types/youtube @types/gapi @types/gapi.youtube
```

In some cases where your code editor doesn't support Typescript 2 yet or these types weren't listed in ```tsconfig.json```, add these to **"src/custom-typings.d.ts"** to make peace with the compile check:
```es6
import '@types/gapi.youtube';
import '@types/gapi';
import '@types/youtube';
```

### Custom Type Definitions
When including 3rd party modules you also need to include the type definition for the module
if they don't provide one within the module. You can try to install it with @types

```bash
npm install @types/node
npm install @types/lodash
```

If you can't find the type definition in the registry we can make an ambient definition in
this file for now. For example

```typescript
declare module "my-module" {
  export function doesSomething(value: string): string;
}
```


If you're prototyping and you will fix the types later you can also declare it as type any

```typescript
declare var assert: any;
declare var _: any;
declare var $: any;
```

If you're importing a module that uses Node.js modules which are CommonJS you need to import as

```typescript
import * as _ from 'lodash';
```
