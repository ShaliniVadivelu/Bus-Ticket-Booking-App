// getting express framework
const express = require ('express');
//declaring express to a variable 'app' to access it.
const app = express ();

app.get ('/', (req, res) => {
    res.send("ticket booking app");
    console.log("BUS TICKET BOOKING APP");
});

const PORT= process.env.PORT || 5001;
//app has to listen the port on the PORT variable(5001)
app.listen (PORT, () =>{
    console.log(`Server started at port ${PORT}`)
});