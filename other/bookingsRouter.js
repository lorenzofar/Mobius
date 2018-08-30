const express = require("express");
const db = require("./dbManager");
const qh = require("./queryHelper");
var router = express.Router();

router.post("/", (req, res) => {
  let data = req.body;
  if (!data || !data.event || !data.email || !data.name || !data.surname)
    res.status(400).end();
  else
    db.query(
      `INSERT INTO customers VALUES ('${data.email}', '${data.name}', '${
        data.surname
      }')`,
      () => {
        // Insert new customer into db, if already present is ignored
        // Add booking
        db.query(
          `INSERT INTO bookings VALUES (${data.event}, '${data.email}')`,
          err => {
            if (err && err.code == "23505") res.status(403).end();
            else if (err) res.status(500).end();
            else res.status(201).end();
          }
        );
      }
    );
});

module.exports = router;
