# Password Manager Backend

Backend API for the Password Manager application.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication

## Features

- User Authentication
- JWT Authorization
- User CRUD
- REST API
- Environment Variables Support

## Installation

```bash
git clone <repository-url>
cd backend
npm install
```

## Run Development Server

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

## Run Production

```bash
npm start
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

## Project Structure

```
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.ts
│
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## License

MIT
