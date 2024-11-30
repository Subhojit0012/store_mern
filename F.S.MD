## Folder Structure

# Config Folder

This folder contains configuration files for the application.

## Files

- **allowedOrigins.js**: Specifies the list of allowed origins for CORS.
- **corsOptions.js**: Configures CORS options using the allowed origins.

# Controllers Folder

This folder contains the controller logic for handling requests and responses.

## Files

- **authController.js**: Manages authentication processes including login, refresh, and logout.
- **noteControllers.js**: Handles CRUD operations for notes.
- **usersControllers.js**: Manages user-related operations such as creating, updating, and deleting users.

# DataBase Folder

This folder contains the database connection logic.

## Files

- **dbConnect.js**: Establishes a connection to the MongoDB database using Mongoose.

# Middleware Folder

This folder contains middleware functions for the application.

## Files

- **errorHandler.js**: Logs errors and sends error responses.
- **logger.js**: Logs request details and events.
- **loginLimiter.js**: Limits login attempts to prevent brute force attacks.
- **verifyJWT.js**: Verifies JWT tokens for protected routes.

# Models Folder

This folder contains Mongoose models for the application.

## Files

- **Note.js**: Defines the schema for notes, including fields and auto-incrementing ticket numbers.
- **User.js**: Defines the schema for users, including username, password, roles, and active status.

# Routes Folder

This folder contains route definitions for the application.

## Files

- **authRoute.js**: Defines routes for authentication-related operations.
- **noteRoutes.js**: Defines routes for note-related operations, protected by JWT verification.
- **root.js**: Serves the main HTML page.
- **userRoutes.js**: Defines routes for user-related operations, protected by JWT verification.

# CSS Folder

This folder contains stylesheets for the application.

## Files

- **style.css**: Provides basic styling for the HTML pages.

# Views Folder

This folder contains HTML files for the application.

## Files

- **404.html**: Displays a 404 error message when a page is not found.
- **index.html**: The main landing page of the application.
