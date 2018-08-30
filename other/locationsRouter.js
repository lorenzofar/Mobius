const express = require("express");
const db = require("./dbManager");
const qh = require("./queryHelper");
var router = express.Router();

router.get("/", (req, res) => {
  db.query(qh.select(["*"], "locations"), (err, result) => {
    if (err) res.status(500).json([]);
    else {
      let out = result.rows.map(r => {
        r.directions = r.directions.map(d => {
          let st = d.split("~");
          let o = {};
          o[st[0]] = st[1];
          return o;
        });
        return r;
      });
      res.status(200).json(out);
    }
  });
});

module.exports = router;
