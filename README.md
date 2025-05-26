# User Management Application

This is a simple User Management Application built with Angular that consumes a C# backend API and integrates with JSONPlaceholder for sample data.

## Features

- View a list of users
- Add new users
- Edit existing users
- Delete users
- Form validation for user inputs

## Prerequisites

- Node.js (v14 or higher)
- Angular CLI (v19 or higher)
- .NET 6.0 SDK or later (for backend)

## Project Structure

The project is divided into two main parts:

### Frontend (Angular)

- Built with Angular 19
- Responsive UI with form validation
- Communicates with the backend API

### Backend (C#)

- C# API that integrates with JSONPlaceholder
- Provides endpoints for CRUD operations on user data

## How to Run the Application

### Frontend (Angular)

1. Navigate to the project directory:
```bash
cd taxes
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200/`

### Backend (C#)

The backend implementation details and setup instructions are provided separately.

##### Backend - source code
https://github.com/yechielby/UserManagementApp

## API Integration

The application integrates with JSONPlaceholder's `/users` endpoint to simulate a real backend.

- GET /users - Get all users
- GET /users/{id} - Get a specific user
- POST /users - Create a new user
- PUT /users/{id} - Update a user
- DELETE /users/{id} - Delete a user

## Form Validation

The application implements the following validations:

- Required fields: name, username, and email
- Email format validation
- Display of error messages for invalid inputs

## Technical Details

- Angular 19
- Reactive Forms for form handling and validation
- HttpClient for API communication
- Modular component architecture
