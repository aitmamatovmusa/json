## JSON API Service

This repository features a backend JSON API service built with Nest.js and PostgreSQL. It offers a secure and efficient solution for managing user data and delivering information to web and mobile clients.

### Features

- **User Authentication**: Secure user registration and login using session tokens.
- **Session Management**: Protects API endpoints with session-based authentication.
- **Data Endpoints**: Fetches public information, user profiles, authors, and quotes.

### Getting Started

#### Prerequisites

- Node.js
- PostgreSQL

#### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/aitmamatovmusa/json.git
   cd json
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file and add:

   ```env
   DATABASE_HOST=
   DATABASE_PORT=
   DATABASE_USERNAME=
   DATABASE_PASSWORD=
   DATABASE_NAME=
   REDIS_HOST=
   REDIS_PORT=
   SESSION_SECRET=
   HASH_ITERATIONS=
   HASH_KEYLEN=
   HASH_DIGEST=
   ```

4. **Run database migrations**:

   ```bash
   npm run migrate
   ```

5. **Start the server**:
   ```bash
   npm start
   ```

### API Endpoints

- **GET /info**: Returns public information.
- **POST /register**: Registers a new user.
- **POST /login**: Logs in a user and returns a session token.
- **GET /profile**: Returns the user’s profile (requires authentication).
- **GET /author**: Returns random author info (requires authentication).
- **GET /quote**: Returns a random quote (requires authentication).
- **DELETE /logout**: Logs out the user.
