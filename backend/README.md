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

### 1. Clone the Project

To clone this project to your local machine, run the following command:

```bash
git clone https://github.com/your-username/uber-clone-backend.git
