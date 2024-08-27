
# Project Management Tool

## Overview

This project is a simplified project management tool that allows users to create, update, delete, and view projects and tasks. The application is divided into two main parts: the backend (Node.js with TypeScript) and the frontend (React.js with TypeScript).

## Features

- User Registration and Authentication
- Project Management (CRUD operations)
- Task Management (CRUD operations)
- JWT-based Authentication
- Protected Routes

## Technologies Used

### Backend
- Node.js
- Express.js
- TypeScript
- TypeORM
- PostgreSQL
- JWT (JSON Web Tokens)
- bcrypt.js

### Frontend
- React.js
- TypeScript
- Axios
- React Router

## Setup Instructions

### Prerequisites
- Node.js and npm/yarn installed
- PostgreSQL installed

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd project-management-backend
   ```
2. Install the dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the backend root directory and add the following environment variables:
   ```
   JWT_SECRET=your_jwt_secret
   DATABASE_URL=postgres://username:password@localhost:5432/project_management
   ```
4. Run the backend server:
   ```
   npm run start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd project-management-frontend
   ```
2. Install the dependencies:
   ```
   npm install
   ```
3. Run the React development server:
   ```
   npm start
   ```

The frontend should be running on `http://localhost:3000` and the backend on `http://localhost:5000`.
