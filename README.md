# API documentation

### Navigation

- [Project Description](#description)
- [Exceptions](#exceptions)
- [Authentication](#authentication)
- [End Points](#end-points)
  - [Auth](#auth)
    - [Registration](#registration)
    - [Login](#login)
    - [Logout](#logout)
    - [Refresh Token](#refresh-token)
  - [Users](#users)
    - [Get All](#get-all-users)
    - [Get By Id](#get-user-by-id)
    - [Create User](#create-user)
    - [Edit User By Id](#edit-user-by-id)
    - [Delete User By Id](#delete-user-by-id)
  - [Lawyers](#clients)
    - [Get All](#get-lawyers)
    - [Get By Id](#get-lawyer-by-id)
    - [Create Lawyer](#create-lawyer)
    - [Edit Lawyer By Id](#update-lawyer-info)
    - [Delete Lawyer By Id](#delete-lawyer-by-id)
    - [Create lawyer's license](#create-lawyers-license)
    - [Get lawyer's license](#get-lawyers-licenses)
  - [Clients](#clients)
    - [Get All](#get-all-clients)
    - [Get By Id](#get-client-by-id)
    - [Create Client](#create-client)
    - [Edit Client By Id](#update-client-info)
    - [Delete Client By Id](#delete-client-by-id)
  - [Cases](#cases)
    - [Get All](#get-all-cases)
    - [Get By Id](#get-case-by-id)
    - [Create Case](#create-a-case)
    - [Edit Case By Id](#edit-a-case)
    - [Delete Case By Id](#delete-case-by-id)
    - [Fulfill case](#fulfill-a-case)
    - [Reject case](#reject-a-case-a-case)
    - [Admit](#admit-a-case)
  - [Admins](#admins)
    - [Get All](#get-all-admins)
    - [Get By Id](#get-admin-by-id)
    - [Create Admin](#create-admin)
    - [Edit Admin By Id](#edit-admin-by-id)
    - [Delete Admin By Id](#delete-admin-by-id)
  - [Roles](#roles)
    - [Get All](#get-all-roles)
    - [Get By Id](#get-role-by-id)
    - [Create Role](#create-role)
    - [Edit Role By Id](#edit-role-by-id)
    - [Delete Role By Id](#delete-role-by-id)
  - [Reviews](#reviews)
    - [Get All](#get-all-reviews)
    - [Get By Id](#get-review-by-id)
    - [Create Review](#create-review)
    - [Edit Review By Id](#edit-review-by-id)
    - [Delete Review By Id](#delete-review-by-id)
  - [Licenses](#licenses)
    - [Get All](#get-all-licenses)
    - [Get By Id](#get-license-by-id)
    - [Create License](#create-license)
    - [Edit License By Id](#edit-license-by-id)
    - [Delete License By Id](#delete-license-by-id)
    - [Verify License By Id](#verify-license-by-id)
    - [Reject License By Id](#reject-license-by-id)
  - [Verifications](#verifications)
    - [Get All](#get-all-verifications)
    - [Get By Id](#get-verification-by-id)
    - [Create Verification](#create-verification)
    - [Edit Verification By Id](#edit-verification-by-id)
    - [Delete Verification By Id](#delete-verification-by-id)
  - [Conflicts](#conflicts)
    - [Get All](#get-all-conflicts)
    - [Get By Id](#get-conflict-by-id)
    - [Create Conflict](#create-conflict)
    - [Edit Conflict By Id](#edit-conflict-by-id)
    - [Delete Conflict By Id](#delete-conflict-by-id)
    - [Fulfill Conflict By Id](#fulfill-conflict-by-id)
    - [Reject Conflict By Id](#reject-conflict-by-id)

---

## Description

This app is a Lawyer Matching Service platform which allows match clients and lawyers. As a client you can create your own accound and hire(create a case) a layer based on filter parameters as budget, avialability, lawyer type.
As a lawyer you can create your own account, fill information about yourself, like price, occupation (eg. Business, Criminal, Family), age, experience, location, etc.

## Base url

```
http://localhost:3000/api/v1/
```

## Exceptions

- 500 Internal Server Error
- 404 Not found
- 403 ForbiddenError
- 401 Unauthorized
- 400 Bad request
  Example error message

```json
{
  "error": {
    "message": "Something went wrong"
  }
}
```

## Authentication

This app use Oauth 2.0 auth.
After login you will get two tokens: refresh and access. Use bearer acess token in authorization header.
Example:

```
GET /protected-route
Authorizations: bearer {access-token}
Content-Type: application/json
```

# End-points

---

## `/auth`

Endpoint to work with authentication

### Registration

`POST /auth/registration`

Request body example

```json
{
  "firstName": "firstName",
  "lastName": "lastName",
  "email": "email@email.com",
  "password": "password123",
  "roleId": 8,
  "city": "Kyiv"
}
```

Expected response `201 Created`

```json
{
  "result": {
    "id": "1",
    "email": "email@email.com",
    "firstName": "firstName",
    "lastName": "lastName",
    "roleId": 8,
    "city": "Kyiv"
  }
}
```

Expected errors `400 Bad Request`

```json
{
  "error": {
    "message": "User with this email was registered before"
  }
}
```

### Login

`POST /auth/login`

Request body example

```json
{
  "email": "email@email.com",
  "password": "password123"
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "email": "email@email.com",
    "firstName": "firstName",
    "lastName": "lastName",
    "city": "Kyiv",
    "roleId": 8,
    "tokens": {
      "refresh": "231dsf123asfds",
      "access": "sdfwqreew3"
    }
  }
}
```

Expected errors `400 Bad Request`

```json
{
  "error": {
    "message": "wrong email or password"
  }
}
```

### Logout

`POST /auth/logout`
Request Example

Request body example

```json
{
  "acessToken": "123213",
  "refreshToken": "sdffs123dsf"
}
```

Expected response `200 OK`

Expected errors `400 Bad Request`

```json
{
  "error": {
    "message": "Sesion Does not Exist"
  }
}
```

### Refresh Token

`POST /auth/refresh-token`
Request Example

Request body example

```json
{
  "acessToken": "123213",
  "refreshToken": "sdffs123dsf"
}
```

Expected response `200 OK`

```json
{
  "result": {
    "userId": "63",
    "tokens": {
      "access": "1698326309285",
      "refresh": "1698326309356"
    }
  }
}
```

Expected errors `400 Bad Request`

```json
{
  "error": {
    "message": "Refresh or access token is not valid"
  }
}
```

## `/users`

Endpoint to work with users

### Get All Users

`GET /users` - get all user with base info

Expected response `200 OK`

```json
{
  "result": [
    {
      "id": "1",
      "firstName": "firstName",
      "lastName": "lastName",
      "email": "email@email.com",
      "roleId": 8,
      "city": "Kyiv"
    },
    {
      "id": "2",
      "firstName": "firstName",
      "lastName": "lastName",
      "email": "email2@email.com",
      "roleId": 8,
      "city": "Lviv"
    }
  ]
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Get User By Id

`GET /users/:id` - get user by id

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "firstName": "firstName",
    "lastName": "lastName",
    "email": "email@email.com",
    "roleId": 8,
    "city": "Kyiv"
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Create User

`POST /users`

Request body example

```json
{
  "firstName": "firstName",
  "lastName": "lastName",
  "email": "email@email.com",
  "password": "password123",
  "roleId": 8,
  "city": "Kyiv"
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "firstName": "firstName",
    "lastName": "lastName",
    "email": "email@email.com",
    "roleId": 8,
    "city": "Kyiv"
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Edit User By Id

`PUT /users/:id`

Request body example

```json
{
  "city": "Kyiv"
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "firstName": "firstName",
    "lastName": "lastName",
    "email": "email@email.com",
    "roleId": 8,
    "city": "Kyiv"
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Delete User By Id

`DELETE /users/:id`

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "firstName": "firstName",
    "lastName": "lastName",
    "email": "email@email.com",
    "roleId": 8,
    "city": "Kyiv"
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

## `/lawyers`

Endpoint to work with lawyers

### Get Lawyers

`get /lawyers` - get all lawyers with all info

Expected response `200 OK`

```json
{
  "result": [
    {
      "id": 1,
      "userId": 2,
      "occupation": "Business",
      "price": 228,
      "experience": "10 years",
      "available": true
    }
  ]
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Get Lawyer By Id

`get /lawyers/:id` - get lawyer by id

Expected response `200 OK`

```json
{
  "result": {
    "id": 1,
    "userId": 2,
    "occupation": "Business",
    "price": 228,
    "experience": "10 years",
    "available": true
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Create Lawyer

`POST /lawyers`

Request body example

```json
{
  "userId": 2,
  "occupation": "Business",
  "price": 228,
  "experience": "10 years",
  "available": true
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": 1,
    "userId": 2,
    "occupation": "Business",
    "price": 228,
    "experience": "10 years",
    "available": true
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Update Lawyer Info

`PUT /lawyers/:id`

Request body example

```json
{
  "occupation": "Business",
  "price": 228,
  "experience": "10 years",
  "available": false
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": 1,
    "userId": 2,
    "occupation": "Business",
    "price": 228,
    "experience": "10 years",
    "available": true
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Delete Lawyer By Id

`DELETE /lawyers/:id`

Expected response `200 OK`

```json
{
  "result": {
    "id": 1,
    "userId": 2,
    "occupation": "Business",
    "price": 228,
    "experience": "10 years",
    "available": true
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Create lawyer's license

`POST /lawyers/licenses`

Request body example

```json
{
  "info": "my license"
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": 6,
    "lawyerId": 2,
    "verificationId": null,
    "info": "my license"
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Get lawyer's licenses

`GET /lawyers/:id/licenses`

Expected response `200 OK`

```json
{
  "result": [
    {
      "id": 2,
      "lawyerId": 2,
      "verificationId": null,
      "info": "my license"
    },
    {
      "id": 3,
      "lawyerId": 2,
      "verificationId": null,
      "info": "my license"
    }
  ]
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

## `/clients`

Endpoint to work with clients

### Get All Clients

`GET /clients` - get all clients with all info

Expected response `200 OK`

```json
{
  "result": [
    {
      "id": 2,
      "userId": 163,
      "budget": 228
    },
    {
      "id": 3,
      "userId": 16,
      "budget": 300
    }
  ]
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Get Client By Id

`GET /clients/:id` - get client by id with all info

Expected response `200 OK`

```json
{
  "result": {
    "id": 2,
    "userId": 163,
    "budget": 228
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Create Client

`POST /clients`

Request body example

```json
{
  "userId": 163,
  "budget": 228
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": 2,
    "userId": 163,
    "budget": 228
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Update Client Info

`PUT /clients/:id`

Request body example

```json
{
  "budget": 228
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": 2,
    "userId": 163,
    "budget": 228
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Delete Client By Id

`DELETE /clients/:id`

Expected response `200 OK`

```json
{
  "result": {
    "id": 2,
    "userId": 163,
    "budget": 228
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

## `/cases`

Endpoint to work with cases

### Create A Case

`POST /cases`

Request body example

```json
{
  "lawyerId": 1,
  "clientId": 2,
  "status": "active | fulfilled | failed | creating",
  "budget": 228,
  "startDate": "2023-10-29T19:10:35.896Z",
  "endDate": "15-09-2023"
}
```

Expected response `201 Created`

```json
{
  "result": {
    "id": 1,
    "lawyerId": 1,
    "clientId": 2,
    "status": "active | fulfilled | failed | creating",
    "budget": 228,
    "startDate": "2023-10-29T19:10:35.896Z",
    "endDate": "15-09-2023"
  }
}
```

Expected errors message `400 Bad Request`

```json
{
  "error": {
    "message": "Lawyer with such id does not exist"
  }
}
```

### Delete Client By Id

`DELETE /clients/:id`

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "firstName": "firstName",
    "lastName": "lastName",
    "email": "email@email.com",
    "role": "client",
    "city": "Kyiv",
    "budget": 228
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Get All Cases

`Get /cases`

Expected response `200 OK`

```json
{
  "result": [
    {
      "id": 1,
      "lawyerId": 1,
      "clientId": 2,
      "status": "active | fulfilled | failed | creating",
      "budget": 228,
      "startDate": "2023-10-29T19:10:35.896Z",
      "endDate": "15-09-2023"
    },
    {
      "id": 2,
      "lawyerId": 1,
      "clientId": 2,
      "status": "active | fulfilled | failed | creating",
      "budget": 228,
      "startDate": "2023-10-29T19:10:35.896Z",
      "endDate": "15-09-2023"
    },
    {
      "id": 3,
      "lawyerId": 1,
      "clientId": 2,
      "status": "active | fulfilled | failed | creating",
      "budget": 228,
      "startDate": "2023-10-29T19:10:35.896Z",
      "endDate": "15-09-2023"
    }
  ]
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Get Case By ID

`GET /cases:id`

Expected response `200 OK`

```json
{
  "result": {
    "id": 1,
    "lawyerId": 1,
    "clientId": 2,
    "status": "active | fulfilled | failed | creating",
    "budget": 228,
    "startDate": "2023-10-29T19:10:35.896Z",
    "endDate": "15-09-2023"
  }
}
```

Expected errors message `400 Bad Request`

```json
{
  "error": {
    "message": "Case with such id does not exist"
  }
}
```

### Edit A Case

`PUT /cases/:id`

Request body example

```json
{
  "lawyerId": 1,
  "budget": 228
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": 1,
    "lawyerId": 1,
    "clientId": 2,
    "status": "active | fulfilled | failed | creating",
    "budget": 228,
    "startDate": "2023-10-29T19:10:35.896Z",
    "endDate": "2023-10-29T19:10:35.896Z"
  }
}
```

Expected errors message `400 Bad Request`

```json
{
  "error": {
    "message": "Case with such id does not exist"
  }
}
```

### Create A Case

`POST /clients`

Request body example

```json
{
  "lawyerId": 1,
  "clientId": 2,
  "budget": 228
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": 1,
    "lawyerId": 1,
    "clientId": 2,
    "status": "creating",
    "budget": 228,
    "startDate": "2023-10-29T19:10:35.896Z",
    "endDate": "2023-10-29T19:10:35.896Z"
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Delete Case By Id

`DELETE /cases/:id`

Expected response `200 OK`

```json
{
  "result": {
    "id": 1,
    "lawyerId": 1,
    "clientId": 2,
    "status": "active | fulfilled | failed | creating",
    "budget": 228,
    "startDate": "2023-10-29T19:10:35.896Z",
    "endDate": "2023-10-29T19:10:35.896Z"
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

## `/admins`

Endpoint to work with users

### Get All Admins

`GET /admins` - get all admins

Expected response `200 OK`

```json
{
  "result": [
    {
      "id": 1,
      "userId": 1,
      "isActive": true
    },
    {
      "id": 2,
      "userId": 3,
      "isActive": false
    }
  ]
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Get Admin By Id

`GET /admins/:id` - get admin by id

Expected response `200 OK`

```json
{
  "result": {
    "id": 1,
    "userId": 1,
    "isActive": true
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Create Admin

`POST /admins`

Request body example

```json
{
  "userId": 1
}
```

Expected response `201 Created`

```json
{
  "result": {
    "id": 1,
    "userId": 1,
    "isActive": false
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Edit Admin By Id

`PUT /admins/:id`

Request body example

```json
{
  "isActive": false
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "userId": 1,
    "isActive": false
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Delete Admin By Id

`DELETE /admin/:id`

Expected response `200 OK`

```json
{
  "result": {
    "id": 1,
    "userId": 1,
    "isActive": true
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

## `/roles`

Endpoint to work with roles

### Get All Roles

`GET /roles` - get all roles

Expected response `200 OK`

```json
{
  "result": [
    {
      "id": "1",
      "type": "admin | client | lawyer"
    },
    {
      "id": "1",
      "type": "admin | client | lawyer"
    }
  ]
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Get Role By Id

`GET /roles/:id` - get role by id

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "type": "admin | client | lawyer"
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Create Role

`POST /roles`

Request body example

```json
{
  "type": "admin | client | lawyer"
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "type": "admin | client | lawyer"
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Edit Role By Id

`PUT /roles/:id`

Request body example

```json
{
  "type": "admin | client | lawyer"
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "type": "admin | client | lawyer"
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Delete Role By Id

`DELETE /roles/:id`

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "type": "admin | client | lawyer"
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

## `/reviews`

Endpoint to work with reviews

### Get All Reviews

`GET /reviews` - get all reviews

Expected response `200 OK`

```json
{
  "result": [
    {
      "id": "1",
      "caseId": "1",
      "rate": "[1-5]",
      "creator": "admin | client",
      "message": "Very cool lawyer"
    },
    {
      "id": "2",
      "caseId": "2",
      "rate": "[1-5]",
      "creator": "admin | client",
      "message": "Very cool lawyer"
    }
  ]
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Get Review By Id

`GET /reviews/:id` - get review by id

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "caseId": "1",
    "rate": "[1-5]",
    "creator": "admin | client",
    "message": "Very cool lawyer"
  }
}
```

Expected errors `400 Bad request`

```json
{
  "error": {
    "message": "Review with id {id} does not exist"
  }
}
```

### Create Review

`POST /reviews`

Request body example

```json
{
  "caseId": "1",
  "rate": "[1-5]",
  "creator": "admin | client",
  "message": "Very cool lawyer"
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "caseId": "1",
    "rate": "[1-5]",
    "creator": "admin | client",
    "message": "Very cool lawyer"
  }
}
```

Expected errors `400 Bad request`

```json
{
  "error": {
    "message": "Case with id {caseId} does not exist"
  }
}
```

### Edit Review By Id

`PUT /reviews/:id`

Request body example

```json
{
  "message": "Lawyer is very bad"
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "caseId": "1",
    "rate": "[1-5]",
    "creator": "admin | client",
    "message": "Very cool lawyer"
  }
}
```

Expected errors `400 Bad request`

```json
{
  "error": {
    "message": "Message with id {id} does not exist"
  }
}
```

### Delete Review By Id

`DELETE /reviews/:id`

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "caseId": "1",
    "rate": "[1-5]",
    "creator": "admin | client",
    "message": "Very cool lawyer"
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

## `/licenses`

Endpoint to work with licenses

### Get All Licenses

`GET /licenses` - get all licenses

Expected response `200 OK`

```json
{
  "result": [
    {
      "id": 1,
      "lawyerId": 228,
      "info": "lawyer license bla bla bla",
      "verificationId": 1
    },
    {
      "id": 2,
      "lawyerId": 2,
      "info": "lawyer license bla bla bla",
      "verificationId": 10
    }
  ]
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Get License By Id

`GET /licenses/:id` - get license by id

Expected response `200 OK`

```json
{
  "result": {
    "id": 1,
    "lawyerId": 228,
    "info": "lawyer license bla bla bla",
    "verificationId": 1
  }
}
```

Expected errors `400 Bad request`

```json
{
  "error": {
    "message": "License with id {id} does not exist"
  }
}
```

### Create License

`POST /licenses`

Request body example

```json
{
  "lawyerId": 228,
  "info": "lawyer license bla bla bla"
}
```

Expected response `201 Created`

```json
{
  "result": {
    "id": "1",
    "lawyerId": 228,
    "info": "lawyer license bla bla bla",
    "verificationId": null
  }
}
```

Expected errors `400 Bad request`

```json
{
  "error": {
    "message": "Lawyer with id does not exist"
  }
}
```

### Edit License By Id

`PUT /licenses/:id`

Request body example

```json
{
  "info": "lawyer license bla bla bla which I received in 2010"
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": 1,
    "lawyerId": 228,
    "info": "lawyer license bla bla bla which I received in 2010",
    "verificationId": 1
  }
}
```

Expected errors `400 Bad request`

```json
{
  "error": {
    "message": "License with id {id} does not exist"
  }
}
```

### Delete License By Id

`DELETE /licenses/:id`

Expected response `200 OK`

```json
{
  "result": {
    "id": 1,
    "lawyerId": 228,
    "info": "lawyer license bla bla bla which I received in 2010",
    "verificationId": 1
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Verify License By Id

`PUT /licenses/:id/verify`

Request body example

```json
{
  "notes": "License is genuine"
}
```

Expected response `200 OK`

```json
{
  "id": 1,
  "lawyerId": 1,
  "verificationId": 5,
  "info": "some license"
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Reject License By Id

`PUT /licenses/:id/reject`

Request body example

```json
{
  "notes": "License is not genuine"
}
```

Expected response `200 OK`

```json
{
  "id": 1,
  "lawyerId": 1,
  "verificationId": 5,
  "info": "some license"
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

## `/verifications`

Endpoint to work with verifications

### Get All Verifications

`GET /verifications` - get all verifications

Expected response `200 OK`

```json
{
  "result": [
    {
      "id": 5,
      "verifierId": 1,
      "date": "2023-10-29T16:38:47.784Z",
      "notes": "123",
      "status": "verified | rejected"
    },

    {
      "id": "12",
      "id": 5,
      "verifierId": 1,
      "date": "2023-10-29T16:38:47.784Z",
      "notes": "123",
      "status": "verified | rejected"
    }
  ]
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Get Verification By Id

`GET /verifications/:id` - get verification by id

Expected response `200 OK`

```json
{
  "result": {
    "id": 5,
    "verifierId": 1,
    "date": "2023-10-29T16:38:47.784Z",
    "notes": "123",
    "status": "verified | rejected"
  }
}
```

Expected errors `400 Bad request`

```json
{
  "error": {
    "message": "Verification with id {id} does not exist"
  }
}
```

### Create verification

`POST /verifications`

Request body example

```json
{
  "verifierId": 1,
  "notes": "123",
  "status": "verified | rejected"
}
```

Expected response `200 OK`

```json
{
  "result": {
    "verifierId": 1,
    "notes": "123",
    "status": "verified | rejected"
  }
}
```

Expected errors `400 Bad request`

```json
{
  "error": {
    "message": "License with id {licenseId} does not exist"
  }
}
```

### Edit Verification By Id

`PUT /verifications/:id`

Request body example

```json
{
  "notes": "License is genuine"
}
```

Expected response `200 OK`

```json
{
  "result": {
    "verifierId": 1,
    "notes": "123",
    "status": "verified | rejected"
  }
}
```

Expected errors `400 Bad request`

```json
{
  "error": {
    "message": "Verification with id {id} does not exist"
  }
}
```

### Delete Verification By Id

`DELETE /verifications/:id`

Expected response `200 OK`

```json
{
  "result": {
    "verifierId": 1,
    "notes": "123",
    "status": "verified | rejected"
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

## `/conflicts`

Endpoint to work with conflicts

### Get All Conflicts

`GET /conflicts` - get all conflicts

Expected response `200 OK`

```json
{
  "result": [
    {
      "id": "1",
      "adminId": "1",
      "caseId": "1",
      "reason": "Lawyer stole my money",
      "status": "processing | fulfilled | rejected"
    },
    {
      "id": "2",
      "adminId": "2",
      "caseId": "2",
      "reason": "Lawyer is very bad",
      "status": "processing | fulfilled | rejected"
    }
  ]
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Get Conflict By Id

`GET /conflicts/:id` - get conflict by id

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "adminId": "1",
    "caseId": "1",
    "reason": "Lawyer stole my money",
    "status": "processing | fulfilled | rejected"
  }
}
```

Expected errors `400 Bad request`

```json
{
  "error": {
    "message": "Conflict with id {id} does not exist"
  }
}
```

### Create conflict

`POST /conflicts`

Request body example

```json
{
  "adminId": "1",
  "caseId": "1",
  "reason": "Lawyer stole my money",
  "status": "processing | fulfilled | rejected"
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "adminId": "1",
    "caseId": "1",
    "reason": "Lawyer stole my money",
    "status": "processing | fulfilled | rejected"
  }
}
```

Expected errors `400 Bad request`

```json
{
  "error": {
    "message": "Conflict with id {id} does not exist"
  }
}
```

### Edit Conflict By Id

`PUT /conflicts/:id`

Request body example

```json
{
  "reason": "Lawyer stole my time"
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "adminId": "1",
    "caseId": "1",
    "reason": "Lawyer stole my time",
    "status": "processing | fulfilled | rejected"
  }
}
```

Expected errors `400 Bad request`

```json
{
  "error": {
    "message": "Conflict with id {id} does not exist"
  }
}
```

### Delete Conflict By Id

`DELETE /conflicts/:id`

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "adminId": "1",
    "caseId": "1",
    "reason": "Lawyer stole my money",
    "status": "processing | fulfilled | rejected"
  }
}
```

Expected errors `401 Unathorized`

```json
{
  "error": {
    "message": "You are not allowed to perform this action"
  }
}
```

### Fulfill Conflict By Id

`PUT /conflicts/:id/fulfill`

Request body example

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "adminId": "1",
    "caseId": "1",
    "reason": "Lawyer stole my time",
    "status": "fulfilled"
  }
}
```

Expected errors `400 Bad request`

```json
{
  "error": {
    "message": "Conflict with id {id} does not exist"
  }
}
```

### Reject Conflict By Id

`PUT /conflicts/:id/fulfill`

Request body example

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "adminId": "1",
    "caseId": "1",
    "reason": "Lawyer stole my time",
    "status": "rejected"
  }
}
```

Expected errors `400 Bad request`

```json
{
  "error": {
    "message": "Conflict with id {id} does not exist"
  }
}
```
