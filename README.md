# API documentation

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
	"role": "lawyer | client",
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
		"role": "lawyer | client",
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
		"role": "lawyer | client",
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
		"role": "lawyer | client",
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
			"role": "lawyer | client",
			"city": "Kyiv"
		},
		{
			"id": "2",
			"firstName": "firstName",
			"lastName": "lastName",
			"email": "email2@email.com",
			"role": "lawyer | client",
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
		"role": "lawyer | client",
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
	"start_date": "13-09-2023",
	"end_date": "15-09-2023"
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
		"start_date": "13-09-2023",
		"end_date": "15-09-2023"
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
			"start_date": "13-09-2023",
			"end_date": "15-09-2023"
		},
		{
			"id": 2,
			"lawyerId": 1,
			"clientId": 2,
			"status": "active | fulfilled | failed | creating",
			"budget": 228,
			"start_date": "13-09-2023",
			"end_date": "15-09-2023"
		},
		{
			"id": 3,
			"lawyerId": 1,
			"clientId": 2,
			"status": "active | fulfilled | failed | creating",
			"budget": 228,
			"start_date": "13-09-2023",
			"end_date": "15-09-2023"
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
		"start_date": "13-09-2023",
		"end_date": "15-09-2023"
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
	"start_date": "13-09-2023",
	"end_date": "22-09-2023"
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
		"start_date": "13-09-2023",
		"end_date": "22-09-2023"
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
