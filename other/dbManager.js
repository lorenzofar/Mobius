const { Client } = require("pg");

const credentials = {
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    port: process.env.DBPORT
}; // Create config object according to ENV variables

const client = new Client(credentials); // Initialize client

client.connect() // Connect to database
    .then(() => console.log("Connected")) // Handle succesfull connection
    .catch((err) => console.log("Error connecting")); // Handle connection errors

module.exports = client;