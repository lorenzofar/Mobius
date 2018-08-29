const express = require("express");
const db = require("./dbManager");
var router = express.Router();

router.get("/", (req, res) => {
  let info = require("./info.json");
  db.query("SELECT * FROM sponsors", (err, result) => {
    let status = 200;
    if (err) {
      status = 500;
      info["sponsors"] = [];
    } else info["sponsors"] = result.rows;
    res.status(status).json(info);
  });
});

module.exports = router;
