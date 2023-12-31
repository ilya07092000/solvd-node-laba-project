# Needed Information

## Project start

1. **rename .env.example to .env**

2. **In order to start application use this command:**

```
  docker compose up --build
```

**First user with admin role will be created automatically**

- Credentials for admin

```json
{
  "email": "admin@admin.com",
  "password": "admin"
}
```

### Useful files

- [UML db schema](./diagrams/db-diagram.png)
- [Seeds](./data/seeds)
- [Migrations](./src/db/migrations)
- [Postman Collection](./postman-collection.json)

## Base url

```
http://localhost:3000/api/v1/
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

## Description

This app is a Lawyer Matching Service platform which allows to match clients and lawyers. As a client you can create your own accound and hire(create a case) a lwayer.
As a lawyer you can create your own account, fill information about yourself, like price, occupation (eg. Business, Criminal, Family), age, experience, location, etc.

### Stack

- node.js
- express
- TS
- posgresql
- redis
- docker
- knex

### Navigation

- [Project Description](#description)
- [Exceptions](#exceptions)
- [Authentication](#authentication)
- [End Points](#end-points)
  - [Profile](#profile)
    - [Get Profile](#get-profile)
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
    - [Create Client's case](#create-clients-case)
    - [Get Client's cases](#get-clients-cases)
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

# API documentation

# End-points

---

## `/profile`

Endpoint to work with profile

### Get Profile

- Required:
  - access token

`GET /`

Request body example

```json
{
  "result": {
    "id": 1,
    "email": "admin@admin.com",
    "roleId": 1,
    "city": "admin",
    "firstName": "admin",
    "lastName": "admin",
    "admin": {
      "id": 1,
      "userId": 1,
      "isActive": true
    }
  }
}
```

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

- Required:
  - access token

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

- Required:
  - acess token

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token

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

- Required:
  - acess token

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - lawyer role

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

- Required:
  - acess token

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

- Required:
  - acess token

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

- Required:
  - acess token

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

### Create Client's case

- Required:
  - acess token
  - client role

`POST /clients/cases`

Request body example

```json
{
  "lawyerId": 1,
  "budget": 10,
  "description": "some case"
}
```

Expected response `200 OK`

```json
{
  "result": {
    "id": 13,
    "lawyerId": 1,
    "clientId": 7,
    "description": "some case",
    "status": "creating",
    "budget": 10,
    "startDate": "2023-10-29T20:21:57.953Z",
    "endDate": null
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

### Get Client's cases

- Required:
  - acess token

`POST /clients/7/cases`

Expected response `200 OK`

```json
{
  "result": [
    {
      "id": 11,
      "lawyerId": 1,
      "clientId": 7,
      "description": "some case",
      "status": "creating",
      "budget": 10,
      "startDate": "2023-10-29T20:16:16.048Z",
      "endDate": null
    },
    {
      "id": 12,
      "lawyerId": 1,
      "clientId": 7,
      "description": "some case",
      "status": "creating",
      "budget": 10,
      "startDate": "2023-10-29T20:17:21.032Z",
      "endDate": null
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

## `/cases`

Endpoint to work with cases

### Create A Case

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token

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

- Required:
  - acess token

`GET /cases/:id`

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

- Required:
  - acess token
  - admin role

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

### Create A Client

`POST /clients`

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

### Fulfill A Case

- Required:
  - acess token
  - lawyer role
  - the same lawyer id as in case

`POST /cases/:id/fulfill`

Expected response `200 OK`

```json
{
  "result": {
    "id": 1,
    "lawyerId": 1,
    "clientId": 2,
    "status": "fulfilled",
    "budget": 228,
    "startDate": "13-09-2023",
    "endDate": "22-09-2023"
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

### Reject A Case

- Required:
  - acess token
  - lawyer role
  - the same lawyer id as in case

`POST /cases/:id/reject`

Expected response `200 OK`

```json
{
  "result": {
    "id": 1,
    "lawyerId": 1,
    "clientId": 2,
    "status": "rejected",
    "budget": 228,
    "startDate": "13-09-2023",
    "endDate": "22-09-2023"
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

### Admit A Case

#### Lawyer can admit (take part in) this case

- Required:
  - acess token
  - lawyer role
  - the same lawyer id as in case

`POST /cases/:id/admit`

Expected response `200 OK`

```json
{
  "result": {
    "id": 1,
    "lawyerId": 1,
    "clientId": 2,
    "status": "active",
    "budget": 228,
    "startDate": "13-09-2023",
    "endDate": "22-09-2023"
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

### Create Case's Review

- Required:
  - acess token
  - lawyer or admin role
  - lawyer or admin id to match lawyer or admin id inside case

`POST /cases/reviews`

Request body example

```json
{
  "rate": 1,
  "message": "all is ok"
}
```

Expected response `201 Created`

```json
{
  "result": {
    "id": 2,
    "rate": 1,
    "message": "all is ok",
    "creator": "client | lawyer"
  }
}
```

Expected errors message `404 Unauthorized`

```json
{
  "error": {
    "message": "Session Does Not Exist!"
  }
}
```

### Get Case's Reviews

- Required:
  - acess token

`GET /cases/1/reviews`

Expected response `201 Created`

```json
{
  "result": [
    {
      "id": 1,
      "rate": 1,
      "creator": "lawyer"
    },
    {
      "id": 2,
      "rate": 1,
      "creator": "client"
    }
  ]
}
```

Expected errors message `404 Unauthorized`

```json
{
  "error": {
    "message": "Session Does Not Exist!"
  }
}
```

### Create Case's conflict

- Required:
  - acess token
  - user role which take part in this case

`POST /cases/:id/conflicts`

Request body example

```json
{
  "reason": "some reason"
}
```

Expected response `201 Created`

```json
{
  "result": {
    "id": 3,
    "adminId": null,
    "caseId": 1,
    "reason": "some reason",
    "status": "processing"
  }
}
```

Expected errors message `400 Bad Request`

```json
{
  "error": {
    "message": "You are not allowed to perfom this action!"
  }
}
```

### Get Case's conflicts

- Required:
  - acess token

`GET /cases/:id/conflicts`

Expected response `200 OK`

```json
{
  "result": [
    {
      "id": 2,
      "adminId": null,
      "caseId": 1,
      "reason": "some reason text",
      "status": "fulfilled"
    },
    {
      "id": 3,
      "adminId": null,
      "caseId": 1,
      "reason": "123",
      "status": "fulfilled"
    }
  ]
}
```

Expected errors message `400 Bad Request`

```json
{
  "error": {
    "message": "You are not allowed to perfom this action!"
  }
}
```

## `/admins`

Endpoint to work with users

### Get All Admins

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token

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

- Required:
  - acess token

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token

`GET /reviews` - get all reviews

Expected response `200 OK`

```json
{
  "result": [
    {
      "id": "1",
      "rate": "[1-5]",
      "creator": "admin | client",
      "message": "Very cool lawyer"
    },
    {
      "id": "2",
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

- Required:
  - acess token

`GET /reviews/:id` - get review by id

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
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

- Required:
  - acess token
  - admin role

`POST /reviews`

Request body example

```json
{
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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

`DELETE /reviews/:id`

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
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

- Required:
  - acess token

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

- Required:
  - acess token

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token

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
      "reason": "Lawyer stole my money",
      "status": "processing | fulfilled | rejected"
    },
    {
      "id": "2",
      "adminId": "2",
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

- Required:
  - acess token

`GET /conflicts/:id` - get conflict by id

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "adminId": "1",
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

- Required:
  - acess token
  - admin role

`POST /conflicts`

Request body example

```json
{
  "adminId": "1",
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

- Required:
  - acess token
  - admin role

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

- Required:
  - acess token
  - admin role

`DELETE /conflicts/:id`

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "adminId": "1",
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

- Required:
  - acess token
  - admin role

`POST /conflicts/:id/fulfill`

Request body example

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "adminId": "1",
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

- Required:
  - acess token
  - admin role

`POST /conflicts/:id/reject`

Request body example

Expected response `200 OK`

```json
{
  "result": {
    "id": "1",
    "adminId": "1",
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
