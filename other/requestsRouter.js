const express = require("express");
const db = require("./dbManager");
var router = express.Router();

router.post("/", (req, res) => {
  let data = req.body;
  if (!data || !data.email || !data.message) res.status(400).end();
  else
    db.query(
      `INSERT INTO requests (email, body, dt) VALUES ('${data.email}', '${data.message}', CURRENT_TIMESTAMP)`,
      (err, result) => {
        if (err) res.status(500).end();
        else res.status(201).end();
      }
    );
});

module.exports = router;
