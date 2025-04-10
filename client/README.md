# Oaktree Inventory – Full Stack App

A full-stack inventory management system built as part of a Junior Full-Stack Developer exam. It features full CRUD operations for inventory items, user registration & login, JWT-based authentication, route protection, and responsive design.

---

## 🔧 Technologies Used

| Layer     | Stack                                      |
|-----------|---------------------------------------------|
| Frontend  | Next.js, React, Bootstrap, React Toastify   |
| Backend   | Flask (Python), SQLite, JWT, bcrypt         |
| Database  | SQLite3                                     |
| Auth      | Token-based (JWT)                           |

---

## 🚀 Setup Instructions

> Clone this project and follow the steps below to run both **backend** and **frontend**.

---

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/nhickad/oaktree-fullstack-app.git
cd oaktree-fullstack-app

```

## Backend Setup (Flask API)

```bash
cd server


```

## Create virtual environment:

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate

```

## Create virtual environment:

```bash
pip install -r requirements.txt

```

## Option B: Manual install

```bash
pip install flask flask-cors passlib pyjwt

```

## Option B: Manual install

```bash
python -c "from db import init_db; init_db()"

```

## Option B: Manual install

```bash
python run.py

```

Frontend Setup (Next.js)


## Navigate to the client folder:

```bash
cd ../client

```

## Install Node.js dependencies:

```bash
npm install

```

## Start the frontend dev server:

```bash
npm run dev

```

## Features

- User Registration & Login with JWT
- Protected routes (backend + frontend)
- CRUD functionality for Inventory Items
- Real-time Feedback via React Toastify
- Error Handling & Validation
- Mobile Responsive UI
- Token invalidation on logout

## Approach

### Backend

- Flask REST API using Blueprints
- JWT used for authentication (generated on login, validated on each protected route)
- SQLite used for data persistence
- Passwords are hashed using bcrypt
- Endpoints check for token validity and respond accordingly
- Validation included on fields like price, name, status

### Frontend

- Built with Next.js Pages Router
- Used axios for API interaction and React Toastify for user feedback
- Protected pages with a withAuth HOC to verify token presence and validity
- Form validation handled on the client side
- Layout built using Bootstrap grid and components

## Assumptions

- One user type — no role-based access (Admin/User)
- JWT secret is hardcoded in Flask backend (`SECRET_KEY`)
- SQLite database is stored locally as `database.db`
- No image upload feature — only URL string accepted for item image
- Token is stored in localStorage (not cookies)
- Toast notifications are used for all success/error events
- User will always be redirected to `/login` when not authenticated
- Project is intended for local development and demonstration purposes

## API Endpoints

| Method | Endpoint         | Description                  |
|--------|------------------|------------------------------|
| POST   | /register         | Register new user            |
| POST   | /login            | Login & receive JWT          |
| GET    | /protected        | Validate JWT and get user    |
| GET    | /api/items        | Get all items                |
| GET    | /api/items/:id    | Get item by ID               |
| POST   | /api/items        | Create item                  |
| PUT    | /api/items/:id    | Update item by ID            |
| DELETE | /api/items/:id    | Delete item by ID            |

## Example Test Routes

- `/login` → Login form
- `/register` → User registration
- `/dashboard` → Main inventory dashboard
- `/items` → Items list view
- `/create-item` → New item form
- `/items/:id` → Single item view/edit/delete

