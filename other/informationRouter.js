const express = require("express");
const db = require("./dbManager");
var router = express.Router();

router.get("/", (req, res) => {
  let info = require("./info.json");
  let out = {};
  let q = req.query;
  let fields = q && q.fields ? q.fields.split(",") : [];
  fields.filter(f => f != "sponsors").forEach(f => (out[f] = info[f]));
  if (fields.indexOf("sponsors") != -1)
    db.query("SELECT * FROM sponsors", (err, result) => {
      let status = 200;
      if (err) {
        status = 500;
        out["sponsors"] = [];
      } else out["sponsors"] = result.rows;
      res.status(status).json(out);
    });
  else {
    res.status(200).json(out);
  }
});

module.exports = router;
