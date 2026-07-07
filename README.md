# RocketSocket

> Real-time messaging server with WebSockets, dependency injection, and MongoDB persistence.

[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4-010101?style=flat-square&logo=socketdotio&logoColor=white)](https://socket.io)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)](https://docker.com)

---

## Overview

Event-driven chat server demonstrating patterns applicable to **logistics bidding**, **live notifications**, and **collaborative platforms**. Built with Express, Socket.IO, Mongoose, and **tsyringe** dependency injection.

Used in production contexts: GoFlux freight auction (RabbitMQ + real-time), Autopass ticketing (2M+ daily users).

---

## Features

- **WebSocket chat rooms** — direct and group messaging
- **User presence** — socket-based online tracking
- **Service layer** — DI with tsyringe (CreateUser, CreateMessage, GetChatRoom...)
- **MongoDB persistence** — Mongoose schemas for User, Message, ChatRoom
- **Health check** — `GET /health`
- **Docker Compose** — API + MongoDB out of the box

---

## Architecture

```
Client (Socket.IO)
       │
       ▼
┌──────────────────┐
│  ChatService     │  ← connection events
│  (WebSocket)     │
└────────┬─────────┘
         │
┌────────▼─────────┐
│  Services        │  ← tsyringe DI
│  CreateMessage   │
│  GetChatRoom...  │
└────────┬─────────┘
         │
┌────────▼─────────┐
│  MongoDB         │
│  User · Message  │
│  ChatRoom        │
└──────────────────┘
```

---

## Quick Start

### Docker (recommended)

```bash
git clone https://github.com/jonathasribeiro/rocketsocket.git
cd rocketsocket
docker compose up --build
```

Server: http://localhost:3000  
Health: http://localhost:3000/health

### Local

```bash
cp .env.example .env
npm install
npm run db          # start MongoDB container
npm run dev
```

---

## Environment

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | HTTP/WebSocket port |
| `MONGO_URI` | `mongodb://localhost:27017/rocketsocket` | MongoDB connection |

---

## Socket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `start` | Client → Server | Register user (email, name, avatar) |
| `get_users` | Client → Server | List online users |
| `start_chat` | Client → Server | Open/create chat room |
| `message` | Client → Server | Send message to room |
| `new_users` | Server → Client | Broadcast new user joined |
| `message` | Server → Client | New message in room |
| `notification` | Server → Client | Unread message alert |

---

## Project Structure

```
src/
├── server.ts              # Bootstrap
├── http.ts                  # Express + Socket.IO + MongoDB
├── websocket/
│   └── ChatService.ts       # Event handlers
├── services/                # Business logic (DI)
└── schemas/                 # Mongoose models
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run production build |
| `npm run db` | Start MongoDB via Docker |

---

## Author

**Jonathas Ribeiro** — Senior Fullstack Engineer (GoFlux, V8 Tech)  
[LinkedIn](https://www.linkedin.com/in/jonathasribeiroreal)
