const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const serverless = require("serverless-http");
dotenv.config();

const cors =require("cors");
app.use(cors());

const userRoute = require("./routes/userRoute");
app.use(express.json());
// Default route (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});


// Connect to MongoDB and start server
mongoose
  .connect(process.env.URI)
  .then(()=> {
    console.log("connected successfully");
    app.listen(process.env.PORT || 8000 ,(err)=>{
        if(err) console.log(err);
        console.log("running successfully at",process.env.PORT);
    }); 
 
  })
  .catch((error) =>{
    console.log("error",error);
  });

app.use(userRoute);
