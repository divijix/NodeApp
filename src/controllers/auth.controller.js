import jwt from "jsonwebtoken"
// import USER from "../models/user.model.js"
import pool from "../config/DBconnection.js"
import * as authUtils from "../utils/auth.utils.js"


export async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        // Validations go here ----> 

        const validData = authUtils.validateDataReg(req.body);
        if (!validData) {
            return res.status(400).json({ message: "wrong input values" })
        }


        const newEmail = email.trim().toLowerCase();
        const newUsername = username.trim();
        const hashedPassword = await authUtils.hashPassword(password);


        // --- finding if the User already exists ---

        const findingQuery = 'SELECT id FROM users WHERE email = $1;';
        const isPresent = await pool.query(findingQuery, [newEmail]);

        if (isPresent.rows.length > 0) {
            return res.status(409).json({ message: "Email already exists" });
        }


        // -- if no user exists then we create a new user --
        const newQuery = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id;
        `;
        const insertValues = [newUsername, newEmail, hashedPassword];
        const createUser = await pool.query(newQuery, insertValues);


        // const newUser = await USER.create(save);

        const tokenData = {
            userId: createUser.rows[0].id,
            username: newUsername
        }
        const token = authUtils.generateToken(tokenData);

        res.cookie('uuid', token, {
            sameSite: 'none',
            httpOnly: true,
        })
        res.status(201).json({ message: "account created" });

    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function loginUser(req, res) {
    try {

        const { email, password } = req.body;
        // validate the data

        const validData = authUtils.validateDataLogin(req.body);
        if (!validData) {
            return res.status(400).json({ message: "Invalid Input Data" });
        }


        // -- checking if the user exists -- 
        const newEmail = email.toLowerCase().trim();
        const findUser = `SELECT id, username,password FROM users WHERE email = $1;`;
        const ifUser = await pool.query(findUser, [newEmail]);
        if (ifUser.rows.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }


        // declaring reused variable
        const data = ifUser.rows[0];


        // comparing the credentials
        const compare = await authUtils.comparePass(password, data.password);
        if (!compare) {
            return res.status(401).json({ message: 'Incorrect password or Email' });
        }


        // token making and sending 
        const tokenData = {
            userId: data.id,
            username: data.username
        }

        const token = authUtils.generateToken(tokenData);

        res.cookie('uuid', token, {
            sameSite: 'none',
            httpOnly: true
        });
        res.status(200).json({ messagae: "login successful" });

    } catch (err) {
        console.log(`Some error happened--> ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" })
    }
}