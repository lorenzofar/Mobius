require("dotenv").config();
var express = require("express");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

// Start server
var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on ${port}`));