# User Registration API Documentation

## Overview

This API allows users to register an account by providing their `email`, `firstname`, `secondname`, and `password`. The registration endpoint ensures that the provided data is valid and stores the user information in the MongoDB database. It also checks if the user already exists to avoid duplicates.

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
