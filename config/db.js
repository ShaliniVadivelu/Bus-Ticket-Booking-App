// Mongodb connection
const mongoose =require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// to connect mongodb, we need mongoose and also we are passing the db which has mongoURI. mongoose.connect(db); instead of using this alone,throughout our applicaiton we will be using async await so that we can also display errors

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure.
        process.exit(1);
    }
}

module.exports= connectDB;
