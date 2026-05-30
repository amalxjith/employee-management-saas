Employee Management SaaS

A modern full-stack Employee Management SaaS application built with React, TypeScript, Node.js, Express, and MongoDB.

The application includes authentication, employee management, dashboard UI, testing setup, Docker support, and GitHub Actions CI pipeline.

---

# Features

## Authentication

* JWT-based authentication
* Protected routes
* Login system
* Persistent authentication

## Employee Management

* Create employees
* Edit employee details
* Delete employees
* Search employees
* Server-side pagination

## Dashboard UI

* Modern SaaS-style layout
* Collapsible sidebar
* Profile dropdown menu
* Responsive dashboard interface
* Reusable UI components

## Backend Features

* REST API architecture
* MongoDB integration
* Pagination and filtering
* Error handling middleware
* Secure password handling

## Testing

### Backend

* Jest
* Supertest

### Frontend

* Vitest
* React Testing Library

## DevOps & CI/CD

* Dockerized frontend and backend
* Docker Compose setup
* GitHub Actions CI pipeline
* Automated frontend/backend testing

---

# Tech Stack

## Frontend

* React
* TypeScript
* Redux Toolkit
* Tailwind CSS
* React Router
* Axios
* Vitest

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Jest
* Supertest

## DevOps

* Docker
* Docker Compose
* GitHub Actions

---

# Project Structure

```bash
frontend/
backend/
.github/workflows/
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/amalxjith/employee-management-saas.git
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
```

Run backend

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
```

Run frontend

```bash
npm run dev
```

---

# Docker Setup

Build and start containers

```bash
docker compose up --build
```

Stop containers

```bash
docker compose down
```

---

# Running Tests

## Backend Tests

```bash
cd backend
npm test
```

## Frontend Tests

```bash
cd frontend
npm test
```

---

# CI/CD

GitHub Actions pipeline automatically:

* installs dependencies
* runs frontend tests
* runs backend tests

on every push and pull request.

---

# Future Improvements

* Role-based access control
* Dashboard analytics
* Notifications system
* Activity logs
* Advanced filtering and sorting
* Dark mode
* File uploads

---

# Author

Amaljith U
