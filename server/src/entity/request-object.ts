interface APIRequestObject {
    url : String;
    rejectUnauthorized : Boolean;
    headers? : Object;
    form? : Object
}
export = APIRequestObject;