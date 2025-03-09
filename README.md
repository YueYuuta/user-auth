Authentication API

An advanced and modular Authentication API built with NestJS. It follows clean architecture principles, integrates Swagger for documentation, and ensures robust validation and error handling.

---

Table of Contents

1. Features
2. Technologies
3. Setup
4. Usage
5. Email Notifications
6. Documentation
7. Contributing
8. License

---

Features

- User authentication with secure password hashing and token-based login.
- Modular design using Hexagonal Architecture principles.
- Validation of inputs with class-validator.
- Comprehensive API documentation using Swagger.
- Centralized error handling with custom exceptions.
- Scalable event-driven architecture with EventEmitter.
- **Email notifications for events such as user registration.**

---

Technologies

- NestJS (Framework)
- Swagger (API Documentation)
- class-validator (Validation)
- PostgreSQL (Database)
- Docker (Environment Setup)
- EventEmitter2 (Event-Driven Architecture)
- Nodemailer (Email Notifications)

---

Setup

Prerequisites

- Node.js (v16+)
- Docker and Docker Compose (for database setup)
- PostgreSQL (if not using Docker)

Installation

1. Clone the repository:
   git clone https://github.com/YueYuuta/user-auth.git
   cd user-auth

2. Install dependencies:
   npm install

3. Set up the environment variables.
   These variables are **required** for the application to run and **should not be committed to the repository**.
   Create a `.env` file in the root directory with the following content:

   HOST PORT USERDB PASSWORD DATABASE JWT_SECRET EMAIL_USER EMAIL_PASS

4. (Optional) Run the database using Docker:
   docker-compose up -d

Running the Application

- Start the development server:
  npm run start

- Start in watch mode:
  npm run start:dev

- Build for production:
  npm run build
  npm run start:prod

---

Usage

API Endpoints

Authentication

- POST /auth/register: Register a new user.
- POST /auth/login: Authenticate a user and return a JWT.

Example Request: Register
POST /auth/register
Content-Type: application/json
Body:
{
"email": "user@example.com",
"password": "Password123",
"username": "User123"
}

Example Response: Register
{
"message": "User successfully registered"
}

Example Request: Login
POST /auth/login
Content-Type: application/json
Body:
{
"username": "User123",
"password": "Password123"
}

Example Response: Login
{
"access_token": "your.jwt.token"
}

Email Notifications

The application is configured to send email notifications for specific events such as **user registration**. This is achieved using **Nodemailer** and environment variables for secure email account integration.

### Environment Variables for Email

## To enable email notifications, ensure the following variables are set in your `.env` file:

EMAIL_USER=your_email EMAIL_PASS=your_password

### How It Works

- When a user registers, the application sends a **welcome email** to their email address.
- The email is sent using the SMTP configuration derived from the environment variables.

### Example Welcome Email

Documentation
Swagger UI is available at: http://localhost:3000/api

Features in Swagger

- Explore all available endpoints.
- Test API requests directly in the browser.
- View request and response models.

---

Contributing

1. Fork the repository.
2. Create a new branch:
   git checkout -b feature/your-feature-name
3. Commit your changes:
   git commit -m "Add new feature"
4. Push to the branch:
   git push origin feature/your-feature-name
5. Open a pull request on GitHub.

---

License
This project is licensed under the MIT License - see the LICENSE file for details.
