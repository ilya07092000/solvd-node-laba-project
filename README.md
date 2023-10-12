# API documentation

### Navigation

- [Project Description](#description)
- [Exceptions](#exceptions)
- [Authentication](#authentication)
- [End Points](#end-points)
  - [Auth](#auth)
  - [Users](#users)
  - [Lawyers](#clients)
  - [Clients](#clients)
  - [Cases](#cases)
  - [Admins](#admins)
  - [Roles](#roles)
  - [Reviews](#reviews)
  - [Licenses](#licenses)
  - [Verifications](#verifications)

---

## Description

This app is a Lawyer Matching Service platform which allows match clients and lawyers. As a client you can create your own accound and hire(create a case) a layer based on filter parameters as budget, avialability, lawer type.
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
	"role": "lawyer | client | admin",
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
		"role": "lawyer | client | admin",
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
		"role": "lawyer | client | admin",
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

`POST /auth/logout`
Request Example

```
POST /logout
Authorizations: bearer {access-token}
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

`POST /auth/refresh-token`
Request Example

Request body example

```json
{
	"refreshToken": "sdffs123dsf"
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
		"role": "lawyer | client | admin",
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
		"message": "Token is not valid"
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
			"role": "lawyer | client | admin",
			"city": "Kyiv"
		},
		{
			"id": "2",
			"firstName": "firstName",
			"lastName": "lastName",
			"email": "email2@email.com",
			"role": "lawyer | client | admin",
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
		"role": "lawyer | client | admin",
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
	"role": "lawyer",
	"age": "44",
	"occupation": "Business",
	"price": "228",
	"experience": "10 years",
	"city": "Kyiv",
	"available": true
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
		"password": "password123",
		"role": "lawyer",
		"age": "44",
		"occupation": "Business",
		"price": "228",
		"experience": "10 years",
		"city": "Kyiv",
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

### Edit User By Id

`PUT /users/:id`

Request body example

```json
{
	"price": "228",
	"experience": "10 years",
	"city": "Kyiv",
	"available": true
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
		"password": "password123",
		"role": "lawyer",
		"age": "44",
		"occupation": "Business",
		"price": "228",
		"experience": "10 years",
		"city": "Kyiv",
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
		"password": "password123",
		"role": "lawyer",
		"age": "44",
		"occupation": "Business",
		"price": "228",
		"experience": "10 years",
		"city": "Kyiv",
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

## `/lawyers`

Endpoint to work with lawyers

### Get Lawyers

`get /lawyers` - get all lawyers with all info

Expected response `200 OK`

```json
{
	"result": [
		{
			"id": "1",
			"firstName": "firstName",
			"lastName": "lastName",
			"email": "email@email.com",
			"password": "password123",
			"role": "lawyer",
			"age": "44",
			"occupation": "Business",
			"price": "228",
			"experience": "10 years",
			"city": "Kyiv",
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
		"id": "1",
		"firstName": "firstName",
		"lastName": "lastName",
		"email": "email@email.com",
		"password": "password123",
		"role": "lawyer",
		"age": "44",
		"occupation": "Business",
		"price": "228",
		"experience": "10 years",
		"city": "Kyiv",
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
	"firstName": "firstName",
	"lastName": "lastName",
	"email": "email@email.com",
	"password": "password123",
	"role": "lawyer",
	"age": "44",
	"occupation": "Business",
	"price": "228",
	"experience": "10 years",
	"city": "Kyiv",
	"available": true
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
		"password": "password123",
		"role": "lawyer",
		"age": "44",
		"occupation": "Business",
		"price": "228",
		"experience": "10 years",
		"city": "Kyiv",
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
	"age": "44",
	"occupation": "Business",
	"price": "228",
	"experience": "10 years",
	"available": false
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
		"password": "password123",
		"role": "lawyer",
		"age": "44",
		"occupation": "Business",
		"price": "228",
		"experience": "10 years",
		"city": "Kyiv",
		"available": false
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

### Delete Lawer By Id

`DELETE /lawers/:id`

Expected response `200 OK`

```json
{
	"result": {
		"id": "1",
		"firstName": "firstName",
		"lastName": "lastName",
		"email": "email@email.com",
		"password": "password123",
		"role": "lawyer",
		"age": "44",
		"occupation": "Business",
		"price": "228",
		"experience": "10 years",
		"city": "Kyiv",
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

## `/clients`

Endpoint to work with clients

### Get All Clients

`GET /clients` - get all clients with all info

Expected response `200 OK`

```json
{
	"result": [
		{
			"id": "1",
			"firstName": "firstName",
			"lastName": "lastName",
			"email": "email@email.com",
			"role": "client",
			"city": "Kyiv",
			"budget": 228
		},
		{
			"id": "2",
			"firstName": "firstName",
			"lastName": "lastName",
			"email": "email2@email.com",
			"role": "client",
			"city": "Lviv",
			"budget": 228
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

### Create Client

`POST /clients`

Request body example

```json
{
	"firstName": "firstName",
	"lastName": "lastName",
	"email": "email@email.com",
	"role": "client",
	"city": "Kyiv",
	"budget": 228
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
	"startDate": "13-09-2023",
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
		"startDate": "13-09-2023",
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
			"startDate": "13-09-2023",
			"endDate": "15-09-2023"
		},
		{
			"id": 2,
			"lawyerId": 1,
			"clientId": 2,
			"status": "active | fulfilled | failed | creating",
			"budget": 228,
			"startDate": "13-09-2023",
			"endDate": "15-09-2023"
		},
		{
			"id": 3,
			"lawyerId": 1,
			"clientId": 2,
			"status": "active | fulfilled | failed | creating",
			"budget": 228,
			"startDate": "13-09-2023",
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
		"startDate": "13-09-2023",
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
	"clientId": 2,
	"status": "active | fulfilled | failed | creating",
	"budget": 228,
	"startDate": "13-09-2023",
	"endDate": "22-09-2023"
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
		"startDate": "13-09-2023",
		"endDate": "22-09-2023"
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
	"status": "active | fulfilled | failed | creating",
	"budget": 228,
	"startDate": "13-09-2023",
	"endDate": "22-09-2023"
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

## `/admins`

Endpoint to work with users

### Get All Admins

`GET /admins` - get all admins

Expected response `200 OK`

```json
{
	"result": [
		{
			"id": "1",
			"firstName": "firstName",
			"lastName": "lastName",
			"email": "email@email.com",
			"role": "admin",
			"city": "Kyiv",
			"isActive": true
		},
		{
			"id": "2",
			"firstName": "firstName",
			"lastName": "lastName",
			"email": "email2@email.com",
			"role": "admin",
			"city": "Kyiv",
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
		"id": "1",
		"firstName": "firstName",
		"lastName": "lastName",
		"email": "email@email.com",
		"role": "admin",
		"city": "Kyiv",
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
	"firstName": "firstName",
	"lastName": "lastName",
	"email": "email@email.com",
	"role": "admin",
	"city": "Kyiv",
	"isActive": true
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
		"role": "admin",
		"city": "Kyiv",
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
		"firstName": "firstName",
		"lastName": "lastName",
		"email": "email@email.com",
		"role": "admin",
		"city": "Kyiv",
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
		"id": "1",
		"firstName": "firstName",
		"lastName": "lastName",
		"email": "email@email.com",
		"role": "admin",
		"city": "Kyiv",
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
			"cliendId": "1",
			"lawyerId": "1",
			"caseId": "1",
			"rate": "[1-5]",
			"message": "Very cool lawyer"
		},
		{
			"id": "2",
			"cliendId": "12",
			"lawyerId": "113",
			"caseId": "89",
			"rate": "[1-5]",
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
		"cliendId": "1",
		"lawyerId": "1",
		"caseId": "1",
		"rate": "[1-5]",
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
	"cliendId": "1",
	"lawyerId": "1",
	"caseId": "1",
	"rate": "[1-5]",
	"message": "Very cool lawyer"
}
```

Expected response `200 OK`

```json
{
	"result": {
		"id": "1",
		"cliendId": "1",
		"lawyerId": "1",
		"caseId": "1",
		"rate": "[1-5]",
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
		"cliendId": "1",
		"lawyerId": "1",
		"caseId": "1",
		"rate": "[1-5]",
		"message": "Lawyer is very bad"
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
		"cliendId": "1",
		"lawyerId": "1",
		"caseId": "1",
		"rate": "[1-5]",
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
			"id": "1",
			"lawyer_id": "228",
			"info": "lawyer license bla bla bla",
			"verification": {
				"id": "10",
				"verifierId": "20",
				"status": "verified | rejected | processing",
				"date": "10-20-2023",
				"notes": "License is genuine"
			}
		},
		{
			"id": "2",
			"lawyer_id": "2",
			"info": "lawyer license bla bla bla",
			"verification": {
				"id": "10",
				"verifierId": "20",
				"status": "verified | rejected | processing",
				"date": "10-20-2023",
				"notes": "License is genuine"
			}
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
		"id": "1",
		"lawyer_id": "228",
		"info": "lawyer license bla bla bla",
		"verification": {
			"id": "10",
			"verifierId": "20",
			"status": "verified | rejected | processing",
			"date": "10-20-2023",
			"notes": "License is genuine"
		}
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
	"id": "1",
	"lawyer_id": "228",
	"info": "lawyer license bla bla bla"
}
```

Expected response `200 OK`

```json
{
	"result": {
		"id": "1",
		"lawyer_id": "228",
		"info": "lawyer license bla bla bla"
	}
}
```

Expected errors `400 Bad request`

```json
{
	"error": {
		"message": "Lawyer with id {caseId} does not exist"
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
		"id": "1",
		"lawyer_id": "228",
		"info": "lawyer license bla bla bla which I received in 2010",
		"verification": {
			"id": "10",
			"verifierId": "20",
			"status": "verified | rejected | processing",
			"date": "10-20-2023",
			"notes": "License is genuine"
		}
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
		"id": "1",
		"lawyer_id": "228",
		"info": "lawyer license bla bla bla",
		"verification": {
			"id": "10",
			"verifierId": "20",
			"status": "verified | rejected | processing",
			"date": "10-20-2023",
			"notes": "License is genuine"
		}
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
	"id": "1",
	"lawyer_id": "228",
	"info": "lawyer license bla bla bla",
	"verification": {
		"id": "10",
		"verifierId": "20",
		"status": "verified",
		"date": "10-20-2023",
		"notes": "License is genuine"
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
	"id": "1",
	"lawyer_id": "228",
	"info": "lawyer license bla bla bla",
	"verification": {
		"id": "10",
		"verifierId": "20",
		"status": "rejected",
		"date": "10-20-2023",
		"notes": "License is not genuine"
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

## `/verifications`

Endpoint to work with verifications

### Get All Verifications

`GET /verifications` - get all verifications

Expected response `200 OK`

```json
{
	"result": [
		{
			"id": "10",
			"licenseId": "1",
			"verifierId": "20",
			"status": "verified | rejected | processing",
			"date": "10-20-2023",
			"notes": "License is genuine"
		},

		{
			"id": "12",
			"licenseId": "2",
			"verifierId": "30",
			"status": "verified | rejected | processing",
			"date": "11-20-2023",
			"notes": "License is not genuine"
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
		"id": "10",
		"licenseId": "1",
		"verifierId": "20",
		"status": "verified | rejected | processing",
		"date": "10-20-2023",
		"notes": "License is genuine"
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
	"licenseId": "1",
	"verifierId": "20",
	"status": "verified | rejected | processing",
	"date": "10-20-2023",
	"notes": "License is genuine"
}
```

Expected response `200 OK`

```json
{
	"result": {
		"id": "10",
		"licenseId": "1",
		"verifierId": "20",
		"status": "verified | rejected | processing",
		"date": "10-20-2023",
		"notes": "License is genuine"
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
		"id": "10",
		"licenseId": "1",
		"verifierId": "20",
		"status": "verified | rejected | processing",
		"date": "10-20-2023",
		"notes": "License is genuine"
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
		"id": "10",
		"licenseId": "1",
		"verifierId": "20",
		"status": "verified | rejected | processing",
		"date": "10-20-2023",
		"notes": "License is genuine"
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
