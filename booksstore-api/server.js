const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const connectDB = require('./config/db');
connectDB();

app.use(express.json());

app.use("/api/books",require('./routes/bookRoutes'));

app.get("/",(req,res)=> {
    res.json({message:"API is running"});
})

app.listen(5000,()=>{
    console.log("Server is running at port 5000");
});