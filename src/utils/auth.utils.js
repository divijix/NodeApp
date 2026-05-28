import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export function validateDataReg(body) {
    if (!body) return false;
    const { username, email, password } = body;
    if (typeof username !== 'string' || username.trim().length === 0) return {err: "username is wrong/malfromed"};
    if (typeof email !== 'string' || !email.includes('@') || email.trim().length === 0) return {err: "You entered wrong/malformed Email"};
    if (typeof password !== 'string' || password.length < 6) return {err: "password should be Greater than 6 chars"};
    return true;
}

export function validateDataLogin(body) {
    if (!body) return false;
    const { email, password } = body;
    if (typeof email !== 'string' || email.trim().length === 0) return {err: "Email should be correct" };
    if (typeof password !== 'string' || password.length === 0) return {err: "Password Should be greater than 0"};
    return true;
}

export async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export async function comparePass(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(tokenData) {
    return jwt.sign(tokenData, config.JWT_KEY || 'defaultsecret', { expiresIn: '24h' });
}
