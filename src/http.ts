import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';

const app = express();

const mongoUri = process.env.MONGO_URI ?? 'mongodb://localhost:27017/rocketsocket';

mongoose.connect(mongoUri).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.error('MongoDB connection failed:', error.message);
});

const server = createServer(app);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'rocketsocket' });
});

app.use(express.static(path.join(__dirname, '..', 'public')));

const io = new Server(server, {
  cors: { origin: '*' },
});

export { server, io };