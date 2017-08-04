"use strict";
var TestUtil = (function () {
    function TestUtil() {
    }
    TestUtil.prototype.createAccessTokenData = function () {
        return {
            "access_token": "45a7066bf4030a36b9eb5b4d0ac8dfa7",
            "token_type": "Bearer",
            "expires_in": 3600,
            "refresh_token": "92ec7c61d4be9bd11f7d34070c09042c",
            "id_token": "eyJ0eXAiOiJKEMI6Yt5Znx7LUGU"
        };
    };
    TestUtil.prototype.createAccessData = function () {
        return {
            "metadata": {
                "status": "success",
            },
            "data": {
                "access_type": "allow",
                "user": {
                    "organization": "1"
                }
            }
        };
    };
    TestUtil.prototype.createUserDetailResponse = function () {
        return {
            "metadata": {
                "status": "success",
                "message": {}
            },
            "data": {
                "iss": "null",
                "sub": "58417457810faa381f6f6a4e",
                "aud": "5ae8e1bde87a5b8d1dc2eaeb99bb3c62a4f5deb41438bf15b71c93b79e8773f1",
                "exp": 1481804623,
                "iat": 1481801023,
                "user": {
                    "_id": "58417457810faa381f6f6a4e",
                    "username": "sandeep.c.das@informa.com",
                    "firstName": "Sandeep",
                    "lastName": "das",
                    "organization": "Tricon",
                    "dob": "",
                    "email": "sandeep.c.das@informa.com",
                    "createdOn": 1480684631030,
                    "displayName": "Sandeep das",
                    "isValidated": true,
                    "__v": 0,
                    "userType": "Admin"
                }
            }
        };
    };
    TestUtil.prototype.createAccessToken = function () {
        var accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJudWxsIiwic3ViIjoiNTg0MTc0NTc4MTBmYWEzODFmNmY2YTRlIiwiYXVkIjoiNWFlOGUxYmRlODdhNWI4ZDFkYzJlYWViOTliYjNjNjJhNGY1ZGViNDE0MzhiZjE1YjcxYzkzYjc5ZTg3NzNmMSIsImV4cCI6MTQ4MTgwNDYyMywiaWF0IjoxNDgxODAxMDIzLCJ1c2VyIjp7Il9pZCI6IjU4NDE3NDU3ODEwZmFhMzgxZjZmNmE0ZSIsInVzZXJuYW1lIjoic2FuZGVlcC5jLmRhc0BpbmZvcm1hLmNvbSIsImZpcnN0TmFtZSI6IlNhbmRlZXAiLCJsYXN0TmFtZSI6ImRhcyIsIm9yZ2FuaXphdGlvbiI6IlRyaWNvbiIsImRvYiI6IiIsImVtYWlsIjoic2FuZGVlcC5jLmRhc0BpbmZvcm1hLmNvbSIsImNyZWF0ZWRPbiI6MTQ4MDY4NDYzMTAzMCwiZGlzcGxheU5hbWUiOiJTYW5kZWVwIGRhcyIsImlzVmFsaWRhdGVkIjp0cnVlLCJfX3YiOjAsInVzZXJUeXBlIjoiQWRtaW4ifX0.CakeQWT53c-AfxWzq6pK6w9onvQ6uXJaQ_kkvpKTzNE	";
        return accessToken;
    };
    return TestUtil;
}());
module.exports = TestUtil;
//# sourceMappingURL=/Users/niks/Projects/kpi-dashboard/server/dist/test/util/test-util.js.map