# Admin_Dashboard

## Overview

Admin_Dashboard is a full-stack web application for user authentication, admin and task management, and secure password workflows. It features OTP-based password reset, email notifications, and role-based access control. The backend is built with Express.js, TypeScript, and Prisma ORM (MongoDB), while the frontend uses React (Vite) for a modern, responsive user experience.

## Features

- User registration and login with JWT authentication
- Admin approval and management
- Task creation, assignment, and tracking
- Tasks created by admin are automatically sent to the assigned user's email
- Secure password reset via OTP sent to email
- Role-based access control for users and admins
- Protected routes and dynamic dashboards
- Responsive UI with React and CSS Modules

## Tech Stack

- **Frontend:** React, Vite, CSS Modules
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB (via Prisma ORM)
- **Authentication:** JWT, bcryptjs
- **Email:** Nodemailer
- **Other:** Prisma, Axios

## Folder Structure

```
frontend/
  ├── src/
  │   ├── components/
  │   ├── assets/
  │   ├── App.jsx
  │   ├── main.jsx
  │   └── axios.js
  ├── public/
  ├── App.css
  ├── index.html
  └── vite.config.js

src/
  ├── controller/
  │   ├── user_controller.ts
  │   ├── admin_controller.ts
  │   ├── mail_controller.ts
  │   └── task_controller.ts
  ├── middleware/
  ├── service/
  ├── repositories/
  ├── prisma/
  │   ├── schema.prisma
  │   └── index.ts
  ├── route/
  ├── app.ts
  └── interface/
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/viren-kevat/Admin_Dashboard.git
   cd Admin_Dashboard
   ```

2. **Install backend dependencies:**

   ```bash
   npm install
   ```

3. **Install frontend dependencies:**

   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Configure environment variables:**

   - Create a `.env` file in the root directory with:
     ```
     JWT_SECRET=your_jwt_secret
     EMAIL=your_email_address
     EMAIL_PASSWORD=your_email_password
     MONGODB_URI=your_mongodb_connection_string
     ```

5. **Set up Prisma:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

### Running the Application

- **Start the backend:**

  ```bash
  npm run dev
  ```

- **Start the frontend:**

  ```bash
  cd frontend
  npm run dev
  ```

- The frontend will be available at `http://localhost:5173` (default Vite port).

## API Endpoints

### Auth & User

- `POST /api/signup` — Register a new user
- `POST /api/login` — Login user
- `POST /api/password-reset` — Request OTP for password reset
- `POST /api/update-password` — Update password with OTP

### Admin

- `GET /api/admin/users` — List all users
- `POST /api/admin/approve` — Approve user

### Tasks

- `POST /api/tasks` — Create a new task (task details are also sent to the assigned user's email)
- `GET /api/tasks` — List tasks
- `PUT /api/tasks/:id` — Update task
- `DELETE /api/tasks/:id` — Delete task

## Environment Variables

| Variable       | Description                  |
| -------------- | ---------------------------- |
| JWT_SECRET     | JWT signing key              |
| EMAIL          | Email address for Nodemailer |
| EMAIL_PASSWORD | Email password/app password  |
| MONGODB_URI    | MongoDB connection string    |

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)
- [Nodemailer](https://nodemailer.com/)
