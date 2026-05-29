import { Router } from 'express';
import pool from '../config/DBconnection.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { verifyUser } from '../middleware/verifyJwt.js';
import * as userController from '../controllers/user.controller.js'

const user = Router();

async function authenticate(req, res, next) {
    try {
        const token = req.cookies.uuid || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, config.JWT_KEY || 'defaultsecret');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

user.get('/profile', authenticate, async (req, res) => {
    try {
        const query = 'SELECT id, username, email, profile FROM users WHERE id = $1;';
        const result = await pool.query(query, [req.user.userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

user.put('/profile', authenticate, async (req, res) => {
    try {
        const { username, profile } = req.body;
        const query = 'UPDATE users SET username = COALESCE($1, username), profile = COALESCE($2, profile) WHERE id = $3 RETURNING id, username, email, profile;';
        const result = await pool.query(query, [username, profile, req.user.userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating user profile:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

user.post('/profile',verifyUser,userController.updateProflie);

export default user;
