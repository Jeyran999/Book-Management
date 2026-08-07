# Book Management API

A RESTful API for managing books, authors, and categories. This project was developed using Node.js, Express.js, and MongoDB following a layered architecture.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Joi
- Swagger / OpenAPI
- Jest

## Features

- Create a book
- Get all books
- Get a book by ID
- Update a book
- Delete a book
- Input validation with Joi
- Centralized error handling
- Pagination and sorting
- Swagger/OpenAPI API documentation
- Unit tests for the service layer
- JWT-based authentication
- Stateless authentication
- Role-Based Access Control (RBAC)
- USER and ADMIN roles
- Protected routes
- JWT token expiration handling
- Proper 401 and 403 authentication error responses
- Advanced search and filtering
- MongoDB transactions with Mongoose sessions
- Automatic transaction rollback on failure
- Optimized related data loading using populate()

## Authentication & Authorization

This API uses JWT-based authentication.

Users can have one of the following roles:

- `USER`
- `ADMIN`

JWT tokens expire after 1 day.

### Access Control

| Endpoint            | USER | ADMIN |
| ------------------- | ---- | ----- |
| `GET /books`        | ✅   | ✅    |
| `GET /books/:id`    | ✅   | ✅    |
| `POST /books`       | ❌   | ✅    |
| `PUT /books/:id`    | ❌   | ✅    |
| `DELETE /books/:id` | ❌   | ✅    |

### Authentication Errors

- `401 Unauthorized` — Returned when the authentication token is missing, invalid, or expired.
- `403 Forbidden` — Returned when the user is authenticated but does not have the required role.

## Project Structure

```text
src/
├── config/
│   └── swagger.js
├── controllers/
│   └── book.controller.js
├── dto/
│   └── book.dto.js
├── middlewares/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   ├── role.middleware.js
│   └── validate.middleware.js
├── models/
│   ├── author.model.js
│   ├── book.model.js
│   ├── category.model.js
│   └── user.model.js
├── repositories/
│   ├── book.repository.js
│   └── user.repository.js
├── routes/
│   └── book.routes.js
├── services/
│   ├── book.service.js
│   └── auth.service.js
├── tests/
│   └── book.service.test.js
├── utils/
│   ├── jwt.js
│   └── password.js
├── validations/
│   └── book.validation.js
└── app.js
```

## Installation

Clone the repository:

```bash
git clone "https://github.com/Jeyran999/Week-1-Book-Management"
```

Navigate to the project directory:

```bash
cd book-management-api
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

## Environment Variables

Create a `.env` file with the following variables:

```env
PORT=3000
MONGO_URI=mongodb_connection_string
JWT_SECRET=your_secret_key
```

You can use `.env.example` as a template.

## API Endpoints

### Create a Book

```text
POST /books
```

**Required role:** `ADMIN`

### Get All Books

```text
GET /books
```

Pagination and sorting example:

```text
GET /books?page=1&limit=10&sortBy=title&order=asc
```

### Search Books

```text
GET /books/search
```

Example:

```text
GET /books/search?title=clean&author=Robert&category=Programming&tag=Backend&minYear=2000&maxYear=2024&sortBy=title&order=asc
```

Supported query parameters:

- `title`
- `author`
- `category`
- `tag`
- `minYear`
- `maxYear`
- `sortBy`
- `order`

### Get a Book by ID

```text
GET /books/:id
```

### Update a Book

```text
PUT /books/:id
```

**Required role:** `ADMIN`

### Delete a Book

```text
DELETE /books/:id
```

**Required role:** `ADMIN`

## API Documentation

Swagger UI is available at:

```text
http://localhost:3000/api-docs
```

The Swagger documentation provides information about all available API endpoints and allows them to be tested directly.

## Testing

Unit tests were added for the Book Service layer using Jest.

Current tests include:

- Book retrieval by ID
- Book not found scenario
- Transaction rollback scenario

Run tests with:

```bash
npm test
```

## Checkpoints

### Week 1

- **CP-1:** Project setup and entity design
- **CP-2:** Layered architecture and DTO implementation
- **CP-3:** Complete CRUD endpoints with correct HTTP status codes
- **CP-4:** Input validation and centralized exception handling
- **CP-5:** Pagination and sorting
- **CP-6:** Swagger/OpenAPI API documentation
- **CP-7:** Unit tests for the service layer

### Week 2

- **CP-1:** JWT-based authentication and stateless session management
- **CP-2:** Role-Based Access Control with USER and ADMIN roles
- **CP-3:** Correct responses for authentication errors (401 and 403)
- **CP-4:** JWT token expiration handling

### Week 3

- **CP-1:** Advanced search, filtering and sorting
- **CP-2:** MongoDB transactions using Mongoose sessions
- **CP-3:** Transaction rollback implementation
- **CP-4:** Optimized related data loading using populate()
- **CP-5:** Transaction rollback unit tests with Jest

## License

This project was developed for educational purposes.
