# Professor of Practice Payslip Portal — MVP

Simple full-stack MVP for lecturer/admin payslip management.

## Stack
- Frontend: React + Vite + basic CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT + bcrypt
- Uploads: Multer

## Features
- Signup/Login with strict `@vnrvjiet.in` email validation
- Role-based access (`admin`, `lecturer`)
- Lecturer profile setup with profile picture upload
- Lecturer dashboard:
  - latest payslip
  - previous payslips list
  - payslip detail page
- Admin dashboard:
  - view all lecturers
  - view lecturer profile
  - generate payslip
  - view lecturer payslip history

## Project Structure
```
backend/
  config/
  controllers/
  middleware/
  models/
  routes/
  seed/
frontend/
  src/
    api/
    components/
    context/
    pages/
    styles/
```

## Local Run Instructions

### 1) Backend setup
```bash
cd backend
npm install
cp .env.example .env
```
Update `.env` with your MongoDB URI and JWT secret.

Run backend:
```bash
npm run dev
```

### 2) Frontend setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Frontend runs on `http://localhost:5173`.

## Dummy Data
Seed sample admin, lecturer, and payslips:
```bash
cd backend
npm run seed
```
Sample credentials:
- Admin: `admin@vnrvjiet.in` / `Password@123`
- Lecturer: `lecturer@vnrvjiet.in` / `Password@123`

## API Endpoints

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`

### Users
- `GET /api/users/me`
- `PUT /api/users/profile`
- `GET /api/users/lecturers` (admin)
- `GET /api/users/lecturers/:id` (admin)

### Payslips
- `POST /api/payslips` (admin)
- `GET /api/payslips/me/latest` (lecturer)
- `GET /api/payslips/me` (lecturer)
- `GET /api/payslips/lecturer/:userId` (admin)
- `GET /api/payslips/:id` (admin or owner lecturer)
