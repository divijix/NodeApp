import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

// --- Validating input ---

function validateUsername(username){
    if(!username || username.trim().length < 3 || username.trim().length > 255){
        return false;
    }
    return true;
}

function validateEmail(email){
    if(!email){
        return false;
    }
    
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email.trim())) {
        return false;
    }return true;
}

function validatePassword(password){
    if(!password || password.trim().length < 6 || password.trim().length > 255){
        return false;
    }return true;
}

export function validateDataReg(data){
    if(validateUsername(data.username) && validateEmail(data.email) && validatePassword(data.password)){
        return true;
    }
    return false;
}

export function validateDataLogin(data){
    if(validateEmail(data.email) && validatePassword(data.password)){
        return true;
    }
    return false;
}


// --- Hashing the password ---

const saltRounds = 10;

export async function hashPassword(password){
    const hash = await bcrypt.hash(password,saltRounds);
    return hash;
}

export async function comparePass(password, hashedPassword){
    return await bcrypt.compare(password, hashedPassword);
}


// --- JWT ---

export function generateToken(data){
    return jwt.sign(data, config.JWT_KEY, {expiresIn:'7d'});
}

