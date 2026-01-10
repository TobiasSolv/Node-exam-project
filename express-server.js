import { handler } from './build/handler.js';
import express from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
    console.log('New client connected');

    ws.on('message', function message(data) {
        const messageText = data.toString();
        console.log('Received:', messageText);
        ws.send(`Echo: ${messageText}`);
    });

    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
//app.use(handler);

server.listen(3000, () => {
    console.log('listening on port 3000');
});