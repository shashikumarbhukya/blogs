# MERN Blog Project

A full-stack blogging platform built with the [MERN stack](https://www.mongodb.com/mern-stack): **MongoDB**, **Express.js**, **React.js**, and **Node.js**. The project is divided into a client (frontend) and server (backend), allowing users to register, log in, and manage blog posts securely.

## Features

- User authentication & authorization (JWT-based)
- Create, edit, delete, and view blog posts
- Responsive React frontend
- RESTful API backend using Express
- MongoDB for data storage
- Password hashing with bcryptjs
- Secure API routes
- Environment variable support

## Project Structure

```
.
├── client/    # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── server/    # Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── ...
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB Atlas or local MongoDB instance

### Environment Variables

Create a `.env` file inside the `server/` directory with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/shashikumarbhukya/blogs.git
cd blogs
```

#### 2. Install server dependencies

```bash
cd server
npm install
```

#### 3. Install client dependencies

```bash
cd ../client
npm install
```

---

### Running the Application

#### Start the backend server

```bash
cd server
npm run dev
```

#### Start the frontend client

```bash
cd ../client
npm start
```

- The React app runs on [http://localhost:3000](http://localhost:3000)
- The API server runs on [http://localhost:5000](http://localhost:5000) (proxy is set in client)

---

## Usage

- Register or log in as a user
- Create new blog posts
- Edit or delete your own posts
- Browse posts from all users

---

## Scripts

### Client

- `npm start` — Runs the React app in development mode
- `npm run build` — Builds the React app for production

### Server

- `npm run dev` — Starts the Express server with nodemon
- `npm start` — Starts the Express server with Node

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bug fixes or enhancements.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Acknowledgements

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)
