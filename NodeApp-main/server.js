import app from './src/app.js'

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(3000,()=>{console.log("app started at port 3000")});

export default app;
