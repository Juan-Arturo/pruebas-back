import dotenv from 'dotenv';
import express from 'express';
import Server from './config/server';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Initialize server
const server = new Server();
server.listen();

export default app;