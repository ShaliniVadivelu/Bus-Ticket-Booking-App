// getting express framework
const express = require ('express');
const connectDB = require ('./config/db');

//declaring express to a variable 'app' to access it.
const app = express ();

//connecting the database. Calling the connectDB
connectDB();

app.get ('/', (req, res) => {
    res.send("ticket booking app");
    console.log("BUS TICKET BOOKING APP");
});

const PORT= process.env.PORT || 5001;

//app has to listen the port on the PORT variable(5001)
app.listen (PORT, () =>{
    console.log(`Server started at port ${PORT}`)
});