export class ApiService {

  public static get BOOKS_WEBSITE_ENDPOINT(): string {
    switch (ENV) {
      case 'local': return 'http://localhost:3000/books';
      case 'dev': return 'https://dev.taylorfrancis.com/books/';
      case 'uat': return 'https://uat.taylorfrancis.com/books/';
      case 'prod': return 'https://www.taylorfrancis.com/books/';
      default: return '';
    }
  }
  public static get API_DASHBOARD_DATA_ENDPOINT(): string {
    switch (ENV) {
      case 'local': return 'https://kpi-dashboard-ui.herokuapp.com/api/v1/data/getData';
      case 'dev': return 'https://kpi-dashboard-ui.herokuapp.com/api/v1/data/getData';
      case 'uat': return 'https://kpi-dashboard-ui.herokuapp.com/api/v1/data/getData';
      case 'prod': return 'https://kpi-dashboard-ui.herokuapp.com/api/v1/data/getData';
      default: return '';
    }
  }



}
