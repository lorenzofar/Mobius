require("dotenv").config();
var express = require("express");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

let artists = require("./other/artistsRouter");
let bookings = require("./other/bookingsRouter");
let dates = require("./other/datesRouter");
let events = require("./other/eventsRouter");
let info = require("./other/informationRouter");
let locations = require("./other/locationsRouter");
let news = require("./other/newsRouter");
app.use("/artists", artists);
app.use("/bookings", bookings);
app.use("/dates", dates);
app.use("/events", events);
app.use("/info", info);
app.use("/locations", locations);
app.use("/news", news);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on ${port}`));