import APIRequestObject =  require('../entity/request-object');

var apiRequest = require('request');

class APIRequest {
    get(reqObject: APIRequestObject, onDone: any) {
        reqObject.rejectUnauthorized = false;
        apiRequest.get(reqObject, onDone);
    }

    post(reqObject: APIRequestObject, onDone: any) {
        reqObject.rejectUnauthorized = false;
        apiRequest.post(reqObject, onDone);
    }
}
export = APIRequest;