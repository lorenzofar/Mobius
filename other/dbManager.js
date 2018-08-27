const pg = require("pg");
var types = pg.types;
types.setTypeParser(1114, stringValue => stringValue);

const credentials = {
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  host: process.env.DBHOST,
  port: process.env.DBPORT
}; // Create config object according to ENV variables

const client = new pg.Client(process.env.DATABASE_URL); // Initialize client

client
  .connect() // Connect to database
  .then(() => console.log("Connected")) // Handle succesfull connection
  .catch(err => console.log("Error connecting", err)); // Handle connection errors

module.exports = client;
