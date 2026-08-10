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
- Multer
- node-cron
- node-cache
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
- Book cover image upload and download
- Image file validation with Multer
- File size restrictions
- Scheduled cache cleanup with node-cron
- Asynchronous email notification simulation
- Environment-based configuration for development and production
- Swagger documentation for protected and file-upload endpoints

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
│   ├── upload.middleware.js
│   └── validate.middleware.js
├── models/
│   ├── author.model.js
│   ├── book.model.js
│   ├── category.model.js
│   ├── tag.model.js
│   └── user.model.js
├── repositories/
│   ├── book.repository.js
│   └── user.repository.js
├── routes/
│   ├── auth.routes.js
│   ├── book.routes.js
│   └── tag.routes.js
├── schedulers/
│   └── cache.scheduler.js
├── services/
│   ├── auth.service.js
│   ├── book.service.js
│   └── notification.service.js
├── tests/
│   └── book.service.test.js
├── utils/
│   ├── cache.js
│   ├── cacheHelper.js
│   ├── jwt.js
│   └── password.js
├── validations/
│   └── book.validation.js
└── app.js
```

## Installation

Clone the repository:

```bash
git clone "https://github.com/Jeyran999/Book-Management.git"
```

Navigate to the project directory:

```bash
cd book-management-api
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

## Environment Configuration

The application supports separate configurations for development and production environments.

### Development

Create a `.env.development` file:

```env
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Production

Create a `.env.production` file:

```env
NODE_ENV=production
PORT=3000
MONGO_URI=mongodb_production_connection_string
JWT_SECRET=your_production_secret
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

### Upload Book Cover

```text
POST /books/:id/cover
```

**Required role:** `ADMIN`

The endpoint accepts JPEG, PNG, WebP, and AVIF image files using multipart/form-data.

Maximum file size: 2 MB.

### Download Book Cover

```text
GET /books/:id/cover/download
```

**Required role:** `ADMIN`

## API Documentation

Swagger UI is available at:

```text
http://localhost:3000/api-docs
```

The Swagger documentation provides information about all available API endpoints and allows them to be tested directly.

## Scheduled Tasks

The application includes a scheduled cache cleanup task using `node-cron`.

The scheduled job runs daily at midnight and automatically clears cached book data to prevent stale cache entries.

## Asynchronous Processing

The application includes an asynchronous email notification simulation.

After a book is created, an email notification is triggered without blocking the main API response. The notification service simulates email delivery using an asynchronous delay.

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

- **CP-1:** User entity and password hashing with BCrypt
- **CP-2:** Registration and Login endpoints with JWT authentication
- **CP-3:** JWT authentication middleware and stateless session management
- **CP-4:** Role-Based Access Control with different endpoints for USER and ADMIN
- **CP-5:** Correct authentication error responses (401 Unauthorized and 403 Forbidden)
- **CP-6:** JWT token expiration management

### Week 3

- **CP-1:** Proper design of One-to-Many and Many-to-Many relationships using Mongoose references
- **CP-2:** Complex filtering using Mongoose query methods
- **CP-3:** Dynamic search and filtering endpoint with multiple query parameters
- **CP-4:** MongoDB transactions using Mongoose sessions for operations involving multiple documents
- **CP-5:** Optimized related data loading using `populate()` to avoid inefficient queries
- **CP-6:** Unit tests for the transaction rollback scenario using Jest

### Week 4

- **CP-1:** Book cover image upload and download using Multer
- **CP-2:** Image file validation and file size restrictions
- **CP-3:** Scheduled task using node-cron for daily cache cleanup
- **CP-4:** Asynchronous processing with email notification simulation
- **CP-5:** Book cover file handling and storage
- **CP-6:** Environment-based configuration with development and production profiles
- **CP-7:** Swagger/OpenAPI documentation update

## License

This project was developed for educational purposes.