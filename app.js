import express from 'express';

const app = express();

app.use(express.static('public'));

app.use(express.json());

import page from './src/routes/+page.svelte';

app.use(page);

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => console.log('Server is running on port', PORT));