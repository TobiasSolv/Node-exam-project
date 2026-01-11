import { handler } from './build/handler.js';
import express from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
    console.log('New client connected');

    ws.send('👋 Welcome to Kanban! Ask me about Kanban, workflow, or productivity.');

    ws.on('message', function message(data) {
        const messageText = data.toString();
        console.log('Received:', messageText);
        let response = '🤖 I’m not sure about that. Try asking about Kanban, workflow, or purpose.';

        if (messageText.includes('hello') || messageText.includes('hi')) {
            response = '👋 Hello! How can I help you with Kanban today?';
        }
        else if (messageText.includes('kanban')) {
            response =
                '📋 Kanban is a visual workflow system that helps teams see work, limit overload, and improve flow.';
        }
        else if (messageText.includes('workflow')) {
            response =
                '🔄 A typical Kanban workflow includes To-Do, In Progress, and Done columns.';
        }
        else if (messageText.includes('purpose')) {
            response =
                '🎯 The purpose of Kanban is to improve efficiency while reducing stress and multitasking.';
        }
        else if (messageText.includes('fox')) {
            response =
                '🦊 The fox symbolizes adaptability and smart problem-solving—core Kanban values.';
        }
        else if (messageText.includes('why')) {
            response =
                '✨ Kanban works because it makes work visible and encourages continuous improvement.';
        }

        ws.send(response);
    });

    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on port 3000');
});