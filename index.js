// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   res.send("Server running");
// });

// module.exports = app;


import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Server running");
});

export default app;
