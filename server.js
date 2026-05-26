// import app from './src/app.js'


// app.listen(3000,()=>{console.log("app started at port 3000")});

import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Server running");
});

export default app;
