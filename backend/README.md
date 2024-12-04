# Uber Clone Backend Documentation

## Overview

This repository contains the backend code for an Uber Clone application. It is built using **Express.js**, **MongoDB**, and related technologies to handle user registration, authentication, and other backend services. The project includes a robust RESTful API structure with validation, database integration, and more.

---

## Table of Contents
1. [.env Variables](#.env-variables)
2. [Project Setup](#project-setup)
3. [API Endpoints](#api-endpoints)
   1. [User API](#user-api)
      1. [Register User](#register-user)
      2. [Login User](#login-user)
4. [File Structure](#file-structure)
5. [Commands](#commands)



---
## .env Variables

To run this project, you need to set up a `.env` file in the root directory with the following variables:

| Variable Name       | Description                                                   | Example Value                        |
|---------------------|---------------------------------------------------------------|--------------------------------------|
| `MONGO_URI`         | MongoDB connection string for the database                    | `mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname` |
| `JWT_SECRET_KEY`    | Secret key for signing JSON Web Tokens (JWT)                  | `yoursecretkey`                      |

---

## Project Setup

### Step 1: Clone the Project

To clone this project to your local machine, use the following command:

```bash
git clone https://github.com/your-username/uber-clone-backend.git

```

### Step 2: Open terminal in backend folder
```
cd uber-clone-backend/backend
```
### Step 3: Enter this command 
Enter this command to install all packages
```
npm install
```

### Step 4: Run Command
Open terminal in backend folder enter this command to run your backend server
```
npm run dev
```

# api-endpoints
#### Your all API's endpoints are

## User API

## Register User

This API allows users to register an account by providing their email, firstname, secondname, and password. The registration endpoint ensures that the provided data is valid and stores the user information in the MongoDB database. It also checks if the user already exists to avoid duplicates.

## Endpoint

### `POST /users/register`

This endpoint allows users to register a new account.

#### Request Body

The request body should be in JSON format and must contain the following fields:

| Field        | Type   | Description                                      | Validation Rules                                                                 |
|--------------|--------|--------------------------------------------------|----------------------------------------------------------------------------------|
| `fullname`   | Object | Full name of the user                            | Required, contains `firstname` (min 3 characters) and `secondname` (min 3 chars) |
| `firstname`  | String | First name of the user                           | Required, min length 3                                                           |
| `secondname` | String | Last name of the user                            | Optional, min length 3                                                           |
| `email`      | String | Email address of the user                        | Required, must be a valid email address                                           |
| `password`   | String | Password for the user account                    | Required, min length 3                                                           |

Example request body:

```json
{
  "fullname": {
    "firstname": "John",
    "secondname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

## Login User

This API allows users to log into their accounts by providing their registered email and password. Upon successful authentication, the system generates a **JWT token** and sends it back to the user in the response. This token can be used for authentication in subsequent requests.

### Endpoint

```http
POST /users/login
```
### Request Body
The request body should be in JSON format and must include the following fields:

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

## Response
### Success (200 OK)
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
``` 
### Error (400 Bad Request)
```json
{
  "success": false,
  "message": "Email and password are required"
}
```
### Error (404 Not Found)
```json
{
  "success": false,
  "message": "User not found"
}
```
### Error (400 Bad Request)
```json
{
  "success": false,
  "message": "Password did not match"
}
```