# API documentation

---

## Description

This app is a Lawyer Matching Service platform which allows match clients and lawyers. As a client you can create your own accound and hire(create a case) a layer based on filter parameters as budget, avialability, lawer type.
As a lawyer you can create your own account, fill information about yourself, like price, (eg. Business, Criminal, Family), age, expirience, location, etc.

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
    "userType": "lawyer" | "client",
}
```

Expected response `201 Created`

```json
{
	"id": "1",
	"email": "email@email.com",
	"firstName": "firstName",
	"lastName": "lastName",
	"userType": "lawyer" | "client",
}
```

Expected errors message `400 Bad Request`

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
	"id": "1",
	"email": "email@email.com",
	"firstName": "firstName",
	"lastName": "lastName",
	"userType": "lawyer" | "client",
    "tokens": {
      "refresh": "231dsf123asfds",
      "access": "sdfwqreew3",
  }
}
```

Expected errors message `400 Bad Request`

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

Expected errors message `400 Bad Request`

```json
{
	"error": {
		"message": "Sesion Does not Exist"
	}
}
```
