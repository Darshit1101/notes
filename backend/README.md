# Notes App - Backend

A RESTful API server for a notes management application built with Node.js, Express.js, and MongoDB.

## Features

- **User Authentication**: JWT-based authentication system with bcrypt password hashing
- **Notes Management**: Create, read, update, and delete notes
- **User Profile Management**: User profile operations and management
- **Data Export**: Export notes to CSV format
- **Security**: Password encryption, JWT tokens, and CORS support

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Environment Management**: dotenv
- **Data Export**: json2csv
- **Development**: nodemon for auto-restart

## Project Structure

```
backend/
├── api/
│   ├── login/              # Authentication endpoints
│   │   ├── controller.js   # Login logic
│   │   ├── route.js        # Login routes
│   │   └── service.js      # Login services
│   ├── note/               # Notes management endpoints
│   │   ├── controller.js   # Notes logic
│   │   ├── route.js        # Notes routes
│   │   └── service.js      # Notes services
│   └── profile/            # Profile management endpoints
│       ├── controller.js   # Profile logic
│       ├── route.js        # Profile routes
│       └── service.js      # Profile services
├── collection/             # Database models
│   ├── index.js           # Model exports
│   ├── login.js           # User model
│   └── note.js            # Note model
├── config/                 # Configuration files
│   ├── global.js          # Global configurations and middleware
│   ├── middleware.js      # Custom middleware
│   └── route.js           # Route configurations
├── exports/               # Generated export files
├── service/               # Utility services
│   └── passwordService.js # Password utilities
├── server.js             # Entry point
├── package.json          # Dependencies and scripts
├── .env                  # Environment variables
└── .env.example          # Environment variables template
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd notes/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration:

   ```env
   PORT=1101
   MONGO_CONNECTION_URL=mongodb://localhost:27017/database
   API_PREFIX=/api
   JWT_SECRET_KEY=your-secret-key-here
   JWT_EXPIRE_TIME=30d
   PAGE_SIZE=10
   ```

4. **Database Setup**
   - Ensure MongoDB is running on your system
   - The application will connect to MongoDB using the URL specified in `.env`

## Usage

### Development

```bash
npm run dev
# or if you have nodemon globally installed
nodemon server.js
```

### Production

```bash
npm start
# or
node server.js
```

The server will start on the port specified in your `.env` file (default: 1101).

## API Endpoints

### Authentication

- `POST /api/login` - User login
- `POST /api/register` - User registration (if implemented)

### Notes

- `GET /api/notes` - Get all notes (authenticated)
- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get a specific note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note
- `GET /api/notes/export` - Export notes to CSV

### Profile

- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

## Environment Variables

| Variable               | Description               | Default                            |
| ---------------------- | ------------------------- | ---------------------------------- |
| `PORT`                 | Server port               | 1101                               |
| `MONGO_CONNECTION_URL` | MongoDB connection string | mongodb://localhost:27017/database |
| `API_PREFIX`           | API route prefix          | /api                               |
| `JWT_SECRET_KEY`       | Secret key for JWT tokens | Required                           |
| `JWT_EXPIRE_TIME`      | JWT token expiration time | 30d                                |
| `PAGE_SIZE`            | Default pagination size   | 10                                 |

## Security Features

- **Password Hashing**: Passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **CORS**: Cross-Origin Resource Sharing enabled
- **Environment Variables**: Sensitive data stored in environment variables

## Database Models

### User Model (`collection/login.js`)

- User authentication and profile information

### Note Model (`collection/note.js`)

- Note structure and metadata

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please create an issue in the repository.
