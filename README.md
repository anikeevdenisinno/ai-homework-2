# JSONPlaceholder API Clone

This is a Spring Boot implementation of the JSONPlaceholder API with added JWT authentication and PostgreSQL database support.

## Features

- Full REST API implementation matching JSONPlaceholder
- JWT-based authentication
- PostgreSQL database with Hibernate ORM
- Docker and Docker Compose support
- User registration and login
- Protected endpoints requiring authentication

## Prerequisites

- Java 17 or higher
- Maven
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Getting Started

### Using Docker Compose

1. Clone the repository
2. Run the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

### Manual Setup

1. Clone the repository
2. Configure the database in `src/main/resources/application.properties`
3. Build the project:
   ```bash
   mvn clean package
   ```
4. Run the application:
   ```bash
   java -jar target/jsonplaceholder-api-0.0.1-SNAPSHOT.jar
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Users

- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/{id}` - Update a user
- `DELETE /api/users/{id}` - Delete a user

## Authentication

All endpoints except `/api/auth/**` require JWT authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Example Requests

### Register a new user
```json
POST /api/auth/register
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```

### Login
```json
POST /api/auth/login
{
    "email": "john@example.com",
    "password": "password123"
}
```

### Create a user
```json
POST /api/users
{
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "address": {
        "street": "123 Main St",
        "suite": "Apt 4B",
        "city": "New York",
        "zipcode": "10001",
        "geo": {
            "lat": "40.7128",
            "lng": "-74.0060"
        }
    },
    "phone": "1-234-567-8901",
    "website": "johndoe.com",
    "company": {
        "name": "Acme Inc",
        "catchPhrase": "Making the world a better place",
        "bs": "Enterprise software solutions"
    }
}
```

## Testing

Run the tests using Maven:
```bash
mvn test
```

## Security

- Passwords are hashed using BCrypt
- JWT tokens expire after 24 hours
- All sensitive endpoints require authentication
- CORS is disabled for simplicity (configure as needed)