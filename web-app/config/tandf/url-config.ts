export class UrlConfig {

  env: string = process.env.ENV;

  getBaseApiUrl() {
    switch (this.env) {
    case 'dev': return 'https://api-dev.taylorandfrancis.com';
    case 'uat': return 'https://api-uat.taylorandfrancis.com';
    case 'prod': return 'https://api.taylorandfrancis.com';
    case 'tnf-dev': return 'http://api-dev.taylorandfrancis.com';
    case 'tnf-uat': return 'https://api-uat.taylorandfrancis.com';
    case 'tnf-prod': return 'https://api.taylorandfrancis.com';
    default: return '';
    }
  }

  getHomeUrl() {
    switch (this.env) {
    case 'dev': return 'https://dev.taylorfrancis.com/books/#/';
    case 'uat': return 'https://uat.taylorfrancis.com/books/#/';
    case 'prod': return 'https://www.taylorfrancis.com/books/#/';
    default: return '';
    }
  }

  getLibrarianDashboardUrl() {
    switch (this.env) {
    case 'dev': return 'https://beta-dev.taylorandfrancis.com/oadashboard/#/dashboard';
    case 'uat': return 'https://beta-uat.taylorandfrancis.com/oadashboard/#/dashboard';
    case 'prod': return 'https://beta-prod.taylorandfrancis.com/oadashboard/#/dashboard';
    default: return '';
    }
  }

  // Creds same as dev till uat and prod env are up and running
  getLoginAuthParams(): any {

    switch (this.env) {
      case 'dev': return {
        'auth_endpoint' : '/v2/auth/user/auth/authorize',
        'access_endpoint' : '/v2/auth/user/auth/token',
        'Content-Type' : 'application/json',
        'grant_type' : 'authorization_code',
        'response_type' : 'code',
        'client_id' : 'ccf3bb8acfa3e36eb6c920816bc34d261c7ddd4b43c1add996704ae16b47cf82',
        'client_secret' : 'f618cd835b1045638113d4bd0455650f2fbfead3b50b95d08491dd1643ed4941',
        'scope' : 'mail openid profile foo',
        'redirect_uri' : 'https://beta-dev.taylorandfrancis.com/books/#/'
      };
      case 'uat': return {
        'auth_endpoint' : '/v2/auth/user/auth/authorize',
        'access_endpoint' : '/v2/auth/user/auth/token',
        'Content-Type' : 'application/json',
        'grant_type' : 'authorization_code',
        'response_type' : 'code',
        'client_id' : 'ccf3bb8acfa3e36eb6c920816bc34d261c7ddd4b43c1add996704ae16b47cf82',
        'client_secret' : 'f618cd835b1045638113d4bd0455650f2fbfead3b50b95d08491dd1643ed4941',
        'scope' : 'mail openid profile foo',
        'redirect_uri' : 'https://beta-dev.taylorandfrancis.com/books/#/'
      };
      case 'prod': return {
        'auth_endpoint' : '/v2/auth/user/auth/authorize',
        'access_endpoint' : '/v2/auth/user/auth/token',
        'Content-Type' : 'application/json',
        'grant_type' : 'authorization_code',
        'response_type' : 'code',
        'client_id' : 'ccf3bb8acfa3e36eb6c920816bc34d261c7ddd4b43c1add996704ae16b47cf82',
        'client_secret' : 'f618cd835b1045638113d4bd0455650f2fbfead3b50b95d08491dd1643ed4941',
        'scope' : 'mail openid profile foo',
        'redirect_uri' : 'https://beta-dev.taylorandfrancis.com/books/#/'
      };
      default: return '';
    }

  }

}
