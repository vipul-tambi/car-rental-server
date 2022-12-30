if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}



const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL

function connectDB() {
    mongoose.connect(dbUrl);

    const connection = mongoose.connection;

    connection.on('connected', () => {
        console.log("Successfully connected");
    })

    connection.on('error', () => {
        console.log("Error!!!!!!!");
    })
}

connectDB();
module.exports = mongoose;