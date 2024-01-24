import express from "express";
import feedController from "./controller/feedController"; 

const app = express()

app.use("/feed", feedController)

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})
