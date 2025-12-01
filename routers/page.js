import { Router } from 'express';
import db from './database/connection.js';

const router = Router();

router.get('/api/users/', async (req, res) => {
    const result = await db.all('SELECT * FROM users WHERE email = ?', req.params.email);
    res.send({ data: result });
});

export default router; 