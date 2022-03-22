// getting express framework
const express = require ('express');
const connectDB = require ('./config/db');
//declaring express to a variable 'app' to access it.
const app = express ();

//connecting the database. Calling the connectDB
connectDB();

// init Middleware
app.use(express.json({ extended: false }));

//user api
app.use('/api/user', require ('./routes/api/user'));
app.use('/api/auth', require ('./routes/api/auth'));
app.use('/api/bus', require ('./routes/api/bus'));

const PORT= process.env.PORT || 5001;

//app has to listen the port on the PORT variable(5001)
app.listen (PORT, () =>{
    console.log(`Server started at port ${PORT}`)
});