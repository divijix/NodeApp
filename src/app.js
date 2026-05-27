import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.js';
// import { connectToDB } from './config/DBconnection.js';
import pool from './config/DBconnection.js';
import User from './routes/user.js';

const app = express();

// connectToDB();

app.use(cors());
app.use(express.json()); // TODO handle wrong format of json data, json error handling 
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", User);

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>NodeApp Backend API</title>
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
            <style>
                :root {
                    --bg-color: #0d0f12;
                    --card-bg: rgba(255, 255, 255, 0.03);
                    --border-color: rgba(255, 255, 255, 0.08);
                    --text-color: #f3f4f6;
                    --text-muted: #9ca3af;
                    --primary: #10b981;
                    --primary-glow: rgba(16, 185, 129, 0.15);
                }
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                body {
                    font-family: 'Outfit', sans-serif;
                    background-color: var(--bg-color);
                    color: var(--text-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    overflow: hidden;
                    position: relative;
                }
                body::before {
                    content: '';
                    position: absolute;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
                    top: -50px;
                    right: -50px;
                    z-index: 0;
                }
                body::after {
                    content: '';
                    position: absolute;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
                    bottom: -100px;
                    left: -100px;
                    z-index: 0;
                }
                .container {
                    background: var(--card-bg);
                    backdrop-filter: blur(10px);
                    border: 1px solid var(--border-color);
                    border-radius: 24px;
                    padding: 40px;
                    max-width: 500px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    z-index: 1;
                }
                .logo {
                    font-size: 3rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, #10b981, #6366f1);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 8px;
                }
                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(16, 185, 129, 0.1);
                    color: var(--primary);
                    padding: 6px 16px;
                    border-radius: 50px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 24px;
                    border: 1px solid rgba(16, 185, 129, 0.2);
                }
                .status-dot {
                    width: 8px;
                    height: 8px;
                    background-color: var(--primary);
                    border-radius: 50%;
                    animation: pulse 1.5s infinite;
                }
                @keyframes pulse {
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
                    70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                }
                p {
                    color: var(--text-muted);
                    font-size: 1.1rem;
                    line-height: 1.6;
                    margin-bottom: 32px;
                }
                .routes {
                    text-align: left;
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 16px;
                    padding: 20px;
                    border: 1px solid var(--border-color);
                }
                .routes-title {
                    font-size: 0.9rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: var(--text-color);
                    margin-bottom: 12px;
                }
                .route-item {
                    display: flex;
                    justify-content: space-between;
                    font-family: monospace;
                    font-size: 0.9rem;
                    padding: 8px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                .route-item:last-child {
                    border-bottom: none;
                }
                .method {
                    font-weight: bold;
                }
                .method.post { color: #f59e0b; }
                .method.get { color: #3b82f6; }
                .path {
                    color: #e5e7eb;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo">NodeApp</div>
                <div class="status-badge">
                    <span class="status-dot"></span>
                    Backend Online
                </div>
                <p>Your Express server is successfully deployed and running on Vercel. Connect to the endpoints below using your client application.</p>
                <div class="routes">
                    <div class="routes-title">Available Endpoints</div>
                    <div class="route-item">
                        <span class="method post">POST</span>
                        <span class="path">/api/v1/auth/register</span>
                    </div>
                    <div class="route-item">
                        <span class="method post">POST</span>
                        <span class="path">/api/v1/auth/login</span>
                    </div>
                    <div class="route-item">
                        <span class="method get">GET</span>
                        <span class="path">/api/v1/user/profile</span>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
});

export default app;