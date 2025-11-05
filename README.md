# DSA Sheet MERN Project

A MERN based DSA Practice Tracker where users can login, browse DSA topics, mark solved problems, and track progress visually.  
Built using React (Vite), Node.js, Express, MongoDB, JWT Auth, Redux Toolkit.

This project demonstrates:

- MERN Monorepo Architecture (client + server in same repo)
- Authentication + Authorization using JWT
- CRUD APIs for Topics & Problems
- React + Redux Toolkit state management
- Axios API abstraction
- Backend serving frontend in production

---

## Folder Structure

```
root/
│
├── client/               # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── features/
│   │   └── services/
│   └── package.json
│
├── server/               # Node + Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── package.json          # Root scripts to run both
└── README.md
```

---

## Tech Stack

| Layer | Tech Used |
|-------|----------|
| Frontend | React, Vite, Redux Toolkit, Axios, React Router |
| Backend | Node.js, Express, JWT Auth, Bcrypt, Mongoose |
| Database | MongoDB |
| Other Tools | dotenv, cors, concurrently |

---

## Project Flow

1. User logs in → Backend returns JWT
2. JWT stored in Redux Store
3. Protected APIs require token
4. User can view Topics / Problems / mark completed
5. In production, backend serves `client/dist`

---

## Installation

### Install Dependencies

```
npm install
npm install --prefix client
npm install --prefix server
```

---

## Environment Variables

Create `.env` inside `/server`

```
PORT=8080
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

---

## Build and Run Production

```
npm run build --prefix client
npm start
```

---

## Available API Modules

| Feature | Route |
|---------|-------|
| Auth | `/api/auth` |
| Users | `/api/users` |
| Topics | `/api/topics` |
| Problems | `/api/problems` |

---

## Author

**Deepak Modanwal**
