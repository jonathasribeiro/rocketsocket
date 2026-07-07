# RocketSocket

Real-time messaging server built with **Node.js**, **TypeScript**, **Express**, **Socket.IO**, and **MongoDB**.

## Features

- WebSocket-based chat rooms and direct messaging
- User presence tracking via socket connections
- Service layer with dependency injection (`tsyringe`)
- MongoDB persistence with Mongoose schemas
- REST endpoints alongside real-time events

## Architecture

```
src/
├── server.ts          # App bootstrap
├── http.ts            # Express HTTP setup
├── websocket/         # Socket.IO chat service
├── services/          # Business logic (users, rooms, messages)
└── schemas/           # Mongoose models
```

## Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Language | TypeScript |
| HTTP | Express |
| Real-time | Socket.IO |
| Database | MongoDB (Mongoose) |
| DI | tsyringe |

## Getting started

**Prerequisites:** Node.js, Docker (for MongoDB)

```bash
# Start MongoDB
npm run db

# Install dependencies and run
npm install
npm run dev
```

## Use cases

Demonstrates event-driven, real-time communication patterns applicable to logistics bidding, live notifications, and collaborative platforms.

## Author

**Jonathas Ribeiro** — [LinkedIn](https://www.linkedin.com/in/jonathasribeiroreal)
