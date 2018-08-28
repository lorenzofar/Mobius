const pg = require("pg");
var types = pg.types;
types.setTypeParser(1114, stringValue => stringValue);

const credentials = process.env.DATABASE_URL;
const client = new pg.Client(credentials); // Initialize client

client
  .connect() // Connect to database
  .then(() => console.log("Connected")) // Handle succesfull connection
  .catch(err => console.log("Error connecting", err)); // Handle connection errors

module.exports = client;
