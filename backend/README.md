# Uber Clone Backend Documentation

## Overview

This repository contains the backend code for an Uber Clone application. It is built using **Express.js**, **MongoDB**, and related technologies to handle user registration, authentication, and other backend services. The project includes a robust RESTful API structure with validation, database integration, and more.

---

## Table of Contents
1. [.env Variables](#env-variables)
2. [Project Setup](#project-setup)
3. [API Endpoints](#api-endpoints)
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
### Setp 3: Enter this command 
Enter this command to install all packages
```
npm install
```

# api-endpoints
#### Your all API's endpoints are

## 1. Registration API

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

